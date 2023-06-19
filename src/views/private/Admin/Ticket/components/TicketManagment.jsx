import React from "react";
import { Progress } from "@mantine/core";
import { RingProgress } from "@mantine/core";
import Vector from "./Vector.png";
function TicketManagment() {
  return (
    <>
      <div className="flex flex-row">
        <Ticket
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
        />

        <div className="rcolor w-[8%] h-20 rounded-md mt-2  ml-3 border-[2px]">
          <div className="absolute ml-10 w-5 mt-[30px]" ><img src={Vector} alt="" /></div>
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
          <div className="rcolor h-20 rounded-md mt-2 w-[17%]  ml-3 border-[2px]">
            <p className="text-[10px] font-medium pl-1 pt-1">TICKETS BY PROBLEM TYPE  &nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; TOP 3 </p>
          <div className="w-52 ml-3 mt-2 flex flex-col space-y-2">
          <Progress color="#0E76BB"  value={50}   />
          <Progress color="rgba(14, 118, 187, 0.71)" value={30} />
          <Progress color="rgba(14, 118, 187, 0.33)"  value={20} />
          </div>
           </div>  
      </div>
    </>
  );
}
function Ticket({ ticket, Number, color2, color, progressvalue, Number2 }) {
  return (
    <>
      <div className="rcolor  h-20 rounded-md mt-2  ml-3 border-[2px] w-[15%] ">
        <p className="text-[10px] font-medium pl-1 pt-1">{ticket}</p>
        <div className="flex flex-col">
          <p className={`text-[8px] pl-2 ${color}`}>
            {Number2} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span className={`${color} font-medium text-[25px]`}>{Number}</span>
          </p>
          <Progress
            className="w-36 ml-2"
            color={`${color2}`}
            value={progressvalue}
          />
        </div>
      </div>
    </>
  );
}

export default TicketManagment;
