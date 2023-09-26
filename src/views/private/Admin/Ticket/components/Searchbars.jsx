import React, {flushSync} from "react";
import Image from "./SICON.png";
import { useTranslation } from "react-i18next";

function Searchbars({ search, setSearch, setTickets, tickets }) {

  const { t } = useTranslation();
  return (
    <>
      <div className="flex justify-between items-center  mt-1 ml-6">
        <div className="flex  flex-row w-[50%]">
          <p className="text-xs mt-0.5 ml-3">{t("Find Ticket")}</p>
          <img src={Image} alt="" className="w-[10px] h-[12px] m-1" />
          <input
            className="border-none bg-transparent  text-xs w-2/3 focus:outline-none"
            // value={search}
            onChange={(e) => {
              // setSearch(e.target.value);
              // flushSync(() => {
              //   setSearch(val=> val + 1);
              // });
              if (e.target.value !== "") {
                // first reset the search state and search from entire data again
                // this is done to avoid the case where the user searches for a ticket number and then deletes the number
                const filteredTickets = tickets.filter((ticket) => {
                  return (
                    ticket.title
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase()) ||
                    ticket.id.toString().padStart(6, "0").includes(e.target.value) ||
                    ticket.description.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    new Date(ticket.created_at).toLocaleDateString().includes(e.target.value) ||
                    ticket.ticketPriority.name.toLowerCase().includes(e.target.value.toLowerCase())
                  );
                });
                setTickets(filteredTickets);
              } else {
                setSearch(val => val + 1);
              }
            }}
            type="text"
            placeholder={t("Search for Tickets...")}
          />
        </div>

        <div className="flex flex-row w-[30%] justify-end mr-3">
          <p className="text-xs ml-5 mt-0.5">{t("Find User")}</p>
          <img src={Image} alt="" className="w-[10px] h-[12px] m-1" />
          <input
            className="border-none bg-transparent text-xs w-2/6 focus:outline-none"
            type="text"

            placeholder={t("Enter User Name")}
            onChange={(e) => {
              if (e.target.value !== "") {
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
                setSearch(val => val + 1);
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
