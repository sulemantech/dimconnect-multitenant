import React from "react";
import PageProvider from "../../../providers/PageProvider";
import Card from "./Card";
import Table from "./Table";
export default () => {
  const [cards, setCards] = React.useState([
    {
      id: 0,
      title: "Open",
      count: 10,
      color: "blue",
      active: true,
    },
    {
      id: 1,
      title: "In Progress",
      count: 10,
      color: "yellow",
      active: false,
    },
    {
      id: 2,
      title: "Closed",
      count: 10,
      color: "green",
      active: false,
    },
  ]);

  const cardClickHandler = (id) => {
    setCards((cards) =>
      cards.map((card) => {
        if (card.id === id) {
          return {
            ...card,
            active: true,
          };
        } else {
          return {
            ...card,
            active: false,
          };
        }
      })
    );
  };

  return (
    <PageProvider>
      <div className="h-[83vh]">
        <div className="flex items-center justify-between">
          {/* <Card /> */}
          {cards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              count={card.count}
              color={card.color}
              active={card.active}
              handleClick={cardClickHandler}
            />
          ))}
        </div>
        <div
          className="
        flex flex-col
        bg-white
        rounded-xl
        shadow-lg
        p-4
        w-full
        mt-4
        
        "
        >
          <Table selected={cards.find((card) => card.active === true).title} />
        </div>
      </div>
    </PageProvider>
  );
};
