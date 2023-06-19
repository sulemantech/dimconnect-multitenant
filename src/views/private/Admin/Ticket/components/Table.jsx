import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Ticket",
    selector: (row) => row.Ticket,
    sortable: true,
    // reduce this column size to 5px width
    maxWidth: "10px",
  },
  {
    name: "Status",
    selector: (row) => row.Status,
    sortable: true,
    maxWidth: "10px",
  },
  {
    name: "Name",
    selector: (row) => row.Name,
    sortable: true,
  },
  {
    name: "Problem Type",
    selector: (row) => row.Problem,
    sortable: true,
  },
  {
    name: "Title",
    selector: (row) => row.Title,
    sortable: true,
  },
  {
    name: "Description",
    selector: (row) => row.Description,
    sortable: true,
  },
  {
    name: "Attachments",
    selector: (row) => row.Attachments,
    sortable: true,
  },
  {
    name: "Reasponsible",
    selector: (row) => row.Reasponsible,
    sortable: true,
  },
  {
    name: "Last Update",
    selector: (row) => row.updated_at,
    sortable: true,
  },
];

const data = [
  {
    id: 1,
    Ticket: "000",
    Status: "🟥",
    Name: "Inna Yan",
    Problem: "Map View",
    Title: "Map Problem",
    Description: "Hello! The Map Does Not Show A New Connection Line...",
    // Attachments:"Photo.jpg",
    Reasponsible: "Anna",
    updated_at: "May 29,2023",
  },
];

function Table({ tickets }) {
  return (
    <>
      <div className="max-h-96  w-auto overflow-auto">
        <DataTable columns={columns} data={tickets} />
      </div>
    </>
  );
}

export default Table;
