import Footer from "../../../../layout/Footer";
import { useTranslation } from "react-i18next";

export default () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex min-h-screen bg-[#FFF]">
        <div className="flex flex-col">
          <div className=" font-[Roboto] flex flex-col space-y-[4%] max-laptop1:[2.5%] mt-[5%] pl-[5%]">
            <div className=" space-y-3 ">
              <p className=" flex flex-row text-[2vw] max-laptop1:text-[1.2vw] font-extrabold text-[#0078BE] ">
                {t("Contacts, Training & Support")}
              </p>
              <p className="w-[45%] text-[1.1vw] max-laptop1:text-[0.8vw]">
                {t(
                  "Please describe your issue in detail, with any relevant information including device  platform and version affected, steps taken leading to the issue, which period of time this problem is go on etc."
                )}
              </p>
            </div>
            <div className="flex flex-1 flex-grow justify-center space-y-[8%] max-laptop1:space-y-[5%]  w-[40%] flex-col  ">
              <div className="flex flex-row  space-x-[5%] text-[1.1vw] max-laptop1:text-[0.8vw]  text-[#0E76BB]">
                <img
                  src="/Group931.svg"
                  className="w-[8%]"
                  alt=""
                />
                <p>0221 - 806 5700</p>
              </div>
              <div className="flex flex-row  space-x-[5%] text-[1.1vw] max-laptop1:text-[0.8vw]  text-[#0E76BB]">
                <img
                  src="/Group932.svg"
                  className="w-[8%]"
                  alt=""
                />
                <p>rlp-netzdetailplanung@de.tuv.com</p>
              </div>
              <div className="flex flex-row  space-x-[5%]  text-[1.1vw] max-laptop1:text-[0.8vw]  text-[#0E76BB]">
                <img
                  src="/Group933.svg"
                  className="w-[8%]"
                  alt=""
                />
                <p>{t("Recall service here")}</p>
                <a className="text-[#6F7379B8] underline" href="#">
                  {t("Here")}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className=" z-10">
          <div className="flex items-center bg-[url('/BG_Contacts1.png')]  px-[6%] absolute bottom-0 left-0 right-0 h-[30%] max-laptop1:h-[25%] w-full">
            <div className=" max-laptop1:pb-5">
              <img
                className="w-[15vw] max-laptop1:w-[12vw] "
                src="/logo_TUV.svg"
                alt=""
              />
            </div>
            <div className="" />
            <div className="flex absolute bottom-0 right-0 mb-[3%] mr-[14%] ">
              <div className=" w-[21vw] max-laptop1:w-[17vw]   flex justify-end items-end z-10 -mr-[8vw]  mt-[27%]  flex-col">
                <img src="/iphone2.png" className="" alt="" />
              </div>
              <div className="w-[21vw] max-laptop1:w-[17vw] flex flex-col justify-center   items-center">
                <img src="/Iphone1.png" className="" alt="" />
                <div className="flex items-start justify-start -mt-[11%]  pl-[14%] max-laptop1:pl-[20%]">
                  <div className="flex flex-col pb-[10%] space-y-[1.5%] ">
                    <p className=" text-white text-[1vw] max-laptop1:text-[0.5vw] ">
                      {t("Download DIM Application!")}
                    </p>
                    <p className=" text-white text-[0.8vw] max-laptop1:text-[0.25vw]">
                      {t("All DIM Universe in your hand!")}
                      <br />
                      <br />
                    </p>
                    <img
                      className="w-[60%] "
                      src="/Group935.svg "
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};
