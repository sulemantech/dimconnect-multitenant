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
  1: { name: "Open", color: "text-[#0E76BB]", colorCode: "#0E76BB" },
  2: { name: "Closed", color: "text-[#1DAF1A]", colorCode: "#1DAF1A" },
  3: { name: "In Progress", color: "text-[#FF862E]", colorCode: "#FF862E" },
  5: { name: "Overdue", color: "text-[#FF6161]", colorCode: "#FF6161" },
  6: { name: "Deleted", color: "text-black", colorCode: "#0000" },
};
export default () => {
  const [tickets, setTickets] = useState([]);

  const [search, setSearch] = useState(1);

  const [select, setSelect] = useState();

  const [update, setUpdate] = useState(1);

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
  }, [search, update]);

  return (
    <>
      <div className="fbody h-full overflow-y-auto custom-scrollbar-page">
        <TicketManagment ticketCounts={ticketCounts} />
        <Searchbars search={search} setSearch={setSearch} setTickets={setTickets} tickets={tickets} />

        <div className="flex flex-1 flex-wrap w-full justify-center items-start">
          <div className="min-w-[78%] " style={{
            borderTopLeftRadius: "0.5rem",}
          }>
            <Table data={tickets} select={select} setSelect={setSelect} setUpdate={setUpdate} />
          </div>
          <div className="min-w-[20%]">
            <UserCard tickets={tickets} select={select} />
          </div>
        </div>
      </div>
    </>
  );
};
