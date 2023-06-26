import React, { useRef } from "react";
import { Checkbox, LoadingOverlay, Select } from "@mantine/core";
import subtract2 from "./SubtractBlue.png";
import subtract3 from "./SubtractGreen.png";
import subtract1 from "./Subtractred.png";
import { openModal } from "@mantine/modals";
// import blueDot from './Ellipse.png'
import DataTable from "react-data-table-component";

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

const FilterSelect = ({}) => (
  <Select
    options={[
      { value: 1, label: "Open" },
      { value: 2, label: "Closed" },
      { value: 3, label: "In Progress" },
      { value: 4, label: "Rejected" },
    ]}
    onChange={(e) => console.log(e.target.value)}
    isClearable={true}
    placeholder="Filter by status"
    styles={{ menu: (provided) => ({ ...provided, zIndex: 9999 }) }}
  />
);
const MyTable = ({ data, select, setSelect }) => {
  const columns = [
    // {
    //   name: <FilterSelect  />,
    //   selector: row => row.id, // A unique selector for this column. Adjust according to your data structure.
    //   sortable: false,
    //   hide: 'md',
    //   width: '200px', // Adjust this according to your needs.
    //   cell: () => " ",
    // },
    {
      name: "Ticket ID",
      selector: "id",
      cell: (row) => row.id.toString().padStart(6, "0"),
      sortable: true,
    },
    {
      name: "Status",
      selector: "status_id",
      cell: (row) => <img src={status[row.status_id].svg} alt="status" />,
      sortable: true,
    },
    {
      name: "Requester",
      selector: "requester",
      cell: (row) => row.gpUser.vorname + " " + row.gpUser.nachname,
      sortable: true,
    },
    {
      name: "Problem Type",
      selector: "problemType",
      cell: (row) => row.ticketCategory.name,
      sortable: true,
    },
    {
      name: "Title",
      selector: "title",
      sortable: true,
    },
    {
      name: "Priority",
      selector: "priority",
      cell: (row) => row.ticketPriority.name,
      sortable: true,
    },
    {
      name: "Created",
      selector: "created_at",
      cell: (row) =>
        new Date(row.created_at).toLocaleDateString().replaceAll("/", "."),
      sortable: true,
    },
    {
      name: "Updated",
      selector: "updated_at",
      cell: (row) =>
        new Date(row.updated_at).toLocaleDateString().replaceAll("/", "."),
      sortable: true,
    },
    {
      name: "",
      button: true,
      cell: (row) => (
        <button
          className="bg-transparent border-none text-sky-600"
          onClick={() =>
            // openModal without top close button and with custom close button
            openModal({
              children: <TicketModal ticket={row} />,
              size: "xl",
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

  return (
    <DataTable
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
      customStyles={{
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
            borderTopLeftRadius: "20px", // radius for the top left corner
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
            "&:nth-of-type(odd)": {
              backgroundColor: "#FFFFFF",
            },
            "&:nth-of-type(even)": {
              backgroundColor: "#F3F4F6",
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
      }}
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
      <div className="flex flex-col h-[100%] p-0 m-0 overflow-y-auto custom-scrollbar pt-3 bg-[#D8E4EE]">
        <div className="flex justify-between items-center bg-[#D8E4EE] py-1 px-4">
          {/* <div className="flex flex-row justify-between w-full items-center mt-0 pt-0"> */}
          <svg
            width="22"
            height="17"
            viewBox="0 0 22 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="Vector"
              d="M1 2.48513C1.0856 2.06902 1.24651 1.69643 1.5796 1.41137C1.92981 1.11163 2.33724 1.00015 2.78772 1.00015C6.9139 1.00113 11.0401 1.00064 15.1663 1.00064C16.5265 1.00064 17.8867 0.998683 19.247 1.00162C19.9591 1.00308 20.5123 1.29939 20.8209 1.95069C20.9315 2.18344 20.9907 2.46264 20.9917 2.72081C21.0019 6.57286 21.0014 10.4254 20.997 14.2774C20.9961 15.2964 20.2668 15.9966 19.2274 15.9971C14.4116 15.9981 9.59524 15.9971 4.7794 15.9971C4.11567 15.9971 3.45145 15.9859 2.78821 15.9996C1.85449 16.0186 1.14625 15.3967 1.02641 14.5845C1.02299 14.5601 1.00929 14.5366 1 14.5126C1 10.5041 1 6.49463 1 2.48513ZM2.53827 1.85535C2.52751 1.87393 2.51675 1.89251 2.50599 1.91109C2.55784 1.94825 2.61408 1.98052 2.66055 2.02306C5.21912 4.35492 7.77671 6.68874 10.3358 9.02061C10.7941 9.43818 11.2054 9.4372 11.6642 9.01865C14.2184 6.69119 16.7711 4.36177 19.3252 2.03431C19.3766 1.98737 19.4387 1.95265 19.4954 1.91207C19.4837 1.89348 19.4715 1.87442 19.4597 1.85583H2.53827V1.85535ZM9.0802 9.00936C6.87771 11.039 4.68109 13.0634 2.45806 15.1126C2.8019 15.2011 19.3164 15.1806 19.5184 15.0916C17.312 13.0585 15.1174 11.0361 12.9183 9.00936C12.664 9.23869 12.4473 9.43476 12.2301 9.63034C11.4417 10.3408 10.5564 10.3403 9.76643 9.6279C9.54926 9.43231 9.33258 9.23624 9.0802 9.00887V9.00936ZM1.89019 2.4465C1.79775 2.75308 1.81047 14.3249 1.89166 14.5024C4.07752 12.4869 6.26485 10.4694 8.46049 8.44461C6.2805 6.45453 4.09513 4.45956 1.89019 2.4465ZM13.5375 8.44461C15.7395 10.4753 17.9268 12.4927 20.1166 14.5121C20.2027 14.2325 20.1856 2.65773 20.0941 2.4597C17.9048 4.45809 15.7195 6.45306 13.537 8.4451L13.5375 8.44461Z"
              fill="#3E3F3F"
              stroke="#3E3F3F"
              stroke-width="0.5"
            />
          </svg>

          <h4 className="text-[12px] font-bold text-[#3E3F3F]">
            Ticket ID {ticket.id}
          </h4>
          <h4 className="text-[12px] font-bold text-[#3E3F3F]">
            Current Status &nbsp; <img src={`${status[ticket.status_id].svg}`} alt="status" className="inline-block" />
          </h4>
          {/*<h4 className="text-[12px] font-[600] text-[#3E3F3F]">
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
            </h4>*/}
          <h4 className="text-[12px] font-bold text-[#3E3F3F]">
            {new Date(ticket.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h4>
            <div className="mr-10">
          <svg
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="Rectangle 307 (Stroke)"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.99706 1.08977L1.08787 3.04031C0.97071 3.16001 0.97071 3.35407 1.08787 3.47377L2.99706 5.42431C3.11421 5.544 3.30416 5.544 3.42132 5.42431C3.53848 5.30461 3.53848 5.11055 3.42132 4.99086L2.02426 3.56354H7.3C8.4598 3.56354 9.4 4.52411 9.4 5.70903V10H10V5.70903C10 4.18556 8.79117 2.95054 7.3 2.95054H2.02426L3.42132 1.52323C3.53848 1.40353 3.53848 1.20947 3.42132 1.08977C3.30416 0.970076 3.11421 0.970076 2.99706 1.08977Z"
              fill="#3E3F3F"
              stroke="#3E3F3F"
              stroke-width="0.3"
            />
          </svg>
            </div>
          {/* 
            <br />
            <br />
            <br />
          </div> */}
          {/* <div className="flex flex-row justify-between w-full items-center mt-0 pt-0">
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
          </div> */}

          {/* <div className="flex flex-row justify-between w-full items-center mt-0 pt-0">
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
          </div> */}
          {/* <div className="flex flex-row justify-between w-full items-center mt-0 pt-0 text-[12px] font-[400]">
            Hello! The map does not show a new connection line, but mobile
            applications shows each line correctly. I tried to reinstall Desktop
            Application and now system gives me this window (please look at
            attached file) ried to reinstall Desktop Application and now system
            gives me this window (please look at attached file)
            <br />
            <br />
            <br />
          </div> */}
          
        </div>
        <div className="flex flex-row justify-between bg-[#F5F7F9] w-full items-center mt-0 pt-0 text-[12px] font-[400] px-6 ">
        <h4 className="py-2"></h4>

            <h4 className="text-[12px] font-[400] text-[#3E3F3F] py-2">Title</h4>
            <h4 className="text-[12px] font-[700] text-[#3E3F3F] ml-5 py-2">
              &nbsp;&nbsp;&nbsp;&nbsp;{ticket.title}
            </h4>
            <h4  className="py-2"></h4>
            <h4 className="py-2"></h4>
            <h4 className="py-2"></h4>
            </div>







        <div className="bg-white h-[0.2225rem]"></div>
        <div className="flex flex-col justify-between items-center bg-[#F5F7F9] min-h-[30%] px-10 pt-4">

          <div className="flex flex-row justify-between items-center  w-full py-3">
            <h3 className="text-[12px] font-bold text-[#3E3F3F]">{ticket.gpUser.vorname + " " + ticket.gpUser.nachname}</h3>
            <h3 className="text-[12px] font-bold text-[#3E3F3F]">{new Date(ticket.updated_at).toLocaleDateString(
              "us-Us", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}</h3>
          
          </div>
          <p className="text-[12px] font-[400] text-[#3E3F3F] text-justify w-full my-4">{ticket.description}</p>
          
          <div className="flex flex-row justify-between w-full items-center mt-0 pt-0 text-[12px] font-[400] mb-2">
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
          {/* <br />
          <br />
          <br />
          <br /> */}
          {ticket.ticketAttachments?.length > 0 && <div className="flex justify-start items-start w-full h-[90px] px-2 py-2 mr-2 mb-5">
            {ticket.ticketAttachments?.map((attachment, index) => {
              return (
                <img
                  className="mr-2"
                  src={`http://localhost:3002/static/tickets/${attachment.filename}`}
                  alt=""
                  width={150}
                  height={150}
                />
              );
            })}
          </div>}
        </div>

        <>
          {ticket.ticketComments?.map((comment, index) => {
            return (
              <div className="flex flex-col px-10 py-5 bg-white" key={comment.id}>
              <div className="flex flex-row justify-between items-center  w-full py-3">
            <h3 className="text-[12px] font-bold text-[#3E3F3F]">{ticket.gpUser.id === comment.user_id ? ticket.gpUser.vorname + " " + ticket.gpUser.nachname : "support Specialist"}</h3>
            <h3 className="text-[12px] font-bold text-[#3E3F3F]">{new Date(ticket.updated_at).toLocaleDateString(
              "us-Us", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}</h3>
          
          </div>
          <p className="text-[12px] font-[400] text-[#3E3F3F] text-justify w-full my-1">{ticket.description}</p>
          </div>
              // <div className="flex flex-col px-10 py-5 " key={comment.id}>
              //   <div className="flex flex-row justify-start w-full items-center mt-0 pt-0 text-[12px] font-[400]">
              //     <svg
              //       width="11"
              //       height="11"
              //       viewBox="0 0 11 11"
              //       fill="none"
              //       xmlns="http://www.w3.org/2000/svg"
              //     >
              //       <path
              //         fill-rule="evenodd"
              //         clip-rule="evenodd"
              //         d="M8.00294 1.08977L9.91213 3.04031C10.0293 3.16001 10.0293 3.35407 9.91213 3.47377L8.00294 5.42431C7.88579 5.544 7.69584 5.544 7.57868 5.42431C7.46152 5.30461 7.46152 5.11055 7.57868 4.99086L8.97574 3.56354H3.7C2.5402 3.56354 1.6 4.52411 1.6 5.70903V10H1V5.70903C1 4.18556 2.20883 2.95054 3.7 2.95054H8.97574L7.57868 1.52323C7.46152 1.40353 7.46152 1.20947 7.57868 1.08977C7.69584 0.970076 7.88579 0.970076 8.00294 1.08977Z"
              //         fill="#3E3F3F"
              //         stroke="#3E3F3F"
              //         stroke-width="0.3"
              //       />
              //     </svg>

              //     <h4 className="text-[0.75rem] font-semibold text-[#3E3F3F] ml-2">
              //       Answer
              //     </h4>
              //   </div>

              //   <p className="text-[#3E3F3F] text-justify font-light text-[0.75rem] my-3">
              //     {comment.body}
              //   </p>
              //   <div className="flex flex-col my-3">
              //     {comment.ticketAttachments?.map((attachment, index) => {
              //       console.log(attachment.filename);

              //       return (
              //         <a
              //           key={attachment.id}
              //           target="_blank"
              //           download={attachment.filename}
              //           href={`http://localhost:3002/static/tickets/${attachment.filename}`}
              //           className="text-[#3E3F3F] text-justify font-[400] text-sm bg-[#F5F7F9] rounded-lg px-5"
              //         >
              //           {attachment.filename}
              //         </a>
              //       );
              //     })}
              //   </div>
              //   <hr className="w-full" />
              // </div>
            );
          })}
        </>
        <div className="flex justify-start items-center  my-3 px-10 pt-4 mb-8">
          {/* <div className="text-[#3E3F3F] text-justify font-[400] text-sm bg-[#F5F7F9] rounded-lg px-5"> */}
          <div className="text-[#3E3F3F]  font-[400] bg-[#F5F7F9] text-sm  rounded-2xl px-3 py-1 mb-6s flex">
            Choose Status &nbsp; &nbsp; &nbsp;
            {Object.keys(status)
              .slice(0, 4)
              .map((key) => {
                return (
                  <img
                    title={` ${status[key].name}`}
                    src={status[key].svg}
                    alt=""
                    className="w-5 h-5 mx-2"
                    onClick={() => handleStatusChange(key)}
                  />
                );
              })}
          </div>

          {/* </div> */}
        </div>
      </div>
    </>
  );
}
