import React from "react";
import PageProvider from "../../../providers/PageProvider";
import Card from "./Card";
import Table from "./Table";
export default () => {
  const cards = [
    {
      title: "Open",
      count: 10,
      color: "blue",
    },
    {
      title: "In Progress",
      count: 10,
      color: "yellow",
    },
    {
      title: "Closed",
      count: 10,
      color: "green",
    },
  ];
  return (
    <PageProvider>
      <div>
        <div className="flex items-center justify-between">
          {/* <Card /> */}
          {cards.map((card) => (
            <Card title={card.title} count={card.count} color={card.color} />
          ))}
        </div>
        <div className="
        flex flex-col
        bg-white
        rounded-xl
        shadow-lg
        p-4
        w-full
        mt-4
        
        ">
          <Table /> 
        </div>
      </div>
    </PageProvider>
  );
};
