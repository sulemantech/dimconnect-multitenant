import PageProvider from "../../../../providers/PageProvider"
import CustomTable from "../../../../components/CustomTable"
import { Card, CardSection, Divider, Loader, Pagination } from "@mantine/core"
import { createUser, deleteUser, editUser, getRoles, getUsers } from "../../../../api";
import { useState, useLayoutEffect } from 'preact/hooks'
import { IconUser, IconUserCheck, IconUserPlus } from "@tabler/icons";
import { IconUserCancel } from "@tabler/icons-react";
import { useDidUpdate } from "@mantine/hooks";
export default () => {


   
    const [data, setData] = useState([]);

    const [roles, setRoles] = useState([]);
    const [ready, setReady] = useState(false)

   
    const getData = async () => {
        try {
            const users = await getUsers().catch(e => setData([]))
            setData(users.data);
           
           
        } catch (err) {}
        try {
            const roles = await getRoles().catch(e => setRoles([]));
            setRoles(roles.data.roles)
        } catch (err) {}
        setReady(true)
    }
    const refreshData = () => {
        getData()
    }

    useLayoutEffect(getData, [])


    return (
        <PageProvider>
            <div className="">

                <div className="flex flex-wrap justify-center">
                    <div className="m-2 bg-white text-gray-700 rounded-lg p-5 shadow-lg min-w-[250px] flex-1 flex">
                        <div>
                            <h2 className="text-lg">Pending Users</h2>
                            <div className="flex items-center mt-2">
                                <h3 className="text-2xl">237</h3>
                                <span className="text-green-500 ml-2">( + 42%)</span>
                            </div>
                            <p className="text-sm mt-2">Last week analytics</p>
                        </div>
                        <div className="flex-1" />
                        <div className="text-yellow-500">
                            <IconUser size={32} />
                        </div>
                    </div>

                    <div className="m-2 bg-white text-gray-700 rounded-lg p-5 shadow-lg  min-w-[250px] flex-1 flex">
                        <div>
                            <h2 className="text-lg">Active Users</h2>
                            <div className="flex items-center mt-2">
                                <h3 className="text-2xl">19,860</h3>
                                <span className="text-red-500 ml-2">( - 14%)</span>
                            </div>
                            <p className="text-sm mt-2">Last week analytics</p>
                        </div>
                        <div className="flex-1" />
                        <div className="text-green-500">
                            <IconUserPlus size={32} />
                        </div>
                    </div>

                    <div className="m-2 bg-white text-gray-700 rounded-lg p-5 shadow-lg  min-w-[250px] flex-1 flex">
                        <div>
                            <h2 className="text-lg">Paid Users</h2>
                            <div className="flex items-center mt-2">
                                <h3 className="text-2xl">4,567</h3>
                                <span className="text-green-500 ml-2">( + 18%)</span>
                            </div>
                            <p className="text-sm mt-2">Last week analytics</p>
                        </div>
                        <div className="flex-1" />
                        <div className="text-red-500">
                            <IconUserCheck size={32} />
                        </div>
                    </div>

                    <div className="m-2 bg-white text-gray-700 rounded-lg p-5 shadow-lg  min-w-[250px] flex-1 flex">
                        <div>
                            <h2 className="text-lg">Session</h2>
                            <div className="flex items-center mt-2">
                                <h3 className="text-2xl">21,459</h3>
                                <span className="text-green-500 ml-2">( + 29%)</span>
                            </div>
                            <p className="text-sm mt-2">Total Users</p>
                        </div>
                        <div className="flex-1" />
                        <div className="text-blue-500">
                            <IconUserCancel size={32} />
                        </div>
                    </div>
                </div>

                <Card >
                    <CardSection className="p-2">
                        <h6 className='font-bold text-neutral-700 tracking-wider'>User Management</h6>
                        <Divider />
                    </CardSection>

                    {ready ? <CustomTable
                   
                        attributes={['id', 'email', 'userRole','vorname','nachname','agreement_signed']}
                        remove
                        edit
                        data={data}
                       
                        newStruct={{
                            data: {
                                username: '',
                                email: '',
                                userRole: roles.map((role) => ({
                                    value: role.id,
                                    label: role.name
                                })),
                                password: '',
                            },
                            createMethod: createUser,
                            deleteMethod: deleteUser,
                            editMethod: editUser,
                        }}
                        refreshData={refreshData}
                    />
                        :
                        <div className="min-h-[300px] items-center flex justify-center">
                        <Loader color='brand' />
                        </div>
                }

                  

                </Card>
            </div>
        </PageProvider>
    )
}