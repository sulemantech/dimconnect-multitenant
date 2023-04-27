import PageProvider from "../../../../providers/PageProvider"
import CustomTable from "../../../../components/CustomTable"
import { Card, CardSection, Divider, Pagination } from "@mantine/core"
import { createUser, deletePermission, deleteUser, editPermission, editUser, getPermissions, getUsers } from "../../../../api";
import {useState,useEffect} from 'preact/hooks'
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
      getPermissions().then((res) => {
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
  
    useEffect(getData, [page,limit])
    // useLayoutEffect(getInfo, [])

    return (
        <PageProvider>
            <div className="h-screen">
                <Card >
                    <CardSection className="p-2">
                        <h6 className='font-bold text-neutral-700 tracking-wider'>Permissions Management</h6>
                        <Divider />
                    </CardSection>

                    <CustomTable
                        attributes={['id', 'title', 'permissions']}

                        remove

                        data={data}
                        setLimit={setLimit}
                        newStruct={{
                            data: {
                                id: '',
                                title: '',
                                permissions: '',
                            },
                            // createMethod: createUser,
                            deleteMethod: deletePermission,
                            editMethod: editPermission,
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