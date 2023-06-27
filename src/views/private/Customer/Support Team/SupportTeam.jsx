import { Card, CardSection, Text } from "@mantine/core"
import PageProvider from "../../../../providers/PageProvider"
import { route } from "preact-router"

import {useState} from 'preact/hooks'

import icons from "../../../../layout/icons"
export default () => {
   
    const [data, setData] = useState({
        "FAQs": {
            icon: <icons.FAQIcon fill="#0E76BB" />,
           
            route: 'faq'
        },
        "Support Ticket": {
            // icon: <IconPremiumRights size={25} className="text-[#0E76BB]" />,
            icon : <icons.TicketIconBlue fill="#0E76BB" />,
            route: 'support_ticket'
        },
        "My Tickets": {
          // icon: <IconPremiumRights size={25} className="text-[#0E76BB]" />,
          icon : <icons.TicketIconBlue fill="#0E76BB" />,
          route: 'my_tickets'
      }
    })

    return (
       
        <PageProvider>
            <div class=''>
                <Card>
                    <CardSection className="p-2">

                        {/* <h6 className='font-bold text-neutral-700 tracking-wider'>Administration</h6>
                        <Divider /> */}
                        <div className={'flex rounded-md'}>

                        

                            {
                                Object.keys(data).map((key, index) => {
                                    return (
                                       
                                        <div className="p-2 m-2 hover:bg-sky-200 transition-all cursor-pointer hover:scale-95 hover:shadow-md rounded-md min-w-[100px]" onClick={() => { route(`/support_team/${data[key].route}`) }} key={index} >
                                            <div className={'flex flex-col items-center justify-center'}>
                                                {data[key].icon}
                                                <Text size={'xs'} className="text-sky-700 font-bold">{key}</Text>
                                            </div>
                                        </div>
                                       
                                    )
                                })
                            }

                        </div>
                    </CardSection>
                </Card>
            </div>
        </PageProvider>
       
    )
}