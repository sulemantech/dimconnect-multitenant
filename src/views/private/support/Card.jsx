import React from "react";

export default ({ title, count, color, active, handleClick, id }) => {
  return (
    // create an card with two divs, left and right
    // in left side of the card there will be three lines of text
    // in right side of the card there will be an icon
    // background color of the card will be white
    <div
      onClick={() => handleClick(id)}
      className={`flex flex-row justify-around items-center ${active ? "bg-[#0E76BB0a]" : "bg-white"
        } rounded-xl shadow-lg p-4 w-[30%]`}
    >
      <div className="flex flex-col items-start">
        <h1 className="text-2xl text-gray-700 font-semibold">{title}</h1>
        <p className="text-lg font-semibold">{count}</p>
        {/* <p className="text-sm text-gray-500">{}</p> */}
      </div>
      <div
        className={`flex flex-col items-end p-5 bg-[${color === "blue"
            ? "#3b82f6"
            : color === "yellow"
              ? "#f59e0b"
              : "#10b981"
          }]`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-ticket"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke={
            color === "blue"
              ? "#3b82f6"
              : color === "yellow"
                ? "#f59e0b"
                : "#10b981"
          }
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 5l0 2" />
          <path d="M15 11l0 2" />
          <path d="M15 17l0 2" />
          <path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-3a2 2 0 0 0 0 -4v-3a2 2 0 0 1 2 -2" />
        </svg>
      </div>
    </div>
  );
};
