import React, { useRef } from "react";
import { Checkbox, LoadingOverlay } from "@mantine/core";
import subtract2 from "./SubtractBlue.png";
import subtract3 from "./SubtractGreen.png";
import subtract1 from "./Subtractred.png";
import { openModal } from "@mantine/modals";
// import blueDot from './Ellipse.png'
import DataTable from 'react-data-table-component';

export const status = {
  1: {
    name: "Open",
    color: "text-cyan-500",
    colorCode: "#06b6d4",
    svg: "/StatusBlue.svg",
  },
  2: {
    name: "Closed",
    color: "text-lime-400",
    colorCode: "#84cc16",
    svg: "/StatusGreen.svg",
  },
  3: {
    name: "In Progres",
    color: "text-amber-400",
    colorCode: "#f59e0b",
    svg: "/StatusBlue.svg",
  },
  4: {
    name: "Rejected",
    color: "text-red-500",
    colorCode: "#ef4444",
    svg: "/StatusRed.svg",
  },
  5: {
    name: "Solved",
    color: "text-green-500",
    colorCode: "#10b981",
    svg: "/StatusGreen.svg",
  },
  6: {
    name: "Deleted",
    color: "text-red-500",
    colorCode: "#0000",
    svg: "/StatusRed.svg",
  },
};

const MyTable = ({ data, select, setSelect }) => {
  const columns = [
    // {
    //   // add an dropdown option with select options, when selected some onption it will filter data and show only selected data
    //   name: ">",
    //   selector: ">",
    //   cell: (row) => (""),
    //   headCell: () => (
        
    //     <select
    //       className="w-10 h-10 rounded-md bg-gray-100"
    //       onChange={(e) => {
    //         // setSelect(e.target.value);
    //         console.log(e.target.value);
    //       }
    //       }
    //     >
    //       <option value="1">All</option>
    //       <option value="2">Open</option>
    //       <option value="3">Closed</option>
    //       <option value="4">In Progress</option>
    //       <option value="5">Rejected</option>
    //       <option value="6">Solved</option>
    //     </select>
    //   ),
        
    // },
    { 
      name: 'Ticket ID', 
      selector: 'id',
      cell: row => row.id.toString().padStart(6, "0"),
      sortable: true,
    },
    { 
      name: 'Status',
      selector: 'status_id',
      cell: row => <img src={status[row.status_id].svg} alt="status" />,
      sortable: true,
    },
    {
      name: 'Requester',
      selector: 'requester',
      cell: row => row.gpUser.vorname + " " + row.gpUser.nachname,
      sortable: true,
    },
    {
      name: 'Problem Type',
      selector: 'problemType',
      cell: row => row.ticketCategory.name,
      sortable: true,
    },
    {
      name: 'Title',
      selector: 'title',
      sortable: true,
    },
    {
      name: 'Priority',
      selector: 'priority',
      cell: row => row.ticketPriority.name,
      sortable: true,
    },
    {
      name: 'Created',
      selector: 'created_at',
      cell: row => new Date(row.created_at).toLocaleDateString().replaceAll("/", "."),
      sortable: true,
    },
    {
      name: 'Updated',
      selector: 'updated_at',
      cell: row => new Date(row.updated_at).toLocaleDateString().replaceAll("/", "."),
      sortable: true,
    },
    {
      name: '',
      button: true,
      cell: row => (
        <button
          className="bg-transparent border-none text-sky-600"
          onClick={() =>
            // openModal without top close button and with custom close button
            openModal({
              children: <TicketModal ticket={row} />,
              size: "lg",
              padding: "0",
              backgroundColor: "transparent",
              closeButtonLabel: "Close",
              hideCloseButton: true,
              closeOnOverlayClick: true,
              closeButtonProps: {
                style: {
                  position: "absolute",
                  top: 10,
                  right: 10,
                  backgroundColor: "transparent",
                  color: "#3E3F3F",
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                },
              },
            })
          }
        >
          See Ticket →
        </button>
      ),
    },
  ];
  



  return ( <DataTable
    progressPending={data.length === 0}
    progressComponent={<LoadingOverlay visible />}
    className="mt-3 "
    title=""
    columns={columns}
    data={data}
    // pagination
    // className=".dataTable-ticket-page"
    selectableRows
    selectableRowsSingle
    onSelectedRowsChange={(state) => setSelect(state.selectedRows[0])}
    customStyles={ {

      table: {
        style: {
          backgroundColor: "#ffffff26",
        },
      },

      header: {
        style: {
          backgroundColor: "#D8E4EE",
          textAlign: "left",
          fontWeight: "bold",
        },
      },
      headRow: {
        style: {
          // borderTopWidth: "0px",
          // borderTopColor: "#D8E4EE",
          backgroundColor: "#D8E4EE",
          minHeight: "3px",
          mapHeight: "10px",
          borderTopLeftRadius: "20px",   // radius for the top left corner
          borderBottomLeftRadius: "20px",
          borderBottomWidth: "0px",
          marginBottom: "10px",
        },
      },
      headCells: {
        style: {
          fontSize: "0.69rem", // equivalent to text-xs in tailwind
          // color: "#333333", // default font color
          // paddingLeft: "5px", // equivalent to pl-1 in tailwind
          // paddingRight: "5px", // equivalent to pr-1 in tailwind
        },
      },
      cells: {
        style: {
          fontSize: "0.7rem", // equivalent to text-xs in tailwind
          paddingLeft: "5px", // equivalent to pl-1 in tailwind
          // paddingRight: "5px", // equivalent to pr-1 in tailwind
          // paddingTop: "12px", // equivalent to pt-3 in tailwind
          // paddingBottom: "12px", // equivalent to pb-3 in tailwind
          borderBottomWidth: "0px",

          borderBottomColor: "#2454b400",
          width: "min-content !important",
        },
      },
      rows: {
        style: {
          fontSize: "0.75rem",
          borderBottomStyle: "solid",
          borderBottomWidth: "0px !important",
          borderBottomColor: "red",
          '&:nth-of-type(odd)': {
            backgroundColor: '#FFFFFF',
          },
          '&:nth-of-type(even)': {
            backgroundColor: '#F3F4F6',
            borderRadius: "0px",
          },
          
          minHeight: "20px",
          maxHeight: "25px",
          
          borderRadius: "20px", // equivalent to rounded-none in tailwind
          
        },
      },
      body: {
        rows: {
          style: {
            paddingLeft: "5px", // equivalent to pl-1 in tailwind
          },
        },
      },
    }
    }
  />

    
    
  );
};

