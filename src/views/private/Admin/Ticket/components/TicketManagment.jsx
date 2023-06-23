import React from "react";
import { Progress } from "@mantine/core";
import { RingProgress } from "@mantine/core";
import Vector from "./Vector.png";
function TicketManagment({ ticketCounts }) {
  return (
    <>
      <div className="flex flex-row flex-wrap w-full justify-between px-5">
       
        {ticketCounts.map((ticket) => {
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

        <div className="rcolor w-auto h-24 rounded-md mt-2  border-[2px]">
          {/* <div className="fixed ml-10 w-5 mt-[30px]"> */}
            <img src={Vector} alt="" className="absolute ml-10 w-5 mt-[30px]" />
          {/* </div> */}
          <RingProgress
            className="rot ml-2 mb-5"
            size={86}
            thickness={12}
            // roundCaps
            sections={[
              { value: 10, color: "#0E76BB" },
              { value: 20, color: "#1DAF1A" },
              { value: 20, color: "#FF862E" },
              { value: 15, color: "#FF6161" },
            ]}
          />
        </div>
        <div className="rcolor min-h-[17%] rounded-md mt-2 min-w-[15%]  border-[2px] p-5 ">
          {/* <p className="text-[10px] font-medium pl-1 pt-1">
            TICKETS BY PROBLEM TYPE
            TOP 3
          </p> */}
          <div className="flex justify-between items-center">
            <p className="text-[0.625rem] font-bold">
              TICKETS BY PROBLEM TYPE
            </p>
            <p className="text-[10px] font-medium ">TOP 3</p>
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
  console.log(progressvalue);
  return (
    <>
      <div className="rcolor  h-auto rounded-md mt-2  border-[2px] w-max p-5 ">
        <p className="text-[0.625rem] font-bold ">{ticket.toUpperCase()} TICEKTS</p>
        <div className="flex flex-col">
          <p className={`text-[0.625rem]  ${color} flex items-baseline justify-between font-medium`}>
            {Number2} 
            <span className={`${color} font-bold text-[25px]`}>{Number}</span>
          </p>
          <Progress
            className="w-36 h-[0.63244rem]"
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
