import React, { useRef } from "react";
import { Checkbox } from "@mantine/core";
import subtract2 from "./SubtractBlue.png";
import subtract3 from "./SubtractGreen.png";
import subtract1 from "./Subtractred.png";
import { openModal } from "@mantine/modals";
// import blueDot from './Ellipse.png'

const MyTable = ({ data }) => {
  const mRef = useRef();
  // console.log("ticketssssss======================....",data)

  return (
    <>
      <dialog ref={mRef} className="modal">
        <div className="modal-content">
          <span className="close">&times;</span>
          <p>Some text in the Modal..</p>
        </div>
      </dialog>
      <table className="mt-3 ml-3 pb-2 w-[80%]">
        <thead className="tcolor text-xs">
          <tr className="text-end">
            <th>
              <Checkbox size="xs" />
            </th>
            <th>Ticket ID</th>
            <th>Status</th>
            <th> Requester</th>
            <th>Problem Type</th>
            <th>Title</th>
            <th>Priority</th>
            <th>Created</th>
            <th>Updated</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr
                className={`${
                  index % 2 === 0 ? "rcolor" : ""
                } text-end  text-xs `}
              >
                <td>
                  <Checkbox size="xs" />
                </td>
                <td>000{item.id}</td>
                <td>🎟️</td>
                <td>{item.user_id}</td>
                <td>{item.ticketCategory.name}</td>
                <td>{item.title}</td>
                <td>{item.ticketPriority.name}</td>
                <td>{new Date(item.created_at).toLocaleDateString()}</td>
                <td>{new Date(item.updated_at).toLocaleDateString()}</td>
                <td>
                  <button
                    className="bg-transparent border-none text-sky-600"
                    onClick={
                      () =>
                        openModal({
                          children: <TicketModal ticket={item} />,
                          size: "lg",
                          withCloseButton: true,
                          padding: "0",
                          backgroundColor: "transparent",
                        })
                      // open dialog box
                      // mRef.current.showModal()
                    }
                  >
                    See Ticket →
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default MyTable;

function TicketModal({ ticket }) {
  const status = {
    1: { name: "Open", color: "text-cyan-500", colorCode: "#06b6d4" },
    2: { name: "Closed", color: "text-lime-400", colorCode: "#84cc16" },
    3: { name: "Pending", color: "text-amber-400", colorCode: "#f59e0b" },
    4: { name: "Rejected", color: "text-red-500", colorCode: "#ef4444" },
    5: { name: "Solved", color: "text-green-500", colorCode: "#10b981" },
    6: { name: "Deleted", color: "text-red-500", colorCode: "#ef4444" },
  };
  return (
    <>
      <div className="flex flex-col h-[100%] p-0 m-0">
        <div className="flex flex-col justify-between items-center bg-[#D8E4EE] h-[30%] px-10">
          <div className="flex flex-row justify-between w-full items-center mt-0 pt-0">
            <h4 className="text-[12px] font-[600] text-[#3E3F3F]">
              Ticket Number
            </h4>
            <h4 className="text-[12px] font-[600] text-[#3E3F3F]">
              {ticket.id}
            </h4>
            <h4 className="text-[12px] font-[600] text-[#3E3F3F]"></h4>
            <h4 className="text-[12px] font-[600] text-[#3E3F3F]">
              Current Status &nbsp; {status[ticket.status_id].name}
            </h4>
            <h4 className="text-[12px] font-[600] text-[#3E3F3F]">
              <svg
                width="24"
                height="10"
                viewBox="0 0 24 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.37068 1H18.6293C21.0391 1 23 2.78824 23 5C23 7.21176 21.0483 9 18.6293 9H4.30779C2.48438 9 1.00916 7.64471 1.00916 5.96941H1C1 4.29412 2.47522 2.93882 4.29863 2.93882H18.5835C19.8022 2.93882 20.7918 3.84235 20.7918 4.96235C20.7918 6.08235 19.8022 6.98588 18.5835 6.98588H5.37984"
                  stroke="#3E3F3F"
                  stroke-width="0.9"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                />
              </svg>
            </h4>
            <h4 className="text-[12px] font-[600] text-[#3E3F3F]">
              {new Date(ticket.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h4>

            <br />
            <br />
            <br />
          </div>
          <div className="flex flex-row justify-between w-full items-center mt-0 pt-0">
            <h4 className="text-[12px] font-[400] text-[#3E3F3F]">Name</h4>
            <h4 className="text-[12px] font-[700] text-[#3E3F3F]">
              &nbsp;&nbsp;&nbsp;&nbsp;{ticket.title}
            </h4>

            <h4 className="text-[12px] font-[600] text-[#3E3F3F]"></h4>

            <h4 className="text-[12px] font-[400] text-[#3E3F3F]">
              Problem Type
            </h4>
            <h4 className="text-[12px] font-[700] text-[#3E3F3F]">
              {ticket.ticketCategory.name}
            </h4>

            <h4 className="text-[12px] font-[600] text-[#3E3F3F]"></h4>
            <h4 className="text-[12px] font-[600] text-[#3E3F3F]"></h4>
            <br />
            <br />
            <br />
          </div>

          <div className="flex flex-row justify-between w-full items-center mt-0 pt-0">
            <h4 className="text-[12px] font-[400] text-[#3E3F3F]">Title</h4>

            <h4 className="text-[12px] font-[700] text-[#3E3F3F]">
              &nbsp;&nbsp;{ticket.title}
            </h4>
            <h4 className="text-[12px] font-[600] text-[#3E3F3F]"></h4>
            <h4 className="text-[12px] font-[600] text-[#3E3F3F]"></h4>
            <h4 className="text-[12px] font-[600] text-[#3E3F3F]"></h4>
            <h4 className="text-[12px] font-[600] text-[#3E3F3F]"></h4>
            <h4 className="text-[12px] font-[600] text-[#3E3F3F]"></h4>
            <h4 className="text-[12px] font-[600] text-[#3E3F3F]"></h4>

            <br />
            <br />
            <br />
          </div>
          <div className="flex flex-row justify-between w-full items-center mt-0 pt-0 text-[12px] font-[400]">
            Hello! The map does not show a new connection line, but mobile
            applications shows each line correctly. I tried to reinstall Desktop
            Application and now system gives me this window (please look at
            attached file) ried to reinstall Desktop Application and now system
            gives me this window (please look at attached file)
            <br />
            <br />
            <br />
          </div>
        </div>
        <hr />
        <hr />
        <hr />
        <div className="flex flex-col justify-between items-center bg-[#D8E4EE] min-h-[30%] px-10">
          <div className="flex flex-row justify-between w-full items-center mt-0 pt-0 text-[12px] font-[400]">
            <h4 className="text-[12px] font-[400] text-[#3E3F3F]">
              Attached Files
            </h4>
            <h4 className="text-[12px] font-[400] text-[#3E3F3F]">
              <svg
                width="15"
                height="12"
                viewBox="0 0 15 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 0.4C6 0.179086 6.17909 0 6.4 0H8.6C8.82091 0 9 0.179086 9 0.4V6.6C9 6.82091 8.82091 7 8.6 7H6.4C6.17909 7 6 6.82091 6 6.6V0.4Z"
                  fill="#3E3F3F"
                />
                <path
                  d="M0 11.4C0 11.1791 0.179086 11 0.4 11H14.6C14.8209 11 15 11.1791 15 11.4V11.6C15 11.8209 14.8209 12 14.6 12H0.4C0.179086 12 0 11.8209 0 11.6V11.4Z"
                  fill="#3E3F3F"
                />
                <path
                  d="M7.80237 9.65085C7.64286 9.83504 7.35714 9.83504 7.19763 9.65085L4.17607 6.16186C3.95172 5.9028 4.13574 5.5 4.47845 5.5L10.5216 5.5C10.8643 5.5 11.0483 5.9028 10.8239 6.16186L7.80237 9.65085Z"
                  fill="#3E3F3F"
                />
              </svg>
            </h4>
          </div>
          <br/>
          <br/>
          <br/>
          <br/>
        </div>
      </div>
    </>
  );
}
