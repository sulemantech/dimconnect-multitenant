import { useState, useEffect } from "react";
import Search from "./components/Search";
// import Navbar from './components/Navbar'
import { getAllTickets } from "../../../../api";
// import SideBar from './components/SideBar'
import TicketManagment from './components/TicketManagment';
import Searchbars from './components/Searchbars';
import Table from './components/Table';
import UserCard from './components/UserCard';
const status = {
  1: { name: "Open", color: "text-cyan-500", colorCode: "#06b6d4" },
  2: { name: "Closed", color: "text-lime-400", colorCode: "#84cc16" },
  3: { name: "Pending", color: "text-amber-400", colorCode: "#f59e0b" },
  4: { name: "Rejected", color: "text-red-500", colorCode: "#ef4444" },
  5: { name: "Solved", color: "text-green-500", colorCode: "#10b981" },
  6: { name: "Deleted", color: "text-red-500", colorCode: "#ef4444" },
};
export default () => {
  const [tickets, setTickets] = useState([]);

  // ================= function for ticket count =================
  const count = (data) => {
    return Object.keys(status).map((key) => {
      return {
        name: status[key].name,
        color: status[key].color,
        colorCode: status[key].colorCode,
        count: data.filter((ticket) => ticket.status_id == key).length,
      };
    });
  };
  // ========================== END ==============================

  const [ticketCounts, setTicketCounts] = useState([]);
  useEffect(() => {
    getAllTickets()
      .then((res) => {
        console.log("Tickets = = = = = = = = = == >>>>",res.data);

        setTicketCounts(count(res.data));

        setTickets(
          res.data
          // res.data?.map((ticket) => ({
          //   id: ticket.id,
          //   Ticket: "000" + ticket.id,
          //   Status: status[ticket.status_id].name,
          //   Name: ticket.user_id,
          //   Problem: ticket.category_id,
          //   Title: ticket.title,
          //   Description: ticket.description,
          //   Attachments: "missing",
          //   Reasponsible: ticket.user_id,
          //   updated_at: new Date(ticket.updated_at).toLocaleDateString(),
          // }))
        );
      })
      .catch((err) => console.log(err));
  }, []);

  //   return (
  //     <div class={"flex overflow-y-auto justify-between"}>
  //       {/* <div><Navbar/></div> */}
  //       <div class={"p-4"}>
  //       <div className="w-full">

  //         <TicketsMang ticketCounts={ticketCounts} />
  //       </div>
  //         {/* <div>
  //           <Search />
  //         </div> */}
  //         <div className="flex flex-col">
  //           <div>
  //             {/* <div className="flex flex-row justify-between">
  //               // {/* create custom progress bars
  //             </div> */}
  //           </div>
  //           <div>
  //             <div>
  //               <Table tickets={tickets} />
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       {/* <div className="p-4">
  //         <UserCard />
  //       </div> */}
  //     </div>
  //   );
  // };

  return<>
  <div className='fbody min-h-screen'>
  <TicketManagment/>
  <Searchbars/>
 
 <div className='flex flex-1'><Table data={tickets} />
  <UserCard/> </div> 
  </div>
  </>
};
