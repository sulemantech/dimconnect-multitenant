import { Button, Card, CardSection, Divider, Grid, Text } from "@mantine/core"
import PageProvider from "../../../../providers/PageProvider"
import { route } from "preact-router"
import { IconPremiumRights, IconUserCheck } from "@tabler/icons"
import {useState} from 'preact/hooks'
import { FaUserEdit, FaUsersCog } from 'react-icons/fa'
import PermissionsProvider from "../../../../providers/PermissionsProvider"
import PermissionWrapper from "../../../../providers/PermissionsProvider"
import { PERMISSIONS } from "../../../../common"
export default () => {
    
    

    const [data, setData] = useState({
        "User Management": {
            icon: <FaUserEdit size={30} className="text-[#0E76BB]" />,
            permission: PERMISSIONS["User Management"],
            route: 'users'
        },
        "Roles and Permissions": {
            // icon: <IconPremiumRights size={25} className="text-[#0E76BB]" />,
            icon : <FaUsersCog size={30} className="text-[#0E76BB]" />,
            permission: PERMISSIONS["Roles Management"],
            route: 'r&p'
        }
    })

    return (
        <PermissionsProvider permission={PERMISSIONS.Administration} view message>
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
                                        <PermissionWrapper permission={data[key].permission} view>
                                        <div className="p-2 m-2 hover:bg-sky-200 transition-all cursor-pointer hover:scale-95 hover:shadow-md rounded-md" onClick={() => { route(`/administration/${data[key].route}`) }} key={index} >
                                            <div className={'flex flex-col items-center justify-center'}>
                                                {data[key].icon}
                                                <Text size={'xs'} className="text-sky-700 font-bold">{key}</Text>
                                            </div>
                                        </div>
                                        </PermissionWrapper>
                                    )
                                })
                            }

                        </div>
                    </CardSection>
                </Card>
            </div>
        </PageProvider>
        // </PermissionsProvider>
    )
}