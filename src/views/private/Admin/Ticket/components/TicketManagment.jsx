import { Progress, RingProgress } from "@mantine/core";
import React, {useMemo} from "react";
import Vector from "./Vector.png";
import { useTranslation } from "react-i18next"

function TicketManagment({ ticketCounts }) {
  const tempCount = [
    {
        "name": "Open",
        "color": "text-[#0E76BB]",
        "colorCode": "#0E76BB",
        "count": 0
    },
    {
        "name": "Closed",
        "color": "text-[#1DAF1A]",
        "colorCode": "#1DAF1A",
        "count": 0
    },
    {
        "name": "In Progress",
        "color": "text-[#FF862E]",
        "colorCode": "#FF862E",
        "count": 0
    },
    {
        "name": "Overdue",
        "color": "text-[#FF6161]",
        "colorCode": "#FF6161",
        "count": 0
    },
    {
        "name": "Deleted",
        "color": "text-black",
        "colorCode": "#0000",
        "count": 0
    }
]

  const ticket = useMemo(() => {
    // return if ticketCounts is empty then return tempCount else return ticketCounts
    return ticketCounts.length === 0 ? tempCount : ticketCounts
  }, [ticketCounts])


  const { t } = useTranslation()
  return (
    <>
      <div className="flex flex-row flex-wrap w-full max-lg:grid max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-1">

        {
          ticket
        .map((ticket) => {
          return (
            <Ticket
              ticket={ticket.name}
              color2={ticket.colorCode}
              color={ticket.color}
              Number={
                // must be 3 digit number for better UI add extra 0 in front of number
                ticket.count < 10
                  ? "00" + ticket.count
                  : ticket.count < 100
                    ? "0" + ticket.count
                    : ticket.count

              }
              Number2={" ↑ " + ticket.count + "%"}
              progressvalue={ticket.count}
            />
          );
        })}

        {/* <div className="bg-[#ffffff] w-auto relative h-auto rounded-md mt-2  border-[2px]"> */}
          {/* <div className="fixed ml-10 w-5 mt-[30px]"> */}
          {/* <img src={Vector} alt="" className=" absolute ml-10 w-5 mt-[30px]" /> */}
          {/* </div> */}
          {/* <RingProgress
            className="rotate-[240deg] flex justify-center items-center"
            size={100}
            thickness={12}
            // roundCaps
            sections={[
              { value: 10, color: "#0E76BB" },
              { value: 20, color: "#1DAF1A" },
              { value: 20, color: "#FF862E" },
              { value: 15, color: "#FF6161" },
            ]}
          /> */}
        {/* </div> */}
        <div className="bg-[#ffffff] min-h-[17%] rounded-md mt-2 min-w-[15%]  border-[2px] p-5 ">
          {/* <p className="text-[10px] font-medium pl-1 pt-1">
            TICKETS BY PROBLEM TYPE
            TOP 3
          </p> */}
          <div className="flex justify-between items-center">
            <p className="text-[0.625rem] font-bold">
              {t('TICKETS BY PROBLEM TYPE')}
            </p>
            <p className="text-[10px] font-medium ">{t('TOP 3')}</p>
          </div>
          <div className="w-full mt-2 flex flex-col space-y-2">
            <Progress color="#0E76BB" value={50} />
            <Progress color="rgba(14, 118, 187, 0.71)" value={30} />
            <Progress color="rgba(14, 118, 187, 0.33)" value={20} />
          </div>
        </div>
      </div>
    </>
  );
}
function Ticket({ ticket, Number, color2, color, progressvalue, Number2 }) {
  const { t } = useTranslation()
  return (
    <>
      <div className="bg-[#ffffff]  h-auto rounded-md mt-2  border-[2px] w-auto flex-1 p-5  flex-wrap  mx-2">
        <p className="text-[0.625rem]  font-bold ">{t(ticket.toUpperCase())} {t('TICEKTS')}</p>
        <div className="flex flex-col">
          <p className={`text-[0.625rem]  ${color} flex items-baseline justify-between font-medium`}>
            {Number2}
            <span className={`${color} font-bold text-[25px]`}>{Number}</span>
          </p>
          <Progress
            className="w-[95%] h-[0.63244rem]"
            color={`${color2}`}
            value={progressvalue}
          // value={Number.toString()}
          />
        </div>
      </div>
    </>
  );
}

export default TicketManagment;
