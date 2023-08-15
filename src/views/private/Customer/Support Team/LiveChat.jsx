import { useTranslation } from "react-i18next";
import { useState, useEffect, useMemo } from "preact/hooks";
import RocketChatWebSocket from "../../../../utils/services/RocketChatWebSocket";
import { userDataSignal } from "../../../../signals";
import { sendMessage } from "../../../../api";
import appConfig from "../../../../config/appConfig";
function LiveChat() {
  const { t } = useTranslation();

  const [connecting , setConnecting] = useState(false);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [room, setRoom] = useState(null);
  const [msg, setMsg] = useState("");

  const handleNewMessage = (message, notification = false) => {
    //  display the message in chat box
    setMessages((prevMessages) => [...prevMessages, message.fields.args[0]])
  };


  useEffect(() => {
    setConnecting(true);
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

  const handleSendMessage = async (message) => {
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
      sendMessage("@superadmin", msg, socket.token, socket.userId).then((res) => {
        // console.log(res);
        setRoom(res.data.message.rid);
        socket.selectRoom(res.data.message.rid);
        setMessages((prevMessages) => [...prevMessages, res.data.message]);
        setMsg("");
      }).catch((err) => {
        console.log(err);
      })
      
    }
  }


  useMemo(() => {
    if (room) {
      socket.subscribeToRoom(room);
    }
  }, [room]);





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
            <b className="text-2xl max-Mobile:text-sm">{t("Live Chat")}</b>
            <p className="max-Mobile:text-xs">
              {t("we are here to give you any technical support!")}{" "}
            </p>
          </div>

        {/* Online status */}
          <div className="text-green-600 ml-4 flex items-end">
            <div className="bg-white flex py-2 px-4 rounded-t-md items-center ">
              <p className="h-4 w-4 bg-green-600 rounded-full mr-2"></p>{" "}
              {t("Online")}
            </div>
          </div>


        </div>
      </div>

      {/* chat box */}
      {
        connecting ? <h1 className="absolute top-[50%] right-[50%] font-extrabold text-lg animate-bounce">Connecting . . .</h1> : 
        
        <div className=" h-auto bg-[#F5F7F942] text-[#3E3F3F] rounded-md border-[2px] mt-4 border-[#DDE7F0] w-[50%] font-[Roboto] ml-24 shadow-lg">
        <p className="flex flex-row-reverse font-[550] pr-[40px] h-8 text-[12px] pt-1.5 bg-[#D8E4EEE5] ">
          {t("21.06.2023, Thursday")}
        </p>
        <div className="overflow-y-auto max-laptop:h-[230px] max-laptop2:h-[445px]">
         

{/* <div className="h-[74vh] overflow-auto"> */}
            {/* display all messages here */}
            {messages.map((message, index) => (
              <div
                key={message._id}
                className={`flex flex-col ${
                  message.u.username === socket.username
                    ? "items-start"
                    : "items-end"
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
                    src={`${appConfig.chatServerURL}/avatar/${message.u.username}`}
                    alt="icon"
                  />
                  <div className="flex flex-col">
                    <p className=" text-[12px] font-[600]">
                      {message.u.username}
                    </p>
                    <p className="text-[12px]">
                      {message.md[0].value[0].value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          {/* </div> */}


        </div>
        <div className=" h-[100px]  rounded-t-lg text-[12px]  bg-[#D8E4EEE5] max-md:h-36">
          <p className=" pt-3 ml-14">{t("Please type text here")}</p>
          <div className="flex flex-1 ml-3  max-md:block">
            <img className="w-[16px] pb-8 ml-3" src="/Vector4.svg" alt="" />
            <label className="">
              <p className=" mt-2.5 ml-5  text-[#0E76BB]">
                {t("Attach File")}{" "}
              </p>
              <input type="file" name="attach file" className="hidden  w-48" />
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
            <img
            onClick={handleSendMessage}
              className=" ml-10 w-9 mb-8 max-md:float-right max-md:w-[w-4] max-md:pb-14 max-md:mr-10"
              src="/Vector5.svg"
              alt=""
            />
          </div>
        </div>
      </div>
      }
    </div>
  );
}

export default LiveChat;
