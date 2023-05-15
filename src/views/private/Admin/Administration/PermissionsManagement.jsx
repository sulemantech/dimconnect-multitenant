import PageProvider from "../../../../providers/PageProvider"
import CustomTable from "../../../../components/CustomTable"
import { Card, CardSection, Checkbox, Divider, Pagination, Table } from "@mantine/core"
import { createPermission, createRole, createUser, deletePermission, deleteRole, deleteUser, editPermission, editRole, editUser, getPermissions, getRoles, getUsers } from "../../../../api";
import {useState,useEffect} from 'preact/hooks'
import { permissible } from "../../../../providers/PermissionsProvider";
export default () => {


    const [dataInfo, setDataInfo] = useState({ page: 0, count: 0 });
    const [page, setPage] = useState(0);
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
      getRoles().then((res) => {
        setData(res.data.roles);
      })
        .catch((err) => {
          setData([]);
        })
    }
    const refreshData = () => {
      getData()
    //   getInfo()
    }
  
    useEffect(getData, [page,limit])
    // useLayoutEffect(getInfo, [])
    

    

    return (
        <PageProvider>
            <div className="">
                <Card >
                    <CardSection className="p-2">
                        <h6 className='font-bold text-neutral-700 tracking-wider'>Permissions Management</h6>
                        <Divider />
                    </CardSection>

                    <CustomTable
                        attributes={['name', 'description']}

                        remove
                        edit
                        data={data}
                        setLimit={setLimit}
                        newStruct={{
                            data: {
                                name : '',
                                description : ''
                            },
                            createMethod: createRole,
                            deleteMethod: deleteRole,
                            editMethod: editRole,
                        }}
                        refreshData={refreshData}
                    >
                        {
                            // table to head read write delete with mantine Table and Mantine checkbox
                            <Table striped withBorder className="relative max-w-[100%]">
                                <thead className="text-[10px]">
                                   
                                            <tr >
                                                <td className="font-semibold text-xs text-gray-700 text-start whitespace-nowrap overflow-hidden ">Component</td>
                                                <td className="text-gray-700 text-xs whitespace-nowrap text-start border-l-[1] border-neutral-200 border-solid overflow-hidden ">Read</td>
                                                <td className="text-gray-700 text-xs whitespace-nowrap text-start border-l-[1] border-neutral-200 border-solid overflow-hidden ">Write</td>
                                                <td className="text-gray-700 text-xs whitespace-nowrap text-start border-l-[1] border-neutral-200 border-solid overflow-hidden ">Delete</td>
                                            </tr>
                                        
                                </thead>
                                <tbody className="text-[10px]">
                                    {
                                        Object.keys(permissible.value).map((key, index) => (
                                            <tr key={index} >
                                                <td className="font-semibold text-xs text-gray-700 text-start whitespace-nowrap overflow-hidden ">{key}</td>
                                                <td className="text-gray-700 text-xs whitespace-nowrap text-start border-l-[1] border-neutral-200 border-solid overflow-hidden ">
                                                    <Checkbox
                                                        checked={permissible.value[key].allow}
                                                        onChange={(e) => {
                                                            permissible.value[key].allow = e.currentTarget.checked
                                                            permissible.emit()
                                                        }}
                                                    />
                                                </td>
                                                <td className="text-gray-700 text-xs whitespace-nowrap text-start border-l-[1] border-neutral-200 border-solid overflow-hidden ">
                                                    <Checkbox
                                                        checked={permissible.value[key].write}
                                                        onChange={(e) => {
                                                            permissible.value[key].write = e.currentTarget.checked
                                                            permissible.emit()
                                                        }}
                                                    />
                                                </td>
                                                <td className="text-gray-700 text-xs whitespace-nowrap text-start border-l-[1] border-neutral-200 border-solid overflow-hidden ">
                                                    <Checkbox
                                                        checked={permissible.value[key].delete}
                                                        onChange={(e) => {
                                                            permissible.value[key].delete = e.currentTarget.checked
                                                            permissible.emit()
                                                        }}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        }
                        </CustomTable>

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