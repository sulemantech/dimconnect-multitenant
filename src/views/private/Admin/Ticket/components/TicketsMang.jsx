import React from 'react';

function TicketsMang() {
  return (
    <div className="flex flex-row space-x-4 my-4">
      <Ticket ticket="OVERDUE TICKETS" color="text-red-500" Numbers="7" />
      <Ticket ticket="OPEN TICKETS" color="text-cyan-500" Numbers="10" />
      <Ticket ticket="IN PROGRESS TICKETS" color="text-orange-500" Numbers="10" />
      <Ticket ticket="CLOSED TICKET" color="text-lime-400"  Numbers="3" />
      <Ticket ticket="TICKETS DUE TICKET" color="text-amber-400" Numbers="50" />
    </div>
  );
}

function Ticket({ ticket, Numbers, color }) {
  return (
    <div className='flex-1'>
      <div className="flex-1 bg-white border-2 border-stone-100 rounded-md  p-1 flex justify-center items-center space-x-8">
        <div className="text-xs font-medium">{ticket}</div>
        <div className={`text-2xl font-bold ${color}`}>{Numbers}</div>
      </div>
    </div>
  );
}

export default TicketsMang;
