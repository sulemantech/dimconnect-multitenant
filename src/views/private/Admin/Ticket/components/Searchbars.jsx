import React from "react";
import Image from "./SICON.png";

function Searchbars() {
  return (
    <>
        <div className="flex  mt-1 ml-6 space-x-3">
          <p className="text-xs mt-0.5">Find Ticket</p>
          <img src={Image} alt="" className="w-4 h-4 mt-1" />
          <input
            className="border-none bg-transparent pl-10 w-4/12 text-xs"
            type="text"
            placeholder="Enter Here Ticket Number,Name of User Or Other Searching Details"
          />
           &nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           <p className="text-xs ml-5 mt-0.5">Find User</p>
          <img src={Image} alt="" className="w-4 h-4 mt-1" />
          <input
            className="border-none bg-transparent pl-10 w-3/12 text-xs"
            type="text"
            placeholder="Enter Here Name Of User"
          />
          {/* <hr className='w-7/12 h-24 ' /> */}
          {/* <div className="border-b-2  border-black w-5/12 ml-6"></div> */}
        </div>
    </>
  );
}

export default Searchbars;
