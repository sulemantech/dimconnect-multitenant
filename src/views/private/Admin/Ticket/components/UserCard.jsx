import React,{useEffect} from "react";
import subtract2 from "./SubtractBlue.png";
// import VectorStroke from './VectorStroke.png'

function UserCard({tickets, select}) {

  const [active, setActive] = React.useState('userCard');

  const [item, setItem] = React.useState(select? tickets.find((i)=> i.id === select): null);
console.log(select? tickets.find((i)=> i.id === select): null)

useEffect(() => {
  setItem(select? tickets.find((i)=> i.id === select): null)
}, [select])



  return (
    <>
      <div className="mt-3 w-full rounded-r-md mb-5 flex flex-col justify-center items-center">
        <div className=" text-center   text-xs h-[18px] tcolor w-full flex justify-evenly">
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
        <div className="h-[60vh] ml-3 mr-3 mt-1 rcolor rounded-md px-2 w-min overflow-y-auto">
          {
            item !== null ? 
          (  active === "userTicket"?<div className="w-[15vw] p-2">
            
          <table className=" mt-2">
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
          </table>
          </div>
          :
          <div className="w-[15vw] flex flex-col p-2 text-xs"> 
            <label htmlFor="name" className="text-black  text-sm font-medium ">
              Name
            </label>
            <input
              placeholder={item?.gpUser.vorname + " " + item?.gpUser.nachname}
              id="name"
              className=" bg-[#F5F7F9] text-sm rounded-lg p-1 mt-1 px-5"
              lab
              type="text"
              value={item?.gpUser.vorname + " " + item?.gpUser.nachname}
            />
            <label htmlFor="email" className=" text-gray-700 text-sm font-medium mt-5">
              Email
            </label>
            <input
              placeholder={item?.gpUser.email}
              className=" bg-[#F5F7F9] text-sm rounded-lg p-1 mt-1 px-5"
              type="email"
              id="email"
              value={item?.gpUser.email}
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
          </div>):
          // show no ticket selected
          <h1 className="text-2xl text-center mt-20 w-[15vw]">No Ticket Selected</h1>
}
          
        </div>
      </div>
    </>
  );
}

export default UserCard;
