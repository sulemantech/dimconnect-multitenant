import PageProvider from "../../../../providers/PageProvider"
import CustomTable from "../../../../components/CustomTable"
import { Card, CardSection, Divider, Pagination } from "@mantine/core"
import { createUser, deleteUser, editUser, getUsers } from "../../../../api";
import { useState, useEffect } from 'preact/hooks'
import { IconUser, IconUserCheck, IconUserPlus } from "@tabler/icons";
import { IconUserCancel } from "@tabler/icons-react";
export default () => {


    const [dataInfo, setDataInfo] = useState({ page: 0, count: 0 });
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [limit, setLimit] = useState(10);


    // const getInfo = () => {
    //   getUsersInfo()
    //     .then((res) => {
    //       setDataInfo({ page: res.data.page, count: res.data.count });
    //     })
    //     .catch((err) => {
    //       setDataInfo({ page: 0, count: 0 });
    //     })
    // }
    const getData = () => {
        getUsers(page - 1, JSON.stringify([['id', 'ASC']]), limit).then((res) => {
            setData(res.data.users);
        })
            .catch((err) => {
                setData([]);
            })
    }
    const refreshData = () => {
        getData()
        //   getInfo()
    }

    useEffect(getData, [page, limit])
    // useLayoutEffect(getInfo, [])

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
                        <div className="flex-1"/>
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
                        <div className="flex-1"/>
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
                        <div className="flex-1"/>
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
                        <div className="flex-1"/>
                        <div className="text-blue-500">
                            <IconUserCancel size={32} />
                        </div>
                    </div>
                </div>

                <Card className="min-h-screen">
                    <CardSection className="p-2">
                        <h6 className='font-bold text-neutral-700 tracking-wider'>User Management</h6>
                        <Divider />
                    </CardSection>

                    <CustomTable
                        attributes={['username', 'email', 'userRole']}

                        remove

                        data={data}
                        setLimit={setLimit}
                        newStruct={{
                            data: {
                                username: '',
                                email: '',
                                userRole: '',
                                password: '',
                            },
                            createMethod: createUser,
                            deleteMethod: deleteUser,
                            editMethod: editUser,
                        }}
                        refreshData={refreshData}
                    />

                    <div className="flex w-full px-6 py-8">
                        <p className="text-sm text-neutral-600">
                            Showing {page * limit - limit + 1} to {page * limit} of {dataInfo.count} entries
                        </p>
                        <div className="flex-1"></div>
                        <Pagination
                            color={'dark'}
                            total={Math.ceil(dataInfo.count / limit)}
                            limit={limit}
                            page={page}
                            onChange={(page) => setPage(page)}
                        />

                    </div>

                </Card>
            </div>
        </PageProvider>
    )
}