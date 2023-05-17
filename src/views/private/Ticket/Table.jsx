import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { deleteTicket, getAllTickets } from "../../../api";
import {
  IconBasket,
  IconBasketOff,
  IconCross,
  IconEdit,
  IconCheck,
} from "@tabler/icons";
import { showNotification } from "@mantine/notifications";
import EditTicketForm from "./EditTicketForm";
import { openModal } from "@mantine/modals";

export default ({ selected }) => {
  // const columns = [ columns should be an array of objects with these names
  {
    /*"value": "",
      "msg": "Description is required",
      "path": "description",
      "location": "body" */
  }

  useEffect(() => {
    getAllTickets()
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const columns = [
    {
      name: "ID",
      selector: "id",
      sortable: true,
    },
    {
      name: "Value",
      selector: "value",
      sortable: true,
    },
    {
      name: "Message",
      selector: "msg",
      sortable: true,
    },
    {
      name: "Path",
      selector: "path",
      sortable: true,
    },
    {
      name: "Location",
      selector: "location",
      sortable: true,
    },
    // add one more column with name Action, and it will have two values, one for edit and one for delete with icons
    {
      name: "Action",
      selector: "action",
      sortable: false,
      cell: (row) => (
        <div>
          <button
            onClick={() => {
              console.log(row);
              deleteTicket(row.id)
                .then((res) => {
                  console.log(res);
                  showNotification({
                    title: "Ticket Deleted",
                    message: "Ticket Deleted Successfully",
                    color: "green",
                    icon: <IconCheck size={24} />,
                  });
                })
                .catch((err) => {
                  console.log(err);
                  showNotification({
                    title: "Ticket Not Deleted",
                    message: "Ticket Not Deleted Successfully",
                    color: "red",
                    icon: <IconCross size={24} />,
                  });
                });
            }}
            className="
                    bg-red-500
                    hover:bg-red-700
                    text-white
                    font-bold
                    py-2
                    px-4
                    rounded
                    mr-2
                "
          >
            <IconBasketOff />
          </button>
          <button
            onClick={() => {
              console.log(row);
              openModal({
                title: "Edit Ticket",
                children: <EditTicketForm data={row} />,
              });
            }}
            className="
                bg-blue-500
                hover:bg-blue-700
                text-white
                font-bold
                py-2
                px-4
                rounded
                "
          >
            <IconEdit />
          </button>
        </div>
      ),
    },
  ];

  const data = [
    {
      id: 1,
      value: "Tiger Nixon",
      msg: "System Architect",
      path: "Edinburgh",
      location: "61",
    },
    {
      id: 2,
      value: "Garrett Winters",
      msg: "Accountant",
      path: "Tokyo",
      location: "63",
    },
    {
      id: 3,
      value: "Ashton Cox",
      msg: "Junior Technical Author",
      path: "San Francisco",
      location: "66",
    },
    {
      id: 4,
      value: "Cedric Kelly",
      msg: "Senior Javascript Developer",
      path: "Edinburgh",
      location: "22",
    },
  ];
  return (
    <>
      <div>
        <h1
          className="
                text-2xl
                font-semibold
                text-gray-700
                mb-4
                "
        >
          {selected} tickets
        </h1>
      </div>
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};
