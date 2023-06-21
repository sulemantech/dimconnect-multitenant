import React from "react";
import { Progress } from "@mantine/core";
import { RingProgress } from "@mantine/core";
import Vector from "./Vector.png";
function TicketManagment({ ticketCounts }) {
  return (
    <>
      <div className="flex flex-row flex-wrap w-full justify-evenly">
        {/* <Ticket
          ticket="OVERDUE TICKETS"
          color2="red"
          color="text-red-500"
          Number="007"
          Number2=" ↑ +3.5%"
          progressvalue="33"
        />
        <Ticket
          ticket="OVERDUE TICKETS"
          color2="blue"
          color="text-blue-800"
          Number="010"
          Number2=" ↑ +3.5%"
          progressvalue="33"
        />
        <Ticket
          ticket="OVERDUE TICKETS"
          color2="orange"
          color="text-orange-400"
          Number="010"
          Number2=" ↑ +3.5%"
          progressvalue="33"
        />
        <Ticket
          ticket="OVERDUE TICKETS"
          color2="lime"
          color="text-lime-600"
          Number="003"
          Number2=" ↑ +3.5%"
          progressvalue="33"
        />
        <Ticket
          ticket="OVERDUE TICKETS"
          color2="black"
          color="text-black"
          Number="005"
          Number2=" ↑ +3.5%"
          progressvalue="33"
        /> */}
        {ticketCounts.map((ticket) => {
          return (
            <Ticket
              ticket={ticket.name}
              color2={ticket.colorCode}
              color={ticket.color}
              Number={ticket.count.toString()}
              Number2={" ↑ " + ticket.count + "%"}
              progressvalue={ticket.count}
            />
          );
        })}

        <div className="rcolor w-auto h-24 rounded-md mt-2  ml-3 border-[2px]">
          {/* <div className="fixed ml-10 w-5 mt-[30px]"> */}
            <img src={Vector} alt="" className="absolute ml-10 w-5 mt-[30px]" />
          {/* </div> */}
          <RingProgress
            className="rot ml-2 mb-5"
            size={86}
            thickness={12}
            // roundCaps
            sections={[
              { value: 10, color: "red" },
              { value: 20, color: "blue" },
              { value: 20, color: "orange" },
              { value: 15, color: "lime" },
            ]}
          />
        </div>
        <div className="rcolor min-h-[14%] rounded-md mt-2 w-max border-[2px] p-[0.4rem] ml-3 ">
          {/* <p className="text-[10px] font-medium pl-1 pt-1">
            TICKETS BY PROBLEM TYPE
            TOP 3
          </p> */}
          <div className="flex justify-between items-center">
            <p className="text-[0.5rem] font-medium pl-1 pt-1">
              TICKETS BY PROBLEM TYPE
            </p>
            <p className="text-[10px] font-medium pl-1 pt-1">TOP 3</p>
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
      <div className="rcolor  h-24 rounded-md mt-2  border-[2px] w-max p-2 ">
        <p className="text-[10px] font-medium pl-1 pt-1">{ticket.toUpperCase()} TICEKTS</p>
        <div className="flex flex-col">
          <p className={`text-[8px] pl-2 ${color} flex items-baseline justify-between`}>
            {Number2} 
            <span className={`${color} font-medium text-[25px]`}>{Number}</span>
          </p>
          <Progress
            className="w-36 ml-2"
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
