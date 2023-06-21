import { useState, useEffect, useMemo } from "react";
import Search from "./components/Search";
// import Navbar from './components/Navbar'
import { getAllTickets } from "../../../../api";
// import SideBar from './components/SideBar'
import TicketManagment from "./components/TicketManagment";
import Searchbars from "./components/Searchbars";
import Table from "./components/Table";
import UserCard from "./components/UserCard";
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

  const [search, setSearch] = useState(1);

  const [select, setSelect] = useState();

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
        console.log("Tickets = = = = = = = = = == >>>>", res.data);

        setTicketCounts(count(res.data));

        setTickets(
          res.data
          
        );
      })
      .catch((err) => console.log(err));
  }, [search]);


  // useEffect(() => {
  //   // add search functionality
  //   console.log(search)
  //   const r = tickets
  //   if(!search === ""){const results = r.filter((ticket) =>
  //     {
  //       console.log(ticket)
  //       return ticket.title.toLowerCase().includes(search.toLowerCase())
  //     }
  //   );
  //   console.log("results =============>>>",results)
  //   setTickets(results);}
  //   else{
  //     getAllTickets()
  //     .then((res) => {
  //         setTickets(
  //           res.data
  //         )
  //     })
  //     .catch((err) => console.log(err));
  //   }
  // }, [search]);


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

  return (
    <>
      <div className="fbody h-full overflow-y-scroll">
        <TicketManagment ticketCounts={ticketCounts} />
        <Searchbars search={search} setSearch={setSearch} setTickets={setTickets} tickets={tickets} />

        <div className="flex flex-1 flex-wrap w-full justify-center items-start">
          <div className="min-w-[79%]">
            <Table data={tickets} select={select} setSelect={setSelect} />
          </div>
          <div className="min-w-[20%]">
            <UserCard tickets={tickets} select={select} />
          </div>
        </div>
      </div>
    </>
  );
};
