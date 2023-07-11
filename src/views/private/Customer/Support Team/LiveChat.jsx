
function LiveChat() {
  return (
    <div className="min-h-screen bg-white">
      <div
        className="flex h-24"
        style={{
          backgroundImage: `url("/horizontal blue background.svg")`,
        }}
      >
        <div className="text-white justify-center flex flex-col pl-24">

          <b className="text-2xl">Live Chat</b>
          <p>we are here to give you any technical  support! </p>
        </div>
        <div className="text-green-600 ml-4 flex items-end">
          <div className="bg-white flex py-2 px-4 rounded-t-md items-center">

            <p className="h-4 w-4 bg-green-600 rounded-full mr-2"></p> Online
          </div>
        </div>
      </div>
      <div className=" h-auto bg-[#F5F7F942] text-[#3E3F3F] rounded-md border-[2px] mt-4 border-[#DDE7F0] w-[50%] font-[Roboto] ml-24 shadow-lg">
        <p className="flex flex-row-reverse font-[550] pr-2 h-8 text-[12px] pt-1.5 bg-[#D8E4EEE5]">
          21.06.2023, Thursday
        </p>
        <div className="flex flex-1 space-x-5 px-3 py-[12px]">
          {" "}
          <div className="flex flex-1 space-x-4">
            <img className="w-[1.7rem]" src="/Vector1.svg" alt="" />
            <div>
              {" "}
              <p className=" text-[12px] font-[550]">DIM TEAM SPECIALIST</p>
              <p className="text-[12px]">
                Hello! How can I help? Feel free to ask me anything!
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end pb-2 pr-3 space-x-3">
          <p className="text-[12px]">13:15</p>
          <img src="/Group3.svg" alt="" />
        </div>
        <div className=" px-3 py-[12px] bg-[#F5F7F9] rounded-md">
          {" "}
          <div className="flex flex-1 space-x-4">
            <img className="w-[1.7rem]" src="/Subtract2.svg" alt="" />
            {/* <img className="w-[1.7rem]" src="./Untitled.png" alt="" /> */}
            <div>
              {" "}
              <p className=" text-[12px] font-[550]">YOU</p>
              <p className="text-[12px]">What is FERRARI Purosangue?!</p>
            </div>
          </div>
          {/* <img className="w-[1.3rem]" src="./Group3.svg" alt="" /> */}
          <div className="flex justify-end space-x-3">
            <p className="text-[12px]">13:15</p>
            <img src="/Group3.svg" alt="" />
          </div>
        </div>

        <div className="flex flex-1 space-x-5 px-3 py-[12px]">
          {" "}
          <div className="flex flex-1 space-x-4">
            <img className="w-[1.7rem]" src="/Vector1.svg" alt="" />
            <div>
              {" "}
              <p className=" text-[12px] font-[550]">DIM TEAM SPECIALIST</p>
              <p className="text-[12px]">
                The Ferrari Purosangue is the Maranello marque's first
                four-door, four-seater car, but cars with two rear seats have
                played a major role in the company's strategy from the earliest
                days: in fact, many Ferraris have made the combination of
                absolute performance and first-class comfort one of their
                pillars. Today, the result of this
              </p>
            </div>
          </div>
        </div>
        <input
          className="w-[9rem] ml-11 my-3 h-[5rem]"
          type="image"
          src="/Car.png"
          name=""
          id=""
        />
        <input
          className="w-[9rem] ml-6  my-3 h-[5rem]"
          type="image"
          src="/Car.png"
          name=""
          id=""
        />
        <div className="flex justify-end pb-2 pr-3 space-x-3">
          <p className="text-[12px]">13:15</p>
          <img src="/Group3.svg" alt="" />
        </div>
        <div className=" px-3 py-[12px] bg-[#F5F7F9] rounded-md">
          {" "}
          <div className="flex flex-1 space-x-4">
            <img className="w-[1.7rem]" src="/Subtract2.svg" alt="" />
            {/* <img className="w-[1.7rem]" src="./Untitled.png" alt="" /> */}
            <div>
              {" "}
              <p className=" text-[12px] font-[550]">YOU</p>
              <p className="text-[12px]">What is FERRARI Purosangue?!</p>
            </div>
          </div>
          {/* <img className="w-[1.3rem]" src="./Group3.svg" alt="" /> */}
          <div className="flex justify-end space-x-3">
            <p className="text-[12px]">13:15</p>
            <img src="/Group3.svg" alt="" />
          </div>
        </div>
        <div className="flex flex-1 space-x-5 px-3 py-[12px]">
          {" "}
          <div className="flex flex-1 space-x-4">
            <img className="w-[1.7rem]" src="/Vector1.svg" alt="" />
            <div>
              {" "}
              <p className=" text-[12px] font-[550]">DIM TEAM SPECIALIST</p>
              <p className="text-[12px]">Typing...</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end pr-3 pb-2 space-x-3">
          <p className="text-[12px]">13:15</p>
          <img src="/Group3.svg" alt="" />
        </div>
        <div className=" h-28 rounded-t-lg text-[12px]  bg-[#D8E4EEE5] max-md:h-36">
          <p className=" pt-3 ml-14">Please type text here</p>
          <div className="flex flex-1 ml-3  max-md:block">
            <img src="/Vector4.svg" alt="" />
            <label className="">
              <p className=" mt-2.5 ml-5  text-[#0E76BB]">Attach File </p>
              <input type="file" name="attach file" className="hidden  w-48" />
            </label>
            <input
              className="border-b-[1px] ml-5 w-[28rem] border-[#0E76BB] bg-transparent text-xs outline-none max-md:w-[8rem] "
              type="text"
              placeholder="Please prepare test drive in Frankfurt for next monday!"
            />
            <img className=" ml-10 w-10 max-md:float-right max-md:w-[w-4] max-md:pb-14 max-md:mr-10" src="/Vector5.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveChat;
