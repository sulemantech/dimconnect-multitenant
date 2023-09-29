import Footer from "../../../../layout/Footer";
import { useTranslation } from "react-i18next";
import { CopyButton, ActionIcon, Tooltip, rem } from "@mantine/core";
import { IconCopy, IconCheck } from "@tabler/icons-react";

export default () => {
  const { t } = useTranslation();

  const phoneNumber = '0221 - 806 5700';

  const handleCallClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };
  return (
    <>
      <div id="scale-down" className="flex min-h-screen bg-[#FFF]">
        <div className="flex flex-col">
          <div className=" font-[Roboto] flex flex-col space-y-10 max-laptop:space-y-2 mt-[6.5rem] pl-[6rem] max-laptop:mt-[3rem] max-laptop:pl-[3rem] max-2xl:mt-[4rem] max-2xl:pl-[4rem]">
            <div className=" space-y-3 ">
              <p className=" flex flex-row w-[60vw] text-[2rem] font-extrabold text-[#0078BE]  ">
                {t("Contacts, Training & Support")}
              </p>
              <p className="w-[60vw] max-laptop:text-[0.6rem] max-laptop:font-sm">
                {t(
                  "Please describe your issue in detail, with any relevant information including device platform and version affected, steps taken leading to the issue, which period of time this problem is go on etc."
                )}
              </p>
            </div>
            <div className="flex flex-1 flex-grow justify-center space-y-[3rem] max-laptop:space-y-2  w-[60.3475rem] flex-col max-laptop:w-[30rem] max-2xl:w-[40rem] ">
              <div className="flex flex-row space-x-10 text-[1.125rem]  text-[#0E76BB] max-laptop:text-[0.5rem] max-laptop:font-sm ">
                <img
                  src="/Group932.svg"
                  className="w-[2.6875rem] h-[2.6875rem] max-laptop:w-[1.3rem] max-laptop:h-[1.3rem]"
                  alt=""
                />
                <div className="flex flex-row items-center space-x-3">
                  <p>0221 - 806 5700</p>
                <CopyButton value="0221 - 806 5700" timeout={2000}>
                  {({ copied, copy }) => (
                    <Tooltip
                      label={copied ? "Copied" : "Copy"}
                      withArrow
                      position="right"
                    >
                      <ActionIcon
                        color={copied ? "teal" : "gray"}
                        variant="subtle"
                        onClick={copy}
                      >
                        {copied ? (
                          <IconCheck style={{ width: rem(16) }} />
                        ) : (
                          <IconCopy style={{ width: rem(16) }} />
                        )}
                      </ActionIcon>
                    </Tooltip>
                  )}
                </CopyButton>
                </div>
              </div>
              <div className="flex flex-row space-x-10 text-[1.125rem]  text-[#0E76BB] max-laptop:text-[0.6rem] max-laptop:font-sm">
                <img
                  src="/Group933.svg"
                  className="w-[2.6875rem] h-[2.6875rem]  max-laptop:w-[1.3rem] max-laptop:h-[1.3rem]"
                  alt=""
                />
                     <div className="flex flex-row items-center space-x-3">
                  <p>rlp-netzdetailplanung@de.tuv.com</p>
                <CopyButton value="rlp-netzdetailplanung@de.tuv.com" timeout={2000}>
                  {({ copied, copy }) => (
                    <Tooltip
                      label={copied ? "Copied" : "Copy"}
                      withArrow
                      position="right"
                    >
                      <ActionIcon
                        color={copied ? "teal" : "gray"}
                        variant="subtle"
                        onClick={copy}
                      >
                        {copied ? (
                          <IconCheck style={{ width: rem(16) }} />
                        ) : (
                          <IconCopy style={{ width: rem(16) }} />
                        )}
                      </ActionIcon>
                    </Tooltip>
                  )}
                </CopyButton>
                </div>
              </div>
              <div className="flex flex-row space-x-10  text-[1.125rem]  text-[#0E76BB] max-laptop:text-[0.6rem] max-laptop:font-sm">
                <img
                  src="/Group931.svg"
                  className="w-[2.6875rem] h-[2.6875rem] shadow-2xl shadow-blue-500  max-laptop:w-[1.3rem] max-laptop:h-[1.3rem]"
                  alt=""
                />
                <p>{t("Recall service here")}</p>
                <a onClick={handleCallClick} className="text-[#6F7379B8] underline" href="#">
                  {t("Here")}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className=" z-10  pt-[6.8rem] ">
          <div className="flex items-center bg-[url('/BG_Contacts1.png')]  px-16 max-sm:px-0 max-md:px-5 absolute bottom-0 left-0 right-0  mt-[20rem] h-[30vh] max-xl:h-[20vh] w-full">
            <div className="">
              <img
                className="w-[15rem] max-2xl:w-[10rem] max-sm:w-[8rem]"
                src="/logo_TUV.svg"
                alt=""
              />
            </div>
            <div className="flex-1" />
            <div className="flex absolute bottom-0 right-0 ">
              <div className=" flex flex-col relative mb-8 mr-[20%] max-sm:mr-[0%] justify-center items-center max-sm:items-end">
                <img src="/DIMMOBILES.svg" className="w-[80%] max-2xl:w-[60%]" alt="" />
                <div className="absolute mt-[80%] ml-[40%] max-2xl:mt-[60%] max-2xl:ml-[30%] max-sm:ml-[20%] max-sm:mt-[60%]">
                  <div className="flex flex-col space-y-1 ">
                    <p className=" text-white text-[0.68rem]  max-2xl:text-[0.5rem] max-sm:text-[2vw]">
                      {t("Download DIM Application!")}
                    </p>
                    <p className=" text-white text-[0.68rem] max-2xl:text-[0.5rem] max-sm:text-[2vw]">
                      {t("All DIM Universe in your hand!")}
                      <br />
                    </p>
                    <img className="w-[5rem] max-md:width-[3rem]" src="/Group935.svg " alt="" />
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