export default MyTable;



// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// import Dwl from "./Download.svg";
// import Cable from "./Cable.svg";
// import SubBlue from "./SubtractBlue.svg";
// import SubRed from "./SubtractRed.svg";
// import SubOrange from "./SubtractOrange.svg";
// import SubGreen from "./SubtractGreen.svg";
// import Clip from "./Clip.svg";
// import Del from "./Group.svg";
function TicketModal({ ticket }) {

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
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
          <br />
          <br />
          <br />
          <br />
        </div>
        {/* <div className="fixed inset-0 flex items-center  bgcolor justify-center z-50">
          <div
            className="modal-overlay bg-black opacity-50 absolute inset-0"
            onClick={handleOverlayClick}
          ></div>
          <div className="modal-content bg-white h-[95%] w-[40%] text-[10px] rounded-lg Font font-[12px]  shadow-lg relative">
            <div className=" bgcolor text-right text-[10px] ">
              <button
                type="button"
                onClick={handleClose}
                className=" mt-[2px] mr-[2px]"
              >
                ✕
              </button>
            </div>
            <div className="flex space-x-12  bgcolor">
              <p className=" font-medium mb-2 ml-6">Ticket Number</p>
              <p className=" font-medium mb-2">0000010</p>
              <div className=" font-medium mb-2 flex space-x-1 ">
                <p>Current Status</p>
                <span className="w-[12px] mt-[3px]">
                  <img src="" alt="" />
                </span>
              </div>
              <p className=" font-medium mt-1">
                <img src="" alt="" />
              </p>
              <p className=" font-medium mb-1">
                May 29,2023 &nbsp;&nbsp;&nbsp;&nbsp;↰
              </p>
            </div>
            <div className="flex space-x-8 bgcolor">
              <p className=" mt-4 ml-6  mb-2">Name</p>
              <p className=" font-medium mt-4 mb-2">Elon Mask</p>
              &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;
              <div className=" mt-4  mb-2 ">Problem Type</div>
              <p className=" mt-4 font-medium mb-2">Map View</p>
            </div>
            <div className="flex space-x-8 bgcolor">
              <p className=" mt-4 ml-7  mb-2">Title&nbsp;&nbsp;&nbsp;&nbsp;</p>
              <p className=" mt-4 font-medium mb-2">Map View</p>
            </div>
            <div className="bgcolor">
              <br />
              <p className=" mx-6 pb-2">
                Hello! The map does not show a new connection line, but mobile
                applications shows each line correctly. I tried to reinstall
                Desktop Application and now system gives me this window (please
                look at attached file)ried to reinstall Desktop Application and
                now system gives me this window (please look at attached file)
              </p>
            </div>
            <div className="bgcolor">
              <div className="flex space-x-96  mt-[0.1px] items-center justify-center ">
                <p className="mt-5">3 Attached Files</p>{" "}
                <img className="h-3 mt-5" src="" alt="" />
              </div>
              <div className="flex space-x-2 pb-3 mt-2 ml-10">
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
              </div>
            </div>
            <div className="mt-3 ml-6">↱ Answar</div>
            <p className="mx-6 pb-2 mt-3">
              Hello! The map does not show a new connection line, but mobile
              applications shows each line correctly. I tried to reinstall
              Desktop Application and now system gives me this window (please
              look at attached file)ried to reinstall Desktop Application and
              now system gives me this window (please look at attached file)
            </p>
            <div className="mx-6 rounded-md mt-3 bg2color flex items-center ">
              <input type="file" className="input-style" />
            </div>
            <div className="mx-6 rounded-md mt-[2px] bg2color flex items-center ">
              <input type="file" className="input-style" />
            </div>
            <div className="flex space-x-32">
            <div className="mx-6 rounded-md mt-[10px] w-[30%] h-6 bg2color flex items-center pl-1">
              Choose State &nbsp;&nbsp;&nbsp; <img src="" alt="" />
              &nbsp;&nbsp;&nbsp;
              <img src="" alt="" />
              &nbsp;&nbsp;&nbsp;
              <img src="" alt="" />
              &nbsp;&nbsp;&nbsp;
              <img src="" alt="" />
              &nbsp;&nbsp;&nbsp;
            </div>
            <div className="mx-6 rounded-md mt-[10px] w-[30%] h-6 bg2color flex items-center pl-1">
              <p className=" font-medium">Tegs</p> &nbsp;&nbsp;&nbsp; <p>#VIP&nbsp;&nbsp;&nbsp;#MapError&nbsp;&nbsp;&nbsp;#Tesla</p>
            </div>
            </div>
             <div className=" w-[60%] max-h-[20px] mt-1 ml-6 h-4">
            <div>
                <CKEditor className="mt-8"
                    editor={ ClassicEditor }
                    data=" "
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
            </div>
            </div>

           //{/* <Texteditor/> 
          <div className="flex space-x-[87%] ml-6 mt-[60px]">
            <form onSubmit={handleFormSubmit}>
                <button
                  type="submit"
                  className=" bg-slate-300 hover:bg-slate-400 text-blue-500 font-bold py-1 px-2 rounded-lg"
                >
                  Send
                </button>
            </form>
                <div> <img className=" mt-1" src="" alt="" /></div>
              </div>
          </div>
        </div> */}
        
      </div>
    </>
  )
}