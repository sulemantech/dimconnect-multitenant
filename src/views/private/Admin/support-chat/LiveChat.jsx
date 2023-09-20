import { useTranslation } from "react-i18next";
import { useEffect, useState, useMemo, useRef } from "preact/hooks";
import RocketChatWebSocket from "../../../../utils/services/RocketChatWebSocket";
import axios from "axios";
import api, { getChatRoomMessages, getRooms } from "../../../../api";
import { userDataSignal } from "../../../../signals";
import appConfig from "../../../../config/appConfig";
import { showNotification } from "@mantine/notifications";
import { useTransition } from "react";
import { PERMISSIONS } from "../../../../common";
import PermissionWrapper from "../../../../providers/PermissionsProvider";
function LiveChatSupport() {
  const { t } = useTranslation();
  const [rooms, setRooms] = useState([]);
  const [socket, setSocket] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const [offset, setOffset] = useState(0);
  const [limitReached, setLimitReached] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [pending, transition] = useTransition()

  // handle send message to selected room
  const sendMessage = async(e) => {
    e.preventDefault();

    if (files.length > 0 && socket.selectedRoom) {
      // upload file
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("msg", msg);
      const headers = {
        "X-Auth-Token": socket.token,
        "X-User-Id": socket.userId, // This is important as it sets `Content-Type` header appropriately
      };
      const response = await axios.post(
        `https://dim-chat-dev.hiwifipro.com/api/v1/rooms.upload/${socket.selectedRoom}`,
        formData,
        {
          headers: headers,
          onUploadProgress: function (progressEvent) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            // Here, you can update your UI component state to reflect the upload progress.
            setUploadProgress(percentCompleted);
          },
        }
      );
      setFiles([]);
      setUploadProgress(0);
      setMsg("");
      return;
    }




    if (msg) {
      const message = {
        msg: "method",
        method: "sendMessage",
        id: Math.random().toString(36).substr(2, 9),
        params: [
          {
            rid: socket.selectedRoom,
            msg: msg,
          },
        ],
      };
      socket.send(message);
      setMsg("");
    }
  };

  const firstMessageRef = useRef(null);

  // create an Intersection Observer instance
  const observer = new IntersectionObserver((entries) => {
    // If the first message is intersecting with the viewport, call your function
    if (limitReached === false) {
      if (entries[0].isIntersecting) {
        // yourFunction();
        // setOffset((prevOffset) => prevOffset + 20);
        setOffset((prevOffset) => prevOffset + 20);
      }
    } else {
      console.warn("limit reached");
    }
  });

  // get previous messages of selected room
  useMemo(() => {
    if (selectedRoom && limitReached === false) {
      // setLimitReached(false);
      getChatRoomMessages(selectedRoom, socket.token, socket.userId, offset)
        .then((res) => {
          // setMessages(res.data.messages);
          // sort them on the basis of _updatedAt
          // const sortedMessages = res.data.messages.sort(
          //   (a, b) => new Date(a._updatedAt) - new Date(b._updatedAt)
          // );
          // setMessages(sortedMessages);
          // setMessages((prevMessages) => [...sortedMessages, ...prevMessages]);
          if (res.data.messages.length === 0) {
            setLimitReached(true);
            return;
          } else {
            let temp = [...res.data.messages, ...messages];
            // sort them on the basis of _updatedAt
            temp = temp.sort(
              (a, b) => new Date(a._updatedAt) - new Date(b._updatedAt)
            );
            setMessages(temp);
            setTimeout(() => {
              messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 200);
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, [socket?.selectedRoom, offset]);

  useEffect(() => {
    if (firstMessageRef.current && limitReached === false) {
      observer.observe(firstMessageRef.current);
    }
  }, [firstMessageRef, observer]);

  const messagesEndRef = useRef();

  // handle new incoming messages and display them in chat box
  const handleNewMessage = (message, notification = false) => {
    // if chat room is not in selected state then show notification and play sound
    // otherwise just display the message in chat box
    notification === false
      ? (setMessages((prevMessages) => [
          ...prevMessages,
          message.fields.args[0],
        ]),
        // scroll to bottom of chat box
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100))
      : // play notification sound
        (new Audio("/audio/chatalert.mp3").play(),
        // show notification
        // showNotification({
        //   title: message.fields.args[0].u.username,
        //   message: message.fields.args[0].md[0].value[0].value,
        //   color: "blue",
        //   autoClose: 5000,
        // }) increase unreadMessageCount
        setRooms((prevRooms) =>
          prevRooms.map((room) => {
            if (room._id === message.fields.args[0].rid) {
              return {
                ...room,
                unreadMessageCount: room.unreadMessageCount + 1,
              };
            } else {
              return room;
            }
          })
        ));
  };

  const handleNewRooms = (token, userId) => {
    getRooms(token, userId).then((res) => {

      rooms.length !== res.data.update.length &&
        setRooms(
          res.data.update.map((item, index) => {
            return {
              ...item,
              unreadMessageCount: 0,
            };
          })
        );
    });
  };

  useEffect(() => {
    const fetchRooms = async () => {
      const socket1 = new RocketChatWebSocket(handleNewMessage, handleNewRooms);
      socket1.connect();
      setSocket(socket1);
      // const hashedPassword = await RocketChatWebSocket.sha256(
      //   "3EGOc85iFxY3VoCw"
      // );

      try {
        await socket1.connectAndLogin(
          userDataSignal.value.email.split("@")[0],
          localStorage.getItem("cLgpssstore")
        );
        const fetchedRooms = await socket1.getRooms();
        // socket1.subscribeToAllRoomUpdates();
        // setRooms(fetchedRooms);
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      }
    };

    fetchRooms();

    // Clean up the connection when the component is unmounted
    return () => {
      if (socket && socket.client) {
        socket.client.close();
      }
    };
  }, []);
  rooms?.forEach((room, index) => {
    try {
      socket.subscribeToRoom(room._id);
    } catch (err) {
      console.log(err);
    }
  });

  const DownloadFile = (url, name) => {
    const headers = {
      Cookie: `rc_token=${socket.token}; rc_uid=${socket.userId}}`,
    };

    api
      .post(
        "/chatserver/download",
        {
          filelink: url,
          userId: socket.userId,
          token: socket.token,
        },
        { responseType: "blob" }
      )
      .then((response) => {

        // response.data is blob type convert it to file
        const url = window.URL.createObjectURL(
          new Blob([response.data], {
            type: response.headers["content-type"],
          })
        );
        // console.log("url", url);
        // this url is not working it is not opening the file it opens the page
        // window.open(url);
        // so we have to create a tag and download it
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", name);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error("Error downloading the file:", error);
      });
  };

  return (
    <PermissionWrapper permission={PERMISSIONS["User Management"]} view message>
    <div id="scale-down" className="h-full pb-10 bg-white overflow-y-auto">
      <div
        className="flex h-[78px]"
        style={{
          backgroundImage: `url("/BGFAQ2.svg")`,
        }}
      >
        <div className="flex space-x-[381px] max-laptop:space-x-[158px] max-laptop1:space-x-[130px]  max-Mobile:space-x-[10px] max-laptop2:space-x-[286px] ">
          <div className="text-white justify-center flex flex-col pl-24">
            <b className="text-2xl max-Mobile:text-sm">
              {t("Live Chat Support")}
            </b>
            <p className="max-Mobile:text-xs">
              {t("we are here to give you any technical support!")}
            </p>
          </div>

          {/* Online status */}
          {/* <div className="text-green-600 ml-4 flex items-end">
            <div className="bg-white flex py-2 px-4 rounded-t-md items-center ">
              <p className="h-4 w-4 bg-green-600 rounded-full mr-2"></p>{" "}
              {t("Online")}
            </div>
          </div> */}
        </div>
      </div>

      {/* chat box */}
      <div className="flex">
        {/* make div to show rooms or chats */}

        <div
          className="
        h-auto bg-[#F5F7F942] text-[#3E3F3F] rounded-md border-[2px] mt-4 border-[#DDE7F0] w-[20%] font-[Roboto] ml-24 shadow-lg"
        >
          {/* show chat options to click and send message to them, it will be with icon and name */}
          <div className="flex p-5 font-[550] pr-[40px] h-8 text-[12px] pt-1.5 bg-[#D8E4EEE5] ">
            <p>Chat Conversations</p>
          </div>

          <div className="overflow-y-auto max-laptop:h-[230px] max-laptop2:h-[445px] h-[94vh] overflow-x-hidden">
            {/* <div className="overflow-y-auto max-laptop:h-[70vh] max-laptop2:h-[70vh] h-[10%]"> */}
            {/* chat items */}
            {rooms?.map(
              (item, index) =>
                item._id !== "GENERAL" && (
                  <div
                    key={item._id}
                    className="flex items-center justify-between px-4 py-2 space-x-2 bg-[#7ab4e49b] m-2 rounded-md
                      hover:bg-[#7ab4e4d4] cursor-pointer
                      hover:font-[600]
                      hover:shadow-lg hover:duration-300
                      hover:ease-in-out hover:transform hover:scale-105 hover:transition-all
                      "
                    onClick={() => {
                      // console.log("item", selectedRoom);
                      // selectedRoom !== item._id &&
                      // setSelectedRoom(
                      //   // item.lastMessage ? item.lastMessage.rid : item._id
                      //   item._id
                      // );
                      setMessages([]);
                      setLimitReached(false);
                      socket.selectRoom(item._id);
                      // set room unreadMessageCount to 0
                      let temp = [...rooms];
                      temp[index].unreadMessageCount = 0;
                      setRooms(temp);
                      setSelectedRoom(item._id);
                      setOffset(0);
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <img
                        className="w-[2rem] rounded-full"
                        src={`${appConfig.chatServerURL}/avatar/${
                          item._id !== "GENERAL"
                            ? item?.usernames?.filter(
                                (username) => username !== socket.username
                              )[0]
                            : "GENERAL"
                        }`}
                        alt="icon"
                      />
                      <div className="flex flex-col">
                        <p className=" text-[12px] font-[600]">
                          {item._id === "GENERAL"
                            ? "General"
                            : item.usernames.filter(
                                (username) => username !== socket.username
                              )[0]}
                        </p>
                        <p className="text-[12px]">
                          {item.lastMessage ? item.lastMessage.msg : ""}
                        </p>
                      </div>
                    </div>
                    {item.unreadMessageCount === 0 ? null : (
                      <p
                        className="
                      bg-blue-500 p-1 text-white font-bold rounded-lg py-0 animate-bounce
                    "
                      >
                        {item.unreadMessageCount}
                      </p>
                    )}
                  </div>
                )
            )}
            {/* </div> */}
          </div>
        </div>

        <div className=" h-auto bg-[#F5F7F942] text-[#3E3F3F] rounded-md border-[2px] mt-4 border-[#DDE7F0] w-[50%] font-[Roboto] ml-3 shadow-lg flex flex-col justify-between">
          <p className="flex flex-row-reverse font-[550] pr-[40px] h-8 text-[12px] pt-1.5 bg-[#D8E4EEE5] ">
            {t("21.06.2023, Thursday")}
          </p>

          {/* <div className="flex flex-col h-full"> */}
          <div className="h-[74vh] overflow-auto">
            {/* display all messages here */}
            {messages.map((message, index) => (
              <div
                key={message._id}
                className={`flex flex-col ${
                  message.u.username === socket.username
                    ? "items-end flex-row-reverse"
                    : "items-start"
                }`}
                ref={index === 0 ? firstMessageRef : messagesEndRef}
              >
                <div
                  className={`flex items-center px-4 py-2 space-x-2 bg-[#7ab4e49b] m-2 rounded-md
                        ${
                          message.u.username === socket.username
                            ? "bg-[#7ab4e49b] rounded-br-none"
                            : "bg-[#7ab4e4d4] rounded-bl-none"
                        }
                        `}
                >
                  <img
                    className="w-[2rem] rounded-full"
                    src={`${appConfig.chatServerURL}/avatar/${message.u.username}`}
                    alt="icon"
                  />
                  <div className="flex flex-col">
                    <p className=" text-[12px] font-[600]">
                      {message.u.username}
                    </p>
                    <p className="text-lg">{message.msg}</p>
                    {message.attachments?.length > 0 && (
                      <button
                        className="bg-transparent rounded-lg"
                        onClick={() => {
                          DownloadFile(
                            message.attachments &&
                              message.attachments[0]?.title_link,
                            message.attachments && message.attachments[0]?.title
                          );
                        }}
                      >
                        <h1 className="bg-[#0E76BB] text-white px-3 underline py-1 rounded-3xl">
                          {
                            // file name here
                            message.attachments &&
                              message.attachments[0]?.title.slice(0, 20) + "..."
                          }
                        </h1>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* show sending message and uploading file */}
            { pending && <div className={`flex items-end flex-col-reverse`}>
              <div
                className={`flex items-center px-4 py-2 space-x-2 bg-[#7ab4e49b] m-2 rounded-md rounded-br-none`}
              >
                {/* <img
                    className="w-[2rem] rounded-full"
                    src={`${appConfig.chatServerURL}/avatar/${message.u.username}`}
                    alt="icon"
                  /> */}
                <div className="flex flex-col">
                  <p className=" text-[12px] font-[600]">You</p>
                  <p className="text-lg">{msg}</p>
                  {files?.length > 0 && (
                    <button
                      className="bg-transparent rounded-lg"
                    >
                      <h1 className="bg-[#0E76BB] text-white px-3 underline py-1 rounded-3xl">
                        {
                          // file name here
                          files[0]?.name?.slice(0, 20) +
                            "..." +
                            files[0]?.name?.split(".")[
                              files[0]?.name?.split(".").length - 1
                            ]
                        }
                      </h1>
                    </button>
                  )}
              <p className="text-sm text-[#0E76BB]">
                      Uploading file :{uploadProgress}%
                    </p>
                </div>
              </div>
            </div>}
          </div>
          <div className=" h-[100px]  rounded-t-lg text-[12px]  bg-[#D8E4EEE5] max-md:h-36 flex-end">
            <p className=" pt-3 ml-14">{t("Please type text here")}</p>
            <form onSubmit={sendMessage} className="flex ml-3  max-md:block">
              <img className="w-[20px] pb-8 ml-3" src="/Vector4.svg" alt="" />
              <label className="">
                <p className=" mt-3 ml-5 text-lg text-[#0E76BB]">
                  {t("Attach File")}{" "}
                </p>
                <input
                  type="file"
                  name="attach file"
                  className="hidden  w-48"
                  value={files}
                  onChange={(e) => {
                    setFiles([e.target.files[0]]);
                  }}
                />
              </label>
              <input
                className="border-b-[1px] mb-10 pt-3 ml-2 w-[35rem] max-laptop:w-[20rem] border-[#0E76BB] bg-transparent text-lg outline-none max-md:w-[8rem] max-laptop2:w-[20rem]"
                type="text"
                value={msg}
                onChange={(e) => {
                  setMsg(e.target.value);
                }}
                placeholder={t(
                  "Please prepare test drive in Frankfurt for next monday!"
                )}
              />
              <button type="submit" onClick={sendMessage}>
                <img
                  className=" ml-10 w-9 mb-8 max-md:float-right max-md:w-[w-4] max-md:pb-14 max-md:mr-10"
                  src="/Vector5.svg"
                  alt=""
                />
              </button>
            </form>
            <div className="flex">
              {files.length > 0 && (
                <div className="flex -mt-5 items-center justify-center ml-5 bg-white px-5 rounded-2xl">
                  <h1 className=" text-[12px] font-[500] mr-5">
                    {files[0]?.name?.slice(0, 20) +
                      "..." +
                      files[0]?.name?.split(".")[
                        files[0]?.name?.split(".").length - 1
                      ]}
                  </h1>
                  <img
                    className="w-[10px] h-full cursor-pointer"
                    src="/chat-page/close.svg"
                    alt=""
                    onClick={() => {
                      setFiles([]);
                    }}
                  />
                </div>
              )}
            </div>
            {/* </div> */}
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
    </PermissionWrapper>
  );
}

export default LiveChatSupport;
