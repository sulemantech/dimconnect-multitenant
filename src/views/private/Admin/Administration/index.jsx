import { Button, Card, CardSection, Divider, Grid, Text } from "@mantine/core"
import PageProvider from "../../../../providers/PageProvider"
import { route } from "preact-router"
import { IconPremiumRights, IconUserCheck } from "@tabler/icons"
import {useState} from 'preact/hooks'
export default () => {
    

    const [data, setData] = useState({
        "User Management": {
            icon: <IconUserCheck size={25} className="text-[#0071b9]" />,
            route: 'users'
        },
        "Permissions Management": {
            icon: <IconPremiumRights size={25} className="text-[#0071b9]" />,
            route: 'permissions'
        }
    })

    return (
        <PageProvider>
            <div class='h-screen'>
                <Card>
                    <CardSection className="p-2">

                        <h6 className='font-bold text-neutral-700 tracking-wider'>Administration</h6>
                        <Divider />
                        <div>

                           

                            {
                                Object.keys(data).map((key, index) => {
                                    return (
                                        <Button variant="subtle" className="p-2 m-2" size="xl" onClick={() => { route(`/administration/${data[key].route}`) }} key={index} >
                                            <div className={'flex flex-col items-center justify-center'}>
                                                {data[key].icon}
                                                <Text size={'xs'}>{key}</Text>
                                            </div>
                                        </Button>
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