import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getNRecentTickets } from "../../../../api";
import { IconCheck } from "@tabler/icons";
import { showNotification } from "@mantine/notifications";
import { openModal } from "@mantine/modals";
import { TicketModal } from "../Ticket/components/Table.jsx";
import { useTranslation } from "react-i18next";
// import { TicketModal } from "../Ticket/components/Table";

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


export default ({ selected }) => {
  const [data, setData] = useState([]);
  const {t}=useTranslation()

  useEffect(() => {
    getNRecentTickets(5)
      .then((res) => {
        setData(res.data); // Store the fetched data in the state variable
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const columns = [
    {
      name: <strong className="max-2xl:text-xs">{t('Ticket ID')}</strong>,
      selector: row=>row.id,
      cell: (row) =>(<span className="max-2xl:text-xs"> {row.id.toString().padStart(6, "0") } </span>),
      sortable: true,
    },
    {
      name: <strong className="max-2xl:text-xs">{t('Status')}</strong>,
      selector: row=>row.status_id,
      cell: (row) => <img src={status[row.status_id].svg} alt="status" />,
      sortable: true,
    },
    {
      name: <strong className="max-2xl:text-xs">{t('Requester')}</strong>,
      selector: row=>row.requester,
      cell: (row) =>(<span className="max-2xl:text-xs"> {row.gpUser.vorname + " " + row.gpUser.nachname  } </span>),
      sortable: true,
    },
    {
      name: <strong className="max-2xl:text-xs">{t('Problem Type')}</strong>,
      selector: row=>row.problemType,
      cell: (row) =>(<span className="max-2xl:text-xs">{ row.ticketCategory.name}</span>),
      sortable: true,
    },
    {
      name: <strong className="max-2xl:text-xs">{t('Title')}</strong>,
      selector: row=> row.title,
      cell: (row) =>(<span className="max-2xl:text-xs">{ row.title}</span>),
      sortable: true,
    },
    {
      name: <strong className="max-2xl:text-xs">{t('Priority')}</strong>,
      selector: row => row.priority,
      cell: (row) =>(<span className="max-2xl:text-xs"> {row.ticketPriority.name}</span>),
      sortable: true,
    },
    {
      name: <strong className="max-2xl:text-xs">{t('Created')}</strong>,
      selector: row => row.created_at,
      cell: (row) =>(<span className="max-2xl:text-xs"> {new Date(row.created_at).toLocaleDateString().replaceAll("/", ".")}</span>),
      sortable: true,
    },
    {
      name: <strong className="max-2xl:text-xs">{t('Updated')}</strong>,
      selector: row => row.updated_at,
      cell: (row) =>(<span className="max-2xl:text-xs"> {new Date(row.updated_at).toLocaleDateString().replaceAll("/", ".")}</span>),
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
          {t('See Ticket →')}
        </button>
      ),
    },
  ];
  return (
    <>
      <div className="hidden md:block">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};
