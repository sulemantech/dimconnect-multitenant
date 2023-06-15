// import { useState } from 'react'
import Search from './components/Search'
// import Navbar from './components/Navbar'
import TicketsMang from './components/TicketsMang'
import Table from './components/Table'
import UserCard from './components/UserCard'
// import SideBar from './components/SideBar'

export default () => {

    return (
        <div class={'flex overflow-y-auto'}>
            {/* <div><Navbar/></div> */}
            <div class={'p-4'}>
                <div><Search /></div>
                <div className='flex flex-col'>
                    <div><TicketsMang /></div>
                    <div>
                        <div ><Table /></div>
                    </div>
                </div>
            </div>
            <div className='p-4'><UserCard /></div>
        </div>
    )
}

