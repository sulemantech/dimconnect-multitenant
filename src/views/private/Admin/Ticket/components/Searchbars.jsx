import React from "react";
import Image from "./SICON.png";

function Searchbars({search, setSearch, setTickets, tickets}) {
  return (
    <>
        <div className="flex justify-between items-center  mt-1 ml-6">
          <div className="flex  flex-row w-[50%]">
            <p className="text-xs mt-0.5">Find Ticket</p>
            <img src={Image} alt="" className="w-[10px] h-[12px] m-1" />
            <input
              className="border-none bg-transparent  text-xs w-2/3"
              // value={search}
              onChange={(e) => {
                // setSearch(e.target.value);
                if(e.target.value !== "") {
                const filteredTickets = tickets.filter((ticket) => {
                  return (
                    ticket.title
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase()) ||
                    ticket.id.toString().includes(e.target.value) ||
                    ticket.description.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    new Date(ticket.created_at).toLocaleDateString().includes(e.target.value) ||
                    ticket.ticketPriority.name.toLowerCase().includes(e.target.value.toLowerCase())
                  );
                });
                setTickets(filteredTickets);
              } else {
                setSearch(val=> val+1);
              }
              }}
              type="text"
              placeholder="Enter Here Ticket Number,Name of User Or Other Searching Details"
            />
          </div>

          <div className="flex flex-row w-[30%]">
            <p className="text-xs ml-5 mt-0.5">Find User</p>
            <img src={Image} alt="" className="w-[10px] h-[12px] m-1" />
            <input
              className="border-none bg-transparent text-xs w-2/3"
              type="text"
              placeholder="Enter Here Name Of User"
              onChange={(e) => {
                if(e.target.value !== "") {
                const filteredTickets = tickets.filter((ticket) => {
                  return (
                    ticket.gpUser.vorname
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase()) ||
                    ticket.gpUser.nachname
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase())
                  );
                });
                setTickets(filteredTickets);
              } else {
                setSearch(val=> val+1);
              }
            }
              }
            />
          </div>
          {/* <hr className='w-7/12 h-24 ' /> */}
          {/* <div className="border-b-2  border-black w-5/12 ml-6"></div> */}
        </div>
    </>
  );
}

export default Searchbars;
