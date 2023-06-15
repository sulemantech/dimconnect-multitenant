import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Ticket',
        selector: row => row.Ticket,
        sortable: true,
    },
    {
        name: 'Status',
        selector: row => row.Status,
        sortable: true,
    },
    {
        name: 'Name',
        selector: row => row.Name,
        sortable: true,
    },
    {
        name: 'Problem Type',
        selector: row => row.Problem,
        sortable: true,
    },
    {
        name: 'Title',
        selector: row => row.Title,
        sortable: true,
    },
    {
        name: 'Description',
        selector: row => row.Description,
        sortable: true,
    },
    {
        name: 'Attachments',
        selector: row => row.Attachments,
        sortable: true,
    },
    {
        name: 'Reasponsible',
        selector: row => row.Reasponsible,
        sortable: true,
    },
    {
        name: 'Last Update',
        selector: row => row.LastUpdate,
        sortable: true,
    },
];

const data = [
    {
        id: 1,
        Ticket:"0000007",
        Status:"🟥",
        Name:"Inna Yan",
        Problem:"Map View",
        Title:"Map Problem",
        Description:"Hello! The Map Does Not Show A New Connection Line...",
        Attachments:"Photo.jpg",
        Reasponsible:"Anna",
        LastUpdate:"May 29,2023",
    },
    {
        id: 2,
        Ticket:"0000007",
        Status:"🟥",
        Name:"Inna Yan",
        Problem:"Map View",
        Title:"Map Problem",
        Description:"Hello! The Map Does Not Show A New Connection Line...",
        Attachments:"Photo.jpg",
        Reasponsible:"Anna",
        LastUpdate:"May 29,2023",
    },
    {
        id: 3,
        Ticket:"0000007",
        Status:"🟥",
        Name:"Inna Yan",
        Problem:"Map View",
        Title:"Map Problem",
        Description:"Hello! The Map Does Not Show A New Connection Line...",
        Attachments:"Photo.jpg",
        Reasponsible:"Anna",
        LastUpdate:"May 29,2023",
    },
    {
        id: 4,
        Ticket:"0000007",
        Status:"🟦",
        Name:"Inna Yan",
        Problem:"Map View",
        Title:"Map Problem",
        Description:"Hello! The Map Does Not Show A New Connection Line...",
        Attachments:"Photo.jpg",
        Reasponsible:"Anna",
        LastUpdate:"May 29,2023",
    },
    {
        id: 5,
        Ticket:"0000007",
        Status:"🟦",
        Name:"Inna Yan",
        Problem:"Map View",
        Title:"Map Problem",
        Description:"Hello! The Map Does Not Show A New Connection Line...",
        Attachments:"Photo.jpg",
        Reasponsible:"Anna",
        LastUpdate:"May 29,2023",
    },
    {
        id: 6,
        Ticket:"0000007",
        Status:"🟦",
        Name:"Inna Yan",
        Problem:"Map View",
        Title:"Map Problem",
        Description:"Hello! The Map Does Not Show A New Connection Line...",
        Attachments:"Photo.jpg",
        Reasponsible:"Anna",
        LastUpdate:"May 29,2023",
    },
    {
        id: 7,
        Ticket:"0000007",
        Status:"🟦",
        Name:"Inna Yan",
        Problem:"Map View",
        Title:"Map Problem",
        Description:"Hello! The Map Does Not Show A New Connection Line...",
        Attachments:"Photo.jpg",
        Reasponsible:"Anna",
        LastUpdate:"May 29,2023",
    },
    {
        id: 8,
        Ticket:"0000007",
        Status:"🟦",
        Name:"Inna Yan",
        Problem:"Map View",
        Title:"Map Problem",
        Description:"Hello! The Map Does Not Show A New Connection Line...",
        Attachments:"Photo.jpg",
        Reasponsible:"Anna",
        LastUpdate:"May 29,2023",
    },
    {
        id: 9,
        Ticket:"0000007",
        Status:"🟦",
        Name:"Inna Yan",
        Problem:"Map View",
        Title:"Map Problem",
        Description:"Hello! The Map Does Not Show A New Connection Line...",
        Attachments:"Photo.jpg",
        Reasponsible:"Anna",
        LastUpdate:"May 29,2023",
    },
]

function Table() {
    return (
    <>
      <div className='max-h-96 mt-5 ml-5  w-auto overflow-auto'>
        <DataTable
            columns={columns}
            data={data}/>
            </div>  
    </>
    );
};

export default Table