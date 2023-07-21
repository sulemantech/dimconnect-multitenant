
export default () => {
  return (
    <div className="flex min-h-screen overflow-y-auto">
      <div className="flex flex-col">
        <div className=" font-[Roboto] flex flex-col space-y-5 mt-[3rem] pl-[3rem] ">
          <div className="">
            <p className=" flex flex-row font-semibold text-lg text-[#0078BE]">
              Contacts, Training & Support
            </p>
            <p>
              Please describe your issue in detail, with any relevant information
              including device <br /> platform and version affected, steps taken
              leading to the issue, which period of time <br /> this problem is go
              on etc.
            </p>
          </div>
          <div className="flex flex-1 flex-grow justify-center space-y-2 flex-col">


            <div className="flex flex-row space-x-4 text-[1.125rem]  text-[#0E76BB]">
              <img
                src="/Group931.svg"
                className="w-[2.6875rem] h-[2.6875rem]"
                alt=""
              />
              <p>0221 - 806 5700</p>
            </div>
            <div className="flex flex-row space-x-4 text-[1.125rem]  text-[#0E76BB]">
              <img
                src="/Group932.svg"
                className="w-[2.6875rem] h-[2.6875rem]"
                alt=""
              />
              <p>rlp-netzdetailplanung@de.tuv.com</p>
            </div>
            <div className="flex flex-row space-x-4  text-[1.125rem]  text-[#0E76BB]">
              <img
                src="/Group933.svg"
                className="w-[2.6875rem] h-[2.6875rem]"
                alt=""
              />
              <p>Recall service here</p>
              <a className="text-[#6F7379B8] underline" href="#">
                Here
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className=" w-full z-10  pt-[6.8rem]">



        <div className="flex items-center bg-[url('/BG_Contacts1.png')]  px-16 absolute bottom-0 left-0 right-0  mt-[20rem] h-[7.7rem] w-full">
          <div className="">
            <img src="/logo_TUV.svg" alt="" />
          </div>
          <div className="flex-1" />
          <div className="flex absolute bottom-0 right-0">

            <div className=" w-[20vw] flex justify-end items-end z-10 -mr-[8vw]  flex-col">
              <img src="/iphone2.png" className="w-[20vw]" alt="" />

            </div>
            <div className="w-[20vw] flex flex-col justify-center  items-center">

              <img src="/Iphone1.png" className="w-full " alt="" />
              <div className="flex items-start justify-start -mt-12 pt-2 mb-5">
                <div className="flex flex-col pb-2 space-y-1">
                  <p className=" text-white text-[0.66rem] ">Download DIM Application!</p>
                  <p className=" text-white text-[0.5rem] ">All DIM Universe in your hand!</p>
                  <img className="w-[5rem]" src="/Group935.svg " alt="" /></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

