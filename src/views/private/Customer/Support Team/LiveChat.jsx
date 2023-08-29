import { useTranslation } from "react-i18next";
import { useState, useEffect, useMemo, useRef } from "preact/hooks";
import React from "react";
import RocketChatWebSocket from "../../../../utils/services/RocketChatWebSocket";
import { userDataSignal } from "../../../../signals";
import { sendMessage } from "../../../../api";
import appConfig from "../../../../config/appConfig";
import axios from "axios";
function LiveChat() {
  const { t } = useTranslation();

  const [connecting, setConnecting] = useState(false);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [room, setRoom] = useState(null);
  const [msg, setMsg] = useState("");
  const messagesEndRef = useRef(null);

  const [files, setFiles] = useState([]);




  const handleNewMessage = (message, notification = false) => {
    //  display the message in chat box
    console.log("message:", message);
    setMessages((prevMessages) => [...prevMessages, message.fields.args[0]]);
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  useEffect(() => {
    setConnecting(false);
    const fetchRooms = async () => {
      const socket1 = new RocketChatWebSocket(handleNewMessage);
      socket1.connect();
      setSocket(socket1);

      try {
        await socket1.connectAndLogin(
          userDataSignal.value.email.split("@")[0],
          localStorage.getItem("cLgpssstore")
        );
        const fetchedRooms = await socket1.getRooms();
        // console.log("fetchedRooms:", fetchedRooms);
        // socket1.subscribeToAllRoomUpdates();
        // setRooms(fetchedRooms);
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      }
    };
    setTimeout(() => {
      fetchRooms();
      setConnecting(false);
    }, 4000);

    // Clean up the connection when the component is unmounted
    return () => {
      if (socket && socket.client) {
        socket.client.close();
      }
    };
  }, []);

  const handleSendMessage = async (event) => {
    event.preventDefault();

    if(files.length > 0){
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("msg", msg);
      const headers = {
        'X-Auth-Token': socket.token,
        'X-User-Id': socket.userId,// This is important as it sets `Content-Type` header appropriately
      };
     const response = await axios.post(`https://dim-chat-dev.hiwifipro.com/api/v1/rooms.upload/${room}`, formData, {
        headers: headers
      })

      setMsg("");
      setFiles([]);

      return console.log(response);



    }




    // if room is null then send message through rest api otherwise send message through socket
    if (room) {
      try {
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
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    } else {
      sendMessage("@superadmin", msg, socket.token, socket.userId)
        .then((res) => {
          // console.log(res);
          setRoom(res.data.message.rid);
          socket.selectRoom(res.data.message.rid);
          setMessages((prevMessages) => [...prevMessages, res.data.message]);
          setMsg("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useMemo(() => {
    if (room) {
      socket.subscribeToRoom(room);
    }
  }, [room]);

  return (
    //  filter: blur(8px),  -webkit-filter: blur(8px),
    <div className="h-full   overflow-y-auto bg-[url('/bgimg.png')] bg-cover bg-center">
      <div className="w-full pb-10 h-full flex flex-col justify-center items-center backdrop-blur-[3px]">

      {/* chat box */}
      {connecting ? (
        <h1 className="absolute top-[50%] right-[50%] font-extrabold text-lg animate-bounce">
          Connecting . . .
        </h1>
      ) : (
        <div className=" h-auto bg-[#FAFAFA] text-[#3E3F3F] rounded-md mt-4  border-t-0 w-[50%] font-[Roboto] m-auto shadow-lg ">
          <div className=" bg-[#0E76BB] flex px-5 py-2 text-white rounded-t-md m-0 items-center justify-between w-full">
            <h1
              className="
            font-[600] text-[18px] pt-2.5 pb-2.5 pl-2.5 flex items-center
            "
            >
              <svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <circle cx="11.5" cy="11.5" r="11.5" fill="white" />
                <circle
                  cx="11.5"
                  cy="11.5"
                  r="4.5"
                  fill="#1DAF1A"
                  className="animate-pulse"
                />
              </svg>{" "}
              Live Chat Support
            </h1>
            <p className=" font-[550] pr-[40px] text-sm ">
              21.06.2023, Thursday
            </p>
          </div>
          <div className="overflow-y-auto max-laptop:h-[50vh] max-laptop2:h-[50vh] h-[70vh]">
            {/* left message */}
            

   

            {messages.map((message, index) => (
              <React.Fragment key={message._id} ref={messagesEndRef}>
                {message.u.username === socket.username ? (
                  <div className="flex items-end px-4 py-2 space-x-2  m-2 rounded-md justify-end">
                     <div className="rounded-t-2xl rounded-bl-2xl p-5 shadow-md bg-[#0E76BB]">
                     {
                        message.attachments.length > 0 &&
                      <a download
                        target="_blank"
                      href={
                        // file url here
                        `https://dim-chat-dev.hiwifipro.com${message.attachments && message.attachments[0]?.title_link}`
                      }>
                      <h1 className="bg-white px-3 underline py-1 rounded-3xl">{
                        // file name here
                        message.attachments && message.attachments[0]?.title
                        }</h1>
                      </a>}
                    <p className="text-[12px]  text-white  ">
                      {message.md[0].value[0].value}
                    </p>
                    </div>
                    <img
                      className="w-[2rem] rounded-full pb-3"
                      src="/chat-page/avatar.svg"
                      alt="icon"
                    />
                  </div>
                ) : (
                  <div className="flex items-end px-4 py-2 space-x-2  m-2 rounded-md">
                    <img
                      className="w-[2rem] rounded-full pb-3"
                      src="/chat-page/support-avatar.svg"
                      alt="icon"
                    />
                    <div className="bg-white rounded-t-2xl rounded-br-2xl p-5 shadow-md ">
                      {
                        message.attachments.length > 0 &&
                        <a download 
                        target="_blank"
                        href={
                        // file url here
                        `https://dim-chat-dev.hiwifipro.com/${message.attachments && message.attachments[0]?.title_link}`
                      }
                      className="bg-white rounded-lg"
                      >
                      <h1 className="bg-[#0E76BB] text-white px-3 underline py-1 rounded-3xl">{
                        // file name here
                        message.attachments && message.attachments[0]?.title.slice(0, 20)
                        }</h1>
                      </a>}
                      <p className="text-[12px] ">
                        {message.md[0].value[0].value}
                      </p>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className=" h-40 w-full rounded-t-lg text-[12px] bg-[url('/chat-page/shape-bottom.svg')] bg-cover bg-centers max-md:h-36 pt-5">
            {/* <p className=" pt-3 ml-14">{t("Please type text here")}</p> */}
            <form
              onSubmit={handleSendMessage}
              className="flex flex-col flex-1 mt-5 max-md:block"
            >
              {/* <img className="w-[16px] pb-8 ml-3" src="/Vector4.svg" alt="" />
              <label className="">
                <p className=" mt-2.5 ml-5  text-[#0E76BB]">
                  {t("Attach File")}{" "}
                </p>
                <input
                  type="file"
                  name="attach file"
                  className="hidden  w-48"
                />
              </label>
              <input
                className="border-b-[1px] mb-10 pt-3 ml-2 w-[35rem] max-laptop:w-[20rem] border-[#0E76BB] bg-transparent text-[8px] outline-none max-md:w-[8rem] max-laptop2:w-[20rem]"
                type="text"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder={t(
                  "Please prepare test drive in Frankfurt for next monday!"
                )}
              />
              <button type="submit" onClick={handleSendMessage}>
                <img
                  className=" ml-10 w-9 mb-8 max-md:float-right max-md:w-[w-4] max-md:pb-14 max-md:mr-10"
                  src="/Vector5.svg"
                  alt=""
                />
              </button> */}
              <div className="flex w-full  px-10 items-center justify-center">
              <input type="text" className="  pt-3 w-[90%] max-laptop:w-[20rem] border-[#0E76BB] bg-transparent text-[15px] outline-none max-md:w-[8rem] max-laptop2:w-[20rem] placeholder:text-[#0078BE]" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Please prepare test drive in Frankfurt for next monday!"/>

              <button type="submit" onClick={handleSendMessage}>
                <img
                  className="   max-md:float-right max-md:w-[w-4]  max-md:mr-10"
                  src="/chat-page/send-icon.svg"
                  alt=""
                />
              </button>
              </div>
              <div className="bg-[#89b6d559] h-[3px] mx-10 mt-5"></div>
              <div className="flex mx-10 mt-2">
                <label className="cursor-pointer
                ">
                  <img className="w-[25px] h-full cursor-pointer" src="/chat-page/file.svg" alt="" />
                  <input multiple type="file" name="attach file" className="hidden  w-48"
                    onChange={(e) => {
                      setFiles([...e.target.files]);
                    }
                    }
                  />
                </label>
                {
                  files.length > 0 &&
                  Object.values(files).flat()
                  .map(item=>(<div key={item.name} className="flex items-center justify-center ml-5 bg-white px-5 rounded-2xl">
                    <h1 className=" text-[12px] font-[500] mr-5">{item?.name?.slice(
                      0,
                      20
                    ) + "..." + item?.name?.split('.')[item?.name?.split('.').length-1]}</h1>
                    <img className="w-[10px] h-full cursor-pointer" src="/chat-page/close.svg" alt="" onClick={() => 
                    {
                      const newFiles = files.filter(file => file.name !== item.name);
                      setFiles([...newFiles]);
                    }} />
                  </div>))
                }
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default LiveChat;
