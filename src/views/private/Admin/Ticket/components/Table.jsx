import React, { useRef } from "react";
import { Checkbox, LoadingOverlay, Select } from "@mantine/core";
import subtract2 from "./SubtractBlue.png";
import subtract3 from "./SubtractGreen.png";
import subtract1 from "./Subtractred.png";
import { closeAllModals, openModal } from "@mantine/modals";
// import blueDot from './Ellipse.png'
import DataTable from "react-data-table-component";
import { useState } from "react";
import { getResource, postComment, putTicket } from "../../../../../api";
import { useLayoutEffect } from "react";
// import './table.css'
import { useTranslation } from "react-i18next"

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


const MyTable = ({ data, select, setSelect, setUpdate }) => {
  const {t}=useTranslation()

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const columns = [
  
    {
      name: t("Ticket ID"),
      selector: "id",
      cell: (row) => row.id.toString().padStart(6, "0"),
      sortable: true,
    },
    {
      name:t("Status"),
      selector: "status_id",
      cell: (row) => <img src={status[row.status_id].svg} alt="status" />,
      sortable: true,
    },
    {
      name: t("Requester"),
      selector: "requester",
      cell: (row) => row.gpUser.vorname + " " + row.gpUser.nachname,
      sortable: true,
    },
    {
      name: t("Problem Type"),
      selector: "problemType",
      cell: (row) => row.ticketCategory.name,
      sortable: true,
    },
    {
      name: t("Title"),
      selector: "title",
      sortable: true,
    },
    {
      name: t("Priority"),
      selector: "priority",
      cell: (row) => row.ticketPriority.name,
      sortable: true,
    },
    {
      name: t("Created"),
      selector: "created_at",
      cell: (row) =>
        new Date(row.created_at).toLocaleDateString().replaceAll("/", "."),
      sortable: true,
    },
    {
      name: t("Updated"),
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
              children: <TicketModal ticket={row} setUpdate={setUpdate} />,
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
          {t('See Ticket')} →
        </button>
      ),
    },
  ];

  return (
    <DataTable
      progressPending={data.length === 0}
      progressComponent={<h1>Loading ....</h1>}
      className="mt-3 "
      title=""
      columns={columns}
      data={
        data.length > 0
          ? data.slice(
              (page - 1) * rowsPerPage,
              (page - 1) * rowsPerPage + rowsPerPage
            )
          : []
      }
      pagination
      // pages per page
      paginationPerPage={rowsPerPage}

      paginationComponent={()=>{
        return(
          <div className="flex justify-start mt-1">
            <div className="flex items-center ml-5 w-[50%]">
              <p className="text-sm text-gray-700 mr-2 text-[10px]">
                
                  <span className="text-[#0E76BB] text-[10px]">
                    {data.length > 0
                  ? `${
                      (page - 1) * rowsPerPage + 1
                    }-${(page - 1) * rowsPerPage + rowsPerPage}`
                  : ""}
                  </span>
                  &nbsp; <span className="text-[10px]">From</span> &nbsp;
                  <span className="text-[#0E76BB] text-[10px]">
                    {data.length}
                  </span>
                  &nbsp; <span className="text-[10px]">Items</span>

              </p>
            </div>
            <div className="flex items-center">
              
              <p className="text-sm text-gray-700 mr-2">
                 {/* Previous  1 2 3 4  Next */}
                 <span className="cursor-pointer text-[10px]"
                 onClick={() => {
                  if (page !== 1) {
                    setPage(page - 1);
                  }
                 }}
                 >
                  Previous
                 </span>
                    {data.length > 0
                    ? Array.from(
                        { length: Math.ceil(data.length / rowsPerPage) },
                        (_, i) => {
                          return { value: i + 1, label: i + 1 };
                        }
                      ).map((item, index) => {
                        return (
                          <span
                            key={index}
                            className={`${
                              page === item.value
                                ? "bg-[#D8E4EE] rounded"
                                : ""
                            } mx-1 p-3 pb-1 pt-1 text-[#0E76BB] cursor-pointer text-[10px]`}
                            onClick={() => {
                              setPage(item.value);
                            }}
                          >
                            {item.value}
                          </span>
                        );
                      })
                    : ""}
                    {/* </span> */}
                  <span className="cursor-pointer text-[10px]"
                  onClick={() => {
                    // first check if page is not last
                    if (page !== Math.ceil(data.length / rowsPerPage)) {
                      setPage(page + 1);
                    }
                  }}

                  >
                  Next
                  </span>

              </p>
            </div>
          </div>
        )
      }}
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


export const TicketModal = ({ ticket, setUpdate }) => {

  const [files, setFiles] = useState([]);
  const [answer, setAnswer] = useState("");
  const [ticketStatus, setTicketStatus] = useState(status[ticket.status_id]);


  const fileInputRef = useRef();

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
 
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setFiles(files);
  };


  const [ticketAttachments, setTicketAttachments] = useState([]);
  const [commentAttachments, setCommentAttachments] = useState([]);

  const handleAttachmentsDownload = async() => {
    
    const ticketFiles = await Promise.all(
      ticket.ticketAttachments.map(async (item) => {
        const response = await getResource(item.filename);
        return window.URL.createObjectURL(new Blob([response.data]));
      })
    );
    console.log(ticketFiles)
    setTicketAttachments(ticketFiles);

    const commentsFiles = ticket.ticketComments.map(comment=>{
      return comment.ticketAttachments.map(async (item) => {
        const response = await getResource(item.filename);
        return {uri: window.URL.createObjectURL(new Blob([response.data])), filename: item.filename};
      }
      )

    })

    
    // setCommentAttachments(commentsFiles);
    // commentsFiles is an array of arrays, I want to combine all the array of arrays into a single array
    const commentsFiles2 = await Promise.all(commentsFiles.flat());
    console.log(commentsFiles2)
    setCommentAttachments(commentsFiles2);
  };
  
  useLayoutEffect(() => {
    handleAttachmentsDownload();

    return () => {
      setCommentAttachments([]);
      setTicketAttachments([]);
    };
  }, []);
  

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
            Current Status &nbsp;{" "}
            <img
              src={`${status[ticket.status_id].svg}`}
              alt="status"
              className="inline-block"
            />
          </h4>
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
            attached file)ried to reinstall Desktop Application and now system
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
          <h4 className="py-2"></h4>
          <h4 className="py-2"></h4>
          <h4 className="py-2"></h4>
        </div>

        <div className="bg-white h-[0.2225rem]"></div>
        <div className="flex flex-col justify-between items-center bg-[#F5F7F9] min-h-[30%] px-10 pt-4">
          <div className="flex flex-row justify-between items-center  w-full py-3">
            <h3 className="text-[12px] font-bold text-[#3E3F3F]">
              {ticket.gpUser.vorname + " " + ticket.gpUser.nachname}
            </h3>
            <h3 className="text-[12px] font-bold text-[#3E3F3F]">
              {new Date(ticket.updated_at).toLocaleDateString("us-Us", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h3>
          </div>
          <p className="text-[12px] font-[400] text-[#3E3F3F] text-justify w-full my-4">
            {ticket.description}
          </p>

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
          {ticket.ticketAttachments?.length > 0 && (
            <div className="flex justify-start items-start w-full h-[90px] px-2 py-2 mr-2 mb-5">
              {ticket.ticketAttachments?.map((attachment, index) => {
               
                // return (
                //   <a href={ticketAttachments[0]} download={attachment.filename}  target="_blank" > Download </a>
                // )
                return (
                  <a key={attachment.id} href={ticketAttachments[index]} download={attachment.filename} target="_blank" >
                  <img
                    className="mr-2"
                    // src={`http://localhost:3002/static/tickets/${attachment.filename}`}
                    src={ticketAttachments[index]}
                    alt=""
                    width={150}
                    height={150}
                  />
                  </a>
                  // <a href={ticketAttachments[0]} download="test.jpeg" target="_blank" > Download </a>
                  // make this blob a file and download it
                  
                );
              })}
            </div>
          )}
        </div>

        <>
          {/* {ticket.ticketComments?. sort comments by timestamp */}
          {ticket.ticketComments?.sort((a, b) => {
            return (
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
            );
          })
          .map((comment, index) => {
            return (
              <>
              <div
                className={`flex flex-col px-10 py-5 ${ticket.gpUser.id === comment.user_id
                  ? ' bg-[#F5F7F9]'
                  : 'bg-white'}`}
                key={comment.id}
              >
                <div className="flex flex-row justify-between items-center  w-full py-3">
                  <h3 className="text-[12px] font-bold text-[#3E3F3F]">
                    {ticket.gpUser.id === comment.user_id
                      ? ticket.gpUser.vorname + " " + ticket.gpUser.nachname
                      : "support Specialist"}
                  </h3>
                  <h3 className="text-[12px] font-bold text-[#3E3F3F]">
                    {new Date(ticket.updated_at).toLocaleDateString("us-Us", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </h3>
                </div>
                <p className="text-[12px] font-[400] text-[#3E3F3F] text-justify w-full my-1">
                  {comment.body}
                </p>
              </div>

              {/* <div className="bg-[#F5F7F9] flex flex-row"> */}
                <div className={`flex flex-row px-10 flex-wrap ${ticket.gpUser.id === comment.user_id
                  ? ' bg-[#F5F7F9]'
                  : 'bg-white'} `}>
                  {comment.ticketAttachments?.map((attachment, index) => {

                    const fileURI = commentAttachments?.find(file=> file.filename === attachment.filename);

                    return (
                      
                      fileURI?.filename.split(".")[1] === "png" ||
                      fileURI?.filename.split(".")[1] === "jpg" ||
                      fileURI?.filename.split(".")[1] === "jpeg" ||
                      fileURI?.filename.split(".")[1] === "gif" ||
                      fileURI?.filename.split(".")[1] === "svg" ? (
                        <a
                          key={attachment.id}
                          target="_blank"
                          download={attachment.filename}
                          href={commentAttachments?.find(file=> file.filename === attachment.filename)?.uri}
                          className={`text-[#3E3F3F] text-justify font-[400] mx-2 text-sm bg-[#F5F7F9] rounded-lg px-5 ${ticket.gpUser.id === comment.user_id
                            ? 'bg-[#F5F7F9]'
                            : 'bg-white'}`}
                        >
                          <img
                            className="mr-2"
                            // src={`http://localhost:3002/static/tickets/${attachment.filename}`}
                            src={commentAttachments?.find(file=> file.filename === attachment.filename)?.uri}
                            alt=""
                            width={150}
                            height={150}
                          />
                        </a>
                      ) : (
                        <a
                          key={attachment.id}
                          target="_blank"
                          download={attachment.filename}
                          href={commentAttachments?.find(file=> file.filename === attachment.filename)?.uri}
                          className={`text-[#3E3F3F] text-justify font-[400] mx-2 text-sm bg-[#F5F7F9] rounded-lg px-5 ${ticket.gpUser.id === comment.user_id
                            ? 'bg-white'
                            : 'bg-[#F5F7F9]'}`}
                        >
                          {attachment.filename}
                        </a>

                      )

                    
                    );
                  })}
                </div>
                {/* </div> */}
                </>
              
            );
          })}
        </>
        <div className="flex flex-col justify-start items-start  px-10 pt-4 pb-8 bg-white">
          <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
            className="w-full h-20 bg-[#F5F7F9] rounded-lg px-5 py-3 mb-5 focus:border-[#d01e1e]"
            placeholder="Write your answer here..."
          ></textarea>
          {/* <div className="text-[#3E3F3F] text-justify font-[400] text-sm bg-[#F5F7F9] rounded-lg px-5"> */}
          <div className="flex flex-row justify-start items-center w-full">
          <div className="text-[#3E3F3F]  font-[400] bg-[#F5F7F9] text-sm  rounded-2xl px-3 py-1 mb-6s flex mr-5">
            Choose Status &nbsp; &nbsp; &nbsp;
            {Object.keys(status)
              .slice(0, 4)
              .map((key) => {
                
                return (
                  <img
                    title={` ${status[key].name}`}
                    src={status[key].svg}
                    alt=""
                    className={`cursor-pointer w-7 h-5 mx-2 px-1 ${status[key].name === ticketStatus?.name ? `bg-[#1e6ed068] rounded-lg` : ""}`}
                    onClick={() => {
                      putTicket(ticket.id, {status_id: Number(key)}).then(res=> {if(res.status === 200){setUpdate(prev => prev + 1)}})
                      console.log(ticket.id, {...ticket, status_id: key})
                      setTicketStatus(status[key]);
                      
                    }}
                  />
                );
              })}
          </div>
          <div htmlFor="file"
          onClick={() => {
            fileInputRef.current.click();
          }}
           className="text-[#3E3F3F] cursor-pointer font-[400] bg-[#F5F7F9] text-sm  rounded-2xl px-3 py-1 mb-6s flex w-[40%]">
            {/* choose file or Drop Files here to Upload */}
            <label htmlFor="file" className="w-full flex flex-row justify-start items-center cursor-pointer">
              <svg
              htmlFor="file"
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Vector">
                  <path
                    d="M5.40644 1C5.64128 1.0771 5.89178 1.12407 6.10822 1.23678C6.86441 1.63208 7.27226 2.26455 7.3114 3.12284C7.32079 3.32441 7.31257 3.52714 7.31257 3.75023C7.38224 3.75023 7.43704 3.75023 7.49223 3.75023C8.1173 3.75023 8.74198 3.75297 9.36705 3.74827C9.50874 3.7471 9.61716 3.79484 9.71422 3.8923C10.7628 4.94237 11.8149 5.9897 12.858 7.04525C12.9363 7.12431 12.9934 7.26325 12.9938 7.3744C13.0012 10.1552 13.0008 12.9359 12.9985 15.7167C12.9977 16.4572 12.4544 16.9984 11.7163 16.9988C8.57093 17.0004 5.42522 17.0004 2.2799 16.9988C1.54993 16.9988 1.00236 16.4579 1.00158 15.7284C0.999229 12.1614 0.999621 8.59434 1.00197 5.0273C1.00236 4.28916 1.54915 3.75375 2.28969 3.75062C2.49752 3.74983 2.70575 3.75062 2.93824 3.75062C2.93824 3.60698 2.94255 3.46882 2.93746 3.33067C2.91593 2.70994 3.09794 2.16201 3.52261 1.70292C3.86235 1.3358 4.2788 1.10763 4.77471 1.02935C4.79859 1.02544 4.8209 1.01018 4.8436 1C5.03108 1 5.21895 1 5.40644 1ZM4.15786 4.37448C3.54962 4.37448 2.96212 4.37448 2.37462 4.37448C1.87049 4.37448 1.62782 4.61713 1.62782 5.12201C1.62782 8.62604 1.62782 12.1301 1.62782 15.6345C1.62782 16.1292 1.87284 16.3746 2.36601 16.375C5.4538 16.375 8.54158 16.375 11.6294 16.375C12.1257 16.375 12.3726 16.1311 12.3726 15.6396C12.373 13.0259 12.3726 10.4119 12.3726 7.79827V7.6245C11.746 7.6245 11.1425 7.6245 10.5393 7.6245C9.68174 7.6241 9.12594 7.06991 9.1232 6.20966C9.12125 5.65781 9.1232 5.10597 9.1232 4.55373C9.1232 4.49815 9.1232 4.44297 9.1232 4.38309H7.31609C7.31609 4.44727 7.31609 4.50324 7.31609 4.55921C7.31492 5.09031 7.32196 5.62141 7.31101 6.15252C7.29261 7.04408 6.35285 7.78379 5.47845 7.60375C4.66942 7.43702 4.16021 6.81434 4.15864 5.98696C4.15747 5.45664 4.15864 4.92632 4.15864 4.37448H4.15786ZM4.15864 3.74357C4.15864 3.53379 4.15277 3.34123 4.15981 3.14907C4.18408 2.48294 4.82559 2.04264 5.44714 2.26181C5.84402 2.40192 6.08591 2.77334 6.08669 3.25357C6.08826 4.1283 6.08748 5.00342 6.08709 5.87816C6.08709 6.16935 5.97515 6.32159 5.76457 6.32081C5.55517 6.32003 5.44597 6.16778 5.44597 5.87424C5.44597 5.02025 5.44597 4.16587 5.44597 3.31188C5.44597 3.24965 5.44675 3.18664 5.4397 3.1248C5.4217 2.96434 5.29723 2.84888 5.13911 2.84105C4.9755 2.83283 4.84516 2.92833 4.81033 3.08997C4.79506 3.16042 4.78919 3.234 4.7888 3.30601C4.78723 4.15491 4.78684 5.00382 4.7888 5.85272C4.7888 5.97209 4.79624 6.09224 4.81111 6.21044C4.87021 6.6801 5.37238 7.05739 5.83698 6.98537C6.36185 6.90397 6.68633 6.53137 6.6875 5.9987C6.68985 5.08718 6.68633 4.17605 6.68907 3.26452C6.69024 2.83557 6.55481 2.46259 6.27379 2.13657C5.77475 1.55732 4.79545 1.47122 4.19387 1.94323C3.5958 2.41249 3.51791 3.04731 3.57741 3.74318L4.15864 3.74357ZM11.8689 6.99946C11.162 6.29224 10.4559 5.5858 9.74945 4.87857C9.74945 5.33218 9.74671 5.79871 9.75023 6.26484C9.75376 6.68597 10.0379 6.98616 10.4614 6.99672C10.9342 7.00846 11.4074 6.99946 11.8689 6.99946Z"
                    fill="#0E76BB"
                  />
                  <path
                    d="M6.98317 9.2495C6.18667 9.2495 5.39016 9.24872 4.59365 9.25029C4.44883 9.25029 4.34159 9.19393 4.27936 9.06321C4.22456 8.94814 4.23356 8.82173 4.32672 8.74658C4.40774 8.68122 4.52751 8.63191 4.63044 8.63073C5.45826 8.62173 6.28608 8.62565 7.11351 8.62565C7.87362 8.62565 8.63372 8.62486 9.39383 8.62643C9.57348 8.62682 9.69247 8.72388 9.7183 8.87887C9.74492 9.03777 9.67211 9.17867 9.52534 9.22759C9.46311 9.24833 9.39265 9.24911 9.32572 9.24911C8.54487 9.25068 7.76402 9.2495 6.98317 9.2495Z"
                    fill="#0E76BB"
                  />
                  <path
                    d="M6.99883 10.8753C7.79025 10.8753 8.58166 10.8749 9.37269 10.8757C9.55195 10.8757 9.67407 10.9559 9.71321 11.0925C9.77153 11.2968 9.63885 11.4878 9.42436 11.4976C9.27367 11.5046 9.12258 11.4995 8.9715 11.4995C7.55032 11.4995 6.12913 11.4995 4.70755 11.4995C4.66606 11.4995 4.62418 11.5007 4.58269 11.4995C4.38464 11.4933 4.24687 11.3614 4.25 11.1825C4.25313 11.0095 4.38817 10.8804 4.578 10.8769C4.78622 10.8729 4.99445 10.8757 5.20268 10.8757C5.80152 10.8757 6.39998 10.8753 6.99883 10.8753Z"
                    fill="#0E76BB"
                  />
                  <path
                    d="M6.98904 13.7496C6.19762 13.7496 5.40621 13.7484 4.61518 13.7508C4.48015 13.7508 4.36899 13.7155 4.29658 13.5958C4.18268 13.4075 4.29658 13.1641 4.51498 13.1296C4.5506 13.1242 4.58778 13.1253 4.62418 13.1253C6.20154 13.1253 7.77889 13.1253 9.35664 13.1253C9.54961 13.1253 9.6729 13.2017 9.7136 13.3414C9.77623 13.5574 9.6318 13.7465 9.39461 13.7484C8.97816 13.7519 8.5617 13.7496 8.14525 13.7496C7.76011 13.7496 7.37418 13.7496 6.98904 13.7496Z"
                    fill="#0E76BB"
                  />
                  <path
                    d="M5.40644 1C5.64128 1.0771 5.89178 1.12407 6.10822 1.23678C6.86441 1.63208 7.27226 2.26455 7.3114 3.12284C7.32079 3.32441 7.31257 3.52714 7.31257 3.75023C7.38224 3.75023 7.43704 3.75023 7.49223 3.75023C8.1173 3.75023 8.74198 3.75297 9.36705 3.74827C9.50874 3.7471 9.61716 3.79484 9.71422 3.8923C10.7628 4.94237 11.8149 5.9897 12.858 7.04525C12.9363 7.12431 12.9934 7.26325 12.9938 7.3744C13.0012 10.1552 13.0008 12.9359 12.9985 15.7167C12.9977 16.4572 12.4544 16.9984 11.7163 16.9988C8.57093 17.0004 5.42522 17.0004 2.2799 16.9988C1.54993 16.9988 1.00236 16.4579 1.00158 15.7284C0.999229 12.1614 0.999621 8.59434 1.00197 5.0273C1.00236 4.28916 1.54915 3.75375 2.28969 3.75062C2.49752 3.74983 2.70575 3.75062 2.93824 3.75062C2.93824 3.60698 2.94255 3.46882 2.93746 3.33067C2.91593 2.70994 3.09794 2.16201 3.52261 1.70292C3.86235 1.3358 4.2788 1.10763 4.77471 1.02935C4.79859 1.02544 4.8209 1.01018 4.8436 1C5.03108 1 5.21895 1 5.40644 1ZM4.15786 4.37448C3.54962 4.37448 2.96212 4.37448 2.37462 4.37448C1.87049 4.37448 1.62782 4.61713 1.62782 5.12201C1.62782 8.62604 1.62782 12.1301 1.62782 15.6345C1.62782 16.1292 1.87284 16.3746 2.36601 16.375C5.4538 16.375 8.54158 16.375 11.6294 16.375C12.1257 16.375 12.3726 16.1311 12.3726 15.6396C12.373 13.0259 12.3726 10.4119 12.3726 7.79827V7.6245C11.746 7.6245 11.1425 7.6245 10.5393 7.6245C9.68174 7.6241 9.12594 7.06991 9.1232 6.20966C9.12125 5.65781 9.1232 5.10597 9.1232 4.55373C9.1232 4.49815 9.1232 4.44297 9.1232 4.38309H7.31609C7.31609 4.44727 7.31609 4.50324 7.31609 4.55921C7.31492 5.09031 7.32196 5.62141 7.31101 6.15252C7.29261 7.04408 6.35285 7.78379 5.47845 7.60375C4.66942 7.43702 4.16021 6.81434 4.15864 5.98696C4.15747 5.45664 4.15864 4.92632 4.15864 4.37448H4.15786ZM4.15864 3.74357C4.15864 3.53379 4.15277 3.34123 4.15981 3.14907C4.18408 2.48294 4.82559 2.04264 5.44714 2.26181C5.84402 2.40192 6.08591 2.77334 6.08669 3.25357C6.08826 4.1283 6.08748 5.00342 6.08709 5.87816C6.08709 6.16935 5.97515 6.32159 5.76457 6.32081C5.55517 6.32003 5.44597 6.16778 5.44597 5.87424C5.44597 5.02025 5.44597 4.16587 5.44597 3.31188C5.44597 3.24965 5.44675 3.18664 5.4397 3.1248C5.4217 2.96434 5.29723 2.84888 5.13911 2.84105C4.9755 2.83283 4.84516 2.92833 4.81033 3.08997C4.79506 3.16042 4.78919 3.234 4.7888 3.30601C4.78723 4.15491 4.78684 5.00382 4.7888 5.85272C4.7888 5.97209 4.79624 6.09224 4.81111 6.21044C4.87021 6.6801 5.37238 7.05739 5.83698 6.98537C6.36185 6.90397 6.68633 6.53137 6.6875 5.9987C6.68985 5.08718 6.68633 4.17605 6.68907 3.26452C6.69024 2.83557 6.55481 2.46259 6.27379 2.13657C5.77475 1.55732 4.79545 1.47122 4.19387 1.94323C3.5958 2.41249 3.51791 3.04731 3.57741 3.74318L4.15864 3.74357ZM11.8689 6.99946C11.162 6.29224 10.4559 5.5858 9.74945 4.87857C9.74945 5.33218 9.74671 5.79871 9.75023 6.26484C9.75376 6.68597 10.0379 6.98616 10.4614 6.99672C10.9342 7.00846 11.4074 6.99946 11.8689 6.99946Z"
                    stroke="#0E76BB"
                    stroke-width="0.4"
                  />
                  <path
                    d="M6.98317 9.2495C6.18667 9.2495 5.39016 9.24872 4.59365 9.25029C4.44883 9.25029 4.34159 9.19393 4.27936 9.06321C4.22456 8.94814 4.23356 8.82173 4.32672 8.74658C4.40774 8.68122 4.52751 8.63191 4.63044 8.63073C5.45826 8.62173 6.28608 8.62565 7.11351 8.62565C7.87362 8.62565 8.63372 8.62486 9.39383 8.62643C9.57348 8.62682 9.69247 8.72388 9.7183 8.87887C9.74492 9.03777 9.67211 9.17867 9.52534 9.22759C9.46311 9.24833 9.39265 9.24911 9.32572 9.24911C8.54487 9.25068 7.76402 9.2495 6.98317 9.2495Z"
                    stroke="#0E76BB"
                    stroke-width="0.4"
                  />
                  <path
                    d="M6.99883 10.8753C7.79025 10.8753 8.58166 10.8749 9.37269 10.8757C9.55195 10.8757 9.67407 10.9559 9.71321 11.0925C9.77153 11.2968 9.63885 11.4878 9.42436 11.4976C9.27367 11.5046 9.12258 11.4995 8.9715 11.4995C7.55032 11.4995 6.12913 11.4995 4.70755 11.4995C4.66606 11.4995 4.62418 11.5007 4.58269 11.4995C4.38464 11.4933 4.24687 11.3614 4.25 11.1825C4.25313 11.0095 4.38817 10.8804 4.578 10.8769C4.78622 10.8729 4.99445 10.8757 5.20268 10.8757C5.80152 10.8757 6.39998 10.8753 6.99883 10.8753Z"
                    stroke="#0E76BB"
                    stroke-width="0.4"
                  />
                  <path
                    d="M6.98904 13.7496C6.19762 13.7496 5.40621 13.7484 4.61518 13.7508C4.48015 13.7508 4.36899 13.7155 4.29658 13.5958C4.18268 13.4075 4.29658 13.1641 4.51498 13.1296C4.5506 13.1242 4.58778 13.1253 4.62418 13.1253C6.20154 13.1253 7.77889 13.1253 9.35664 13.1253C9.54961 13.1253 9.6729 13.2017 9.7136 13.3414C9.77623 13.5574 9.6318 13.7465 9.39461 13.7484C8.97816 13.7519 8.5617 13.7496 8.14525 13.7496C7.76011 13.7496 7.37418 13.7496 6.98904 13.7496Z"
                    stroke="#0E76BB"
                    stroke-width="0.4"
                  />
                </g>
              </svg>
              <p className="text-xs text-[#8F8F8F] mx-4">
              <span className="text-[#0E76BB]">Attach file</span> or Drop files here to upload
              </p>
              </label>
              <input
                ref={fileInputRef}
                onChange={handleFileChange}
                type="file"
                name="file"
                className="hidden w-0"
                multiple
              />
             
          </div>
          
          </div>
          <button 
          onClick={async() =>{
            // create a new form data object and add answer state as body, and files as file key value pair
            const formData = new FormData();
            formData.append("body", answer);

            files.forEach((file) => {
              formData.append("files", file);
            });
            const sortedComments = ticket.ticketComments?.sort((a, b) => {
              return (
                new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime()
              )
            })
            console.log(sortedComments)
            sortedComments[sortedComments.length - 1]?.id ? formData.append("reply_to", sortedComments[sortedComments.length - 1].id) : null;
            // call the post request function
            try{
             const data = await postComment(ticket.id,formData);
              // if the request is successful, update the ticket state with the new comment
              setUpdate(prev => prev + 1);
              setAnswer("");
              setFiles([]);
              closeAllModals();
            }catch(err){
              console.log(err);
            }

          }}
          className="bg-[#D8E4EE] text-lg font-bold rounded-lg text-[#0E76BB] px-5 py-3 mt-4 ml-1
            hover:bg-[#0E76BB] hover:text-white transition duration-300 ease-in-out
          ">
            Send
          </button>
        </div>
      </div>
    </>
  );
};