import { useTranslation } from "react-i18next";
import { useEffect, useState, useMemo } from "preact/hooks";
import RocketChatWebSocket from "../../../../utils/services/RocketChatWebSocket";
import axios from "axios";
import { getChatRooms } from "../../../../api";
import { userDataSignal } from "../../../../signals";
function LiveChatSupport() {
  const { t } = useTranslation();
  const [rooms, setRooms] = useState([]);
  const [socket, setSocket] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);

  useMemo(() => {
    if (selectedRoom) {
      getChatRooms(selectedRoom, socket.token, socket.userId)
        .then((res) => {
          console.log("res", res);
          setMessages(res.data.messages);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, [selectedRoom]);
  const handleNewMessage = (message) => {
    console.log("New Message ========================>>>", message);
    setMessages((prevMessages) => [...prevMessages, message]);
  }
  useEffect(() => {
    const fetchRooms = async () => {
      const socket1 = new RocketChatWebSocket(handleNewMessage);
      socket1.connect();
      setSocket(socket1);
      const hashedPassword = await RocketChatWebSocket.sha256("3EGOc85iFxY3VoCw");

      try {
        await socket1.connectAndLogin(userDataSignal.value.email.split('@')[0], localStorage.getItem("cLgpssstore"));
        const fetchedRooms = await socket1.getRooms();
        console.log("fetchedRooms:", fetchedRooms);
        // socket1.subscribeToAllRoomUpdates();
        setRooms(fetchedRooms);
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
  rooms.forEach((room, index) => {
    try {
      socket.subscribeToRoom(room._id);
      socket.subscribeToAllRoomUpdates();
    } catch (err) {
      console.log(err);
    }
  });
  return (
    <div className="h-full pb-10 bg-white overflow-y-auto">
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
            {rooms.map((item, index) => (
              <div
                key={item._id}
                className="flex items-center px-4 py-2 space-x-2 bg-[#7ab4e49b] m-2 rounded-md
            hover:bg-[#7ab4e4d4] cursor-pointer
            hover:font-[600]
            hover:shadow-lg hover:duration-300
            hover:ease-in-out hover:transform hover:scale-105 hover:transition-all
            "
                onClick={() => {
                  setSelectedRoom(
                    item.lastMessage ? item.lastMessage.rid : item._id
                  );
                }}
              >
                <img
                  className="w-[2rem] rounded-full"
                  src={`http://localhost:3000/avatar/${
                    item._id !== "GENERAL"
                      ? item.usernames.filter(
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
            ))}
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
            {
                messages.map((message, index) => (
                    <div
                        key={message._id}
                        className={`flex flex-col ${
                        message.u.username === socket.username
                            ? "items-end"
                            : "items-start"
                        }`}
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
                            src={`http://localhost:3000/avatar/${message.u.username}`}
                            alt="icon"
                        />
                        <div className="flex flex-col">
                            <p className=" text-[12px] font-[600]">
                            {message.u.username}
                            </p>
                            <p className="text-[12px]">{message.md[0].value[0].value}</p>
                        </div>
                        </div>
                    </div>
                    ))
            }
          </div>
          <div className=" h-[100px]  rounded-t-lg text-[12px]  bg-[#D8E4EEE5] max-md:h-36 flex-end">
            <p className=" pt-3 ml-14">{t("Please type text here")}</p>
            <div className="flex flex-1 ml-3  max-md:block">
              <img className="w-[16px] pb-8 ml-3" src="/Vector4.svg" alt="" />
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
                placeholder={t(
                  "Please prepare test drive in Frankfurt for next monday!"
                )}
              />
              <img
                className=" ml-10 w-9 mb-8 max-md:float-right max-md:w-[w-4] max-md:pb-14 max-md:mr-10"
                src="/Vector5.svg"
                alt=""
              />
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default LiveChatSupport;
