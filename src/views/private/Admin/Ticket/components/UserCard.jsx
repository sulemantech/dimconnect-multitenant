import React,{useEffect} from "react";
import subtract2 from "./SubtractBlue.png";
import DataTable from "react-data-table-component";
import { status } from "./Table";
// import VectorStroke from './VectorStroke.png'

function UserCard({tickets, select}) {

  const [active, setActive] = React.useState('userCard');

  const [item, setItem] = React.useState(select || null)

  const [filteredTickets, setFilteredTickets] = React.useState([])

useEffect(() => {
  setItem(select? select : null)
  setFilteredTickets(tickets.filter(ticket => ticket.gpUser.email === select?.gpUser.email))
}, [select])



  return (
    <>
      <div className="mt-3 w-full rounded-r-md mb-5 flex flex-col justify-center items-center">
        <div className=" text-center   text-xs h-[18px] bg-[#D8E4EE] rounded-r-lg w-full flex justify-evenly">
          <button className={active === "userTicket"? "text-sky-600 font-bold":""}
          onClick={() => setActive("userTicket")}
          >
            User Ticket History
          </button>
          {/* User Card */}
          <button className={active === "userCard"? "text-sky-600 font-bold":""}
          onClick={() => setActive("userCard")}
          >
            User Card
          </button>
          
        </div>
        <div className="h-[60vh] ml-6 mt-3 rcolor rounded-md px-2 w-min overflow-y-auto custom-scrollbar ">
          {  active === "userTicket"?<div className="w-auto p-2">


            <DataTable
              className="mt-3"
              expandOnRowClicked = {true}
              expandableRows
              expandableRowsComponent={(row)=>{ return <div className="px-5 py-5 pt-0"><h3 className="font-bold text-[0.75rem]"> Problem Type: {row.data.ticketCategory.name} </h3><p className="text-[0.75rem]">{row.data.description}</p></div>}}
              // add logic to show expandable rows icon after the 1st column
              expandableRowsComponentProps={{className:"text-sky-600 font-bold"}}
              

              columns={[
                {
                  name: "",
                  selector: "status",
                  // cell size max content
                  width: "max-content",
                  sortable: true,
                  cell: (row) => (<img src={status[row.status_id].svg} alt="status" />),
                },
                {
                  name: "",
                  selector: "ticketId",
                  sortable: true,
                  width: "max-content",
                  cell: (row) => (row.id ? row.id.toString().padStart(6, "0") : '---'),
                },
                {
                  name: "",
                  selector: "ticketType",
                  sortable: true,
                  width: "max-content",
                  cell: (row) => (row.ticketCategory ? row.ticketCategory.name : '---'),
                },
                {
                  name: "",
                  selector: "dueDate",
                  sortable: true,
                  width: "max-content",
                  cell: (row) => (row.created_at ? new Date(row.created_at).toLocaleDateString().replaceAll('/','.') : '---'),
                },
              ]}
              data={filteredTickets}
              // if there is no data show this message
              noDataComponent={<div className="text-xs text-gray-400 w-[15vw]">No Tickets Found</div>}
              customStyles={{
                headCells: {
                  style: {
                    display: "none",
                  },
                },
                headRow: {
                  style: {
                    display: "none",
                  },
                },
                rows: {
                  style: {
                    minHeight: "0px", // override the row height
                    maxHeight: "15px",
                    marginBottom: "15px",
                    borderBottomWidth: "0px !important",
                    fontSize: "10px",
                  },
                },


              }}
              
              />
            
          {/* <table className=" mt-2">
            <tbody className="overflow-y-scroll">
              <tr className="text-xs flex space-x-4 ">
                <td className=" w-3 mt-1 ml-1">
                  <img src={subtract2} alt="" />
                </td>
                <td>000005</td>
                <td>Map View</td>
                <td>29.05.2023</td>
              </tr>
              <tr className="text-xs flex space-x-4">
                <td className=" w-3 mt-1 ml-1">
                  <img src={subtract2} alt="" />{" "}
                </td>
                <td>000005</td>
                <td>Map View</td>
                <td>29.05.2023</td>
              </tr>
              <tr className="text-xs flex space-x-4">
                <td className=" w-3 mt-1 ml-1">
                  <img src={subtract2} alt="" />{" "}
                </td>
                <td>000005</td>
                <td>Map View</td>
                <td>29.05.2023</td>
              </tr>
              <tr className="text-xs flex space-x-4">
                <td className=" w-3 mt-1 ml-1">
                  <img src={subtract2} alt="" />{" "}
                </td>
                <td>000005</td>
                <td>Map View</td>
                <td>29.05.2023</td>
              </tr>
              <tr className="text-xs flex space-x-4">
                <td className=" w-3 mt-1 ml-1">
                  <img src={subtract2} alt="" />{" "}
                </td>
                <td>000005</td>
                <td>Map View</td>
                <td>29.05.2023</td>
              </tr>
              <tr className="text-xs flex space-x-4">
                <td className=" w-3 mt-1 ml-1">
                  <img src={subtract2} alt="" />{" "}
                </td>
                <td>000005</td>
                <td>Map View</td>
                <td>29.05.2023</td>
              </tr>
              <tr className="text-xs flex space-x-4">
                <td className=" w-3 mt-1 ml-1">
                  <img src={subtract2} alt="" />{" "}
                </td>
                <td>000005</td>
                <td>Map View</td>
                <td>29.05.2023</td>
              </tr>
              <tr className="text-xs flex space-x-4">
                <td className=" w-3 mt-1 ml-1">
                  <img src={subtract2} alt="" />{" "}
                </td>
                <td>000005</td>
                <td>Map View</td>
                <td>29.05.2023</td>
              </tr>
              <tr className="text-xs flex space-x-4">
                <td className=" w-3 mt-1 ml-1">
                  <img src={subtract2} alt="" />{" "}
                </td>
                <td>000005</td>
                <td>Map View</td>
                <td>29.05.2023</td>
              </tr>
              <tr className="text-xs flex space-x-4">
                <td className=" w-3 mt-1 ml-1">
                  <img src={subtract2} alt="" />{" "}
                </td>
                <td>000005</td>
                <td>Map View</td>
                <td>29.05.2023</td>
              </tr>
              <tr className="text-xs flex space-x-4">
                <td className=" w-3 mt-1 ml-1">
                  <img src={subtract2} alt="" />{" "}
                </td>
                <td>000005</td>
                <td>Map View</td>
                <td>29.05.2023</td>
              </tr>
              <tr className="text-xs flex space-x-4">
                <td className=" w-3 mt-1 ml-1">
                  <img src={subtract2} alt="" />{" "}
                </td>
                <td>000005</td>
                <td>Map View</td>
                <td>29.05.2023</td>
              </tr>
              <tr className="text-xs flex space-x-4">
                <td className=" w-3 mt-1 ml-1">
                  <img src={subtract2} alt="" />{" "}
                </td>
                <td>000005</td>
                <td>Map View</td>
                <td>29.05.2023</td>
              </tr>
            </tbody>
          </table> */}
          </div>
          :
          <div className="w-[15vw] flex flex-col p-2 text-xs"> 
            <label htmlFor="name" className="text-black  text-sm font-medium ">
              Name
            </label>
            <input
              placeholder={item !== null ? (item?.gpUser?.vorname + " " + item?.gpUser?.nachname) : ""}
              id="name"
              className=" bg-[#F5F7F9] text-sm rounded-lg p-1 mt-1 px-5"
              lab
              type="text"
              value={item !== null ? (item?.gpUser?.vorname + " " + item?.gpUser?.nachname): ""}
            />
            <label htmlFor="email" className=" text-gray-700 text-sm font-medium mt-5">
              Email
            </label>
            <input
              placeholder={item !== null ? (item?.gpUser?.email):""}
              className=" bg-[#F5F7F9] text-sm rounded-lg p-1 mt-1 px-5"
              type="email"
              id="email"
              value={item !== null ? (item?.gpUser?.email):""}
            />
            <label htmlFor="location" className="text-gray-700  text-sm font-medium mt-5">
              Location
            </label>
            <input
              placeholder=" Frankfurt, Germany"
              className="bg-[#F5F7F9] text-sm rounded-lg p-1 mt-1 px-5"
              type="password"
              name=""
              id="location"

            />
            <label htmlFor="comapny" className=" text-gray-700 text-sm font-medium mt-5">
              Company
            </label>
            <input
              id="company"
              placeholder=" Tesla Germany"
              className="bg-[#F5F7F9] text-sm rounded-lg p-1 mt-1 px-5"
              type="text"
            />
            <label htmlFor="vip" className="text-gray-700 text-sm font-medium mt-5">
              VIP
            </label>
            <input
              placeholder=" VIP"
              className="bg-[#F5F7F9] text-sm rounded-lg p-1 mt-1 px-5"
              type="text"
              id="vip"
            />
            <label htmlFor="description" className="text-gray-700 text-sm font-medium mt-5">
            Comments from Customer Care
            </label>
            <textarea
              placeholder=" a regular customer,  
              the head of the company, always demands
               a quick response "
              className=" bg-[#F5F7F9] rounded-lg text-sm p-1 px-5  h-[100px]"
              type="text"
              id="description"
            />
          </div>
}
          
        </div>
      </div>
    </>
  );
}

export default UserCard;
