import PageProvider from "../../../../providers/PageProvider"
import CustomTable from "../../../../components/CustomTable"
import { Card, CardSection, Divider, Pagination } from "@mantine/core"
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
    const PermissionContent =  Object.keys(permissible.value).map((key) => {
        return {
            [key] : false
        }
    }).reduce((a,b) => {
        return {...a,...b}
    },{})

    

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
                                description : '',
                                ...PermissionContent
                            },
                            createMethod: createRole,
                            deleteMethod: deleteRole,
                            editMethod: editRole,
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