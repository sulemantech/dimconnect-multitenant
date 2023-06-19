import { Progress, RingProgress, Text } from '@mantine/core';
import React from 'react';

function TicketsMang({ticketCounts}) {
  console.log("ticketCounts=====", ticketCounts)
  let totalCount = ticketCounts.reduce((acc, curr) => acc + curr.count, 0);
  return (
    <div className="flex flex-row space-x-4 my-4">
      {ticketCounts.map((ticketCount) => (
        <Ticket
          ticket={ticketCount.name}
          color={ticketCount.color}
          Numbers={ticketCount.count}
        />
      ))}
      <RingProgress
      label={
        // <Text size="xs" align="center">
        //   Application data usage
        // </Text>
        <img className='ml-6 rotate-90' src="/needle.png" alt="needle" />
      }
      sections={[
        { value: 40, color: 'cyan' },
        { value: 15, color: 'orange' },
        { value: 15, color: 'grape' },
      ]}
    />
    </div>
  );
}

// function Ticket({ ticket, Numbers, color, colorCode }) {
//   return (
//     <div className='flex-1 bg-white  border-2 border-stone-100 rounded-md '>
//       <div className="flex-1   p-1 flex flex-col space-x-8 ">
//         <div className="text-xs font-medium flex-start">{ticket}</div>
//         <div className={`text-2xl font-bold ${color} flex-end`}>{Numbers>0?"0"+Numbers:Numbers}</div>
//       </div>
//       <Progress radius="md" color={colorCode} size="md" value={Numbers} className='m-5' />
//     </div>
//   );
// }

function Ticket({ ticket, Numbers, colorCode, color }) {
  return (
    <div className='w-full h-full'>
      <div className="bg-slate-100 rounded-md mt-2 shadow-2xl ml-3 border-[2px] px-2">
        <p className="text-sm font-medium pl-1 pt-1">{ticket}</p>
        <div className="flex flex-col mt-5 mb-3">
          <p className={`text-xs pl-2 ${color} flex justify-between items-end font-bold`}>
            0.3% 
            <span className={`${color} font-medium text-[25px]`}>{Numbers>0 ? "00"+Numbers : "000"}</span>
          </p>
          <Progress
            className="w-full mt-2"
            color={`${colorCode}`}
            value={18}
          />
        </div>
      </div>
    </div>
  );
}

export default TicketsMang;
