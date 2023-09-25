import Footer from "../../../../layout/Footer";
import { useTranslation } from "react-i18next";

export default () => {
  const {t}=useTranslation()
  return (
    <>
      <div id="scale-down" className="flex min-h-screen bg-[#FFF]">
        <div className="flex flex-col">
          <div className=" font-[Roboto] flex flex-col space-y-10 max-laptop:space-y-2 mt-[6.5rem] pl-[6rem] max-laptop:mt-[3rem] max-laptop:pl-[3rem]">
            <div className=" space-y-3 ">
              <p className=" flex flex-row text-[2rem] font-extrabold text-[#0078BE] max-laptop:text-[0.8rem] max-laptop:font-medium ">
                {t('Contacts, Training & Support')}
              </p>
              <p className="max-laptop:text-[0.6rem] max-laptop:font-sm">
               {t('Please describe your issue in detail, with any relevant information including device  platform and version affected, steps taken leading to the issue, which period of time this problem is go on etc.')}
              </p>
            </div>
            <div className="flex flex-1 flex-grow justify-center space-y-[3rem] max-laptop:space-y-2  w-[60.3475rem] flex-col max-laptop:w-[30rem] ">
              <div className="flex flex-row space-x-10 text-[1.125rem]  text-[#0E76BB] max-laptop:text-[0.5rem] max-laptop:font-sm ">
                <img
                  src="/Group931.svg"
                  className="w-[2.6875rem] h-[2.6875rem] max-laptop:w-[1.3rem] max-laptop:h-[1.3rem]"
                  alt=""
                />
                <p>0221 - 806 5700</p>
              </div>
              <div className="flex flex-row space-x-10 text-[1.125rem]  text-[#0E76BB] max-laptop:text-[0.6rem] max-laptop:font-sm">
                <img
                  src="/Group932.svg"
                  className="w-[2.6875rem] h-[2.6875rem]  max-laptop:w-[1.3rem] max-laptop:h-[1.3rem]"
                  alt=""
                />
                <p>rlp-netzdetailplanung@de.tuv.com</p>
              </div>
              <div className="flex flex-row space-x-10  text-[1.125rem]  text-[#0E76BB] max-laptop:text-[0.6rem] max-laptop:font-sm">
                <img
                  src="/Group933.svg"
                  className="w-[2.6875rem] h-[2.6875rem]  max-laptop:w-[1.3rem] max-laptop:h-[1.3rem]"
                  alt=""
                />
                <p>{t('Recall service here')}</p>
                <a className="text-[#6F7379B8] underline" href="#">
                  {t('Here')}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className=" z-10  pt-[6.8rem] ">
          <div className="flex items-center bg-[url('/BG_Contacts1.png')]  px-16 max-sm:px-0 absolute bottom-0 left-0 right-0  mt-[20rem] h-[17.7rem] w-full">
            <div className="">
              <img className="w-[15rem] max-sm:w-[8rem]" src="/logo_TUV.svg" alt="" />
            </div>
            <div className="flex-1" />
            <div className="flex absolute bottom-0 right-0 ">
              
              <div className=" flex flex-col relative mb-8 mr-[20%] justify-center items-center">
                <img src="/DIMMOBILES.svg" className="w-[80%]" alt="" />
                <div className="absolute mt-[80%] ml-[40%]">
                  <div className="flex flex-col space-y-1 ">
                    <p className=" text-white text-[0.68rem] ">
                     {t('Download DIM Application!')}
                    </p>
                    <p className=" text-white text-[0.68rem] ">
                      {t('All DIM Universe in your hand!')}
                      <br />
                    </p>
                    <img className="w-[5rem] " src="/Group935.svg " alt="" />
                  </div>
                </div>
              </div>
            </div>
            <Footer  />
          </div>
        </div>
      </div>
    </>
  );
};
