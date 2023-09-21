import { useState, useEffect } from 'preact/hooks'
import { getAllTickets, getMyTickets } from '../../../../api'
import { Table } from '@mantine/core'
import { route } from 'preact-router'
import SupportTicketHeader from './SupportTicketHeader'
export default () => {
    const [data, setData] = useState([])
    useEffect(() => {
        getMyTickets().then(res => {
            setData(res.data)
        })
    }, [])

    return (
        <>
        <div id="scale-down">
         <SupportTicketHeader/>
            <div className="flex flex-col p-4 h-screen  overflow-y-auto">
                <div className="flex flex-row justify-between items-center bg-white rounded-lg shadow-md p-2">
                    <h1 className="text-2xl font-bold">My Tickets</h1>
                    <div className="flex flex-row">

                    </div>
                </div>
                <hr />
                <div className="flex flex-col mt-4 ">

                    <Table striped withBorder highlightOnHover className="rounded-lg shadow-md bg-white">
                        <thead>
                            <tr>
                                <th className="text-left">Title</th>
                                <th className="text-left">Date</th>
                                <th className="text-left">Description</th>
                                <th className="text-left">Inbox</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                data.map((item, index) => {
                                    return (
                                        <tr
                                            onClick={() => { route(`/support_team/my_tickets/${item.id}`) }}
                                            className="cursor-pointer hover:bg-gray-100 transition-all" key={index}>
                                            <td className="text-left">{item.title}</td>
                                            <td className="text-left">{item.created_at}</td>
                                            <td className="text-left">
                                                {item.description}
                                            </td>
                                            <td className="text-left">
                                                <div className="flex flex-row items-center">
                                                    <div className={`w-3 h-3 rounded-full mr-2 ${item?.ticketComments?.length > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                                    <p className="text-sm">{item?.ticketComments?.length > 0 ? 'Inbox' : 'No Inbox'}</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
            </div>
        </>
    )
}