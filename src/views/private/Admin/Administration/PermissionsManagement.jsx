import { Card, CardSection, Divider, Pagination, LoadingOverlay, Switch, Table, Button, Text, ThemeIcon, Title, Alert } from "@mantine/core"
import { useState, useEffect,useMemo } from 'preact/hooks'
import { IconEye, IconCircleX, IconCircleCheck, IconAlertCircle } from "@tabler/icons";

import PageProvider from "../../../../providers/PageProvider"
import CustomTable from "../../../../components/CustomTable"
import { createRole, deleteRole, editRole, getAccessList, getRoles } from "../../../../api";
import { permissible } from "../../../../signals";
import { openDrawer } from "../../../../providers/DrawerProvider";

export default () => {


    const [dataInfo, setDataInfo] = useState({ page: 0, count: 10 });
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [limit, setLimit] = useState(10);
    const [loading, setLoading] = useState(false)

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
        setLoading(true)
        getRoles().then((res) => {
            setData(res.data.roles.map((role) => {
                return {
                    ...role,
                    permissions: <Button leftIcon={<IconEye />} size="xs" radius={'xl'}
                        onClick={() => {
                            openDrawer({
                                title: 'Permissions',
                                children: <PermissionList id={role.id} name={role.name} description={role.description} />
                            })
                        }}
                    >View</Button>
                }
            }));
            setDataInfo({ page: 1, count: res.data.roles.length });
            setLoading(false)
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
                {!loading ?
                    <Card >

                        <CardSection className="p-2">
                            <h6 className='font-bold text-neutral-700 tracking-wider'>Roles and Permissions Management</h6>
                            <Divider />
                        </CardSection>

                        <CustomTable
                            attributes={['name', 'description', 'permissions']}

                            remove
                            edit
                            data={data}
                            setLimit={setLimit}
                            newStruct={{
                                data: {
                                    name: '',
                                    description: '',
                                    
                                },
                                createMethod: createRole,
                                deleteMethod: deleteRole,
                                editMethod: editRole,
                            }}
                            refreshData={refreshData}
                        >
                            
                                <Text>Permissions</Text>
                                <Divider />

                                <Table striped withBorder className="relative max-w-[100%]">
                                    <thead className="text-[10px]">

                                        <tr >
                                            {/* <td></td> */}
                                            <td className="font-semibold text-xs text-gray-700 text-start whitespace-nowrap overflow-hidden ">Component</td>
                                            <td className="text-gray-700 text-xs whitespace-nowrap text-start border-l-[1] border-neutral-200 border-solid overflow-hidden ">Read</td>
                                            <td className="text-gray-700 text-xs whitespace-nowrap text-start border-l-[1] border-neutral-200 border-solid overflow-hidden ">Write</td>
                                            <td className="text-gray-700 text-xs whitespace-nowrap text-start border-l-[1] border-neutral-200 border-solid overflow-hidden ">Delete</td>
                                        </tr>

                                    </thead>
                                    <tbody className="text-[10px]">
                                        {/* <tr>
                                        <td className="font-semibold text-xs text-gray-700 text-start whitespace-nowrap overflow-hidden ">
                                            Select All
                                            <ActionIcon
                                                onClick={() => {
                                                    const elements = document.getElementsByClassName('PermissionsManagement__table')
                                                    elements.forEach(element => {
                                                        element.checked = true
                                                    })
                                                }}
                                            >
                                                <IconCheck />
                                            </ActionIcon>
                                        </td>
                                    </tr> */}
                                        {
                                            Object.keys(permissible.value).map((key, index) => (
                                                <tr key={index} >
                                                    <td className="font-semibold text-xs text-gray-700 text-start whitespace-nowrap overflow-hidden ">{key}</td>
                                                    <td className="text-gray-700 text-xs whitespace-nowrap text-start border-l-[1] border-neutral-200 border-solid overflow-hidden ">
                                                        <Switch
                                                            type={'checkbox'}
                                                            color="blue"
                                                            name={key + '__read'}
                                                            defaultChecked={permissible.value[key].read}

                                                            data-group="permissions"
                                                            data-group-value={key + '__read'}
                                                        />
                                                    </td>
                                                    <td className="text-gray-700 text-xs whitespace-nowrap text-start border-l-[1] border-neutral-200 border-solid overflow-hidden ">
                                                        <Switch
                                                            defaultChecked={permissible.value[key].write}
                                                            color="green"
                                                            name={key + '__write'}
                                                            data-group="permissions"
                                                            data-group-value={key + '__write'}
                                                        />
                                                    </td>
                                                    <td className="text-gray-700 text-xs whitespace-nowrap text-start border-l-[1] border-neutral-200 border-solid overflow-hidden ">
                                                        <Switch
                                                            defaultChecked={permissible.value[key].delete}
                                                            color="red"
                                                            name={key + '__delete'}
                                                            radioGroup="delete"
                                                            data-group="permissions"
                                                            data-group-value={key + '__delete'}
                                                        />
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            
                        </CustomTable>

                        <div className="flex w-full px-6 py-8">
                            <p className="text-sm text-neutral-600">
                                Showing {page * limit - limit + 1} to {page * limit} of {dataInfo.count} entries
                            </p>
                            <div className="flex-1"></div>
                            <Pagination
                                color="brand"
                                total={Math.ceil(dataInfo.count / limit)}
                                limit={limit}
                                page={page}
                                onChange={(page) => setPage(page)}
                            />

                        </div>

                    </Card>
                    :
                    <LoadingOverlay visible />
                }
            </div>
        </PageProvider>
    )
}

const PermissionList = ({ id ,name, description }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    useEffect(() => {
        setLoading(true)
        getAccessList(id).then(({ data }) => {
            setData(data)
            setLoading(false)
        })
            .catch((err) => {
                
                setError(err.response.data.message || err.message || 'Something went wrong')
                setLoading(false)
            })


    }, [id])

    if (loading) return <LoadingOverlay visible />

    if (error) return <Alert color="red" icon={<IconAlertCircle />}>
            <Text color="red">{error}</Text>
        </Alert>

    const trueIcon = useMemo(() => <ThemeIcon color="teal" size={24} radius="xl">
        <IconCircleCheck size="1rem" />
    </ThemeIcon>, [])
    const falseIcon = useMemo(() => <ThemeIcon color="red" size={24} radius="xl">
        <IconCircleX size="1rem" />
    </ThemeIcon>, [])

    return (
<div>
   
    <Title size={18} className="text-neutral-700">{name}</Title>
    <Title size={12} className="text-neutral-500">{description}</Title>
    <Divider className="my-4" />
        <Table striped withBorder className="relative max-w-[100%]">
            <thead className="text-[10px]">
                <tr>
                    <th>Activity</th>
                    <th>Add</th>
                    <th>View</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody className="text-[10px]">
                {
                    data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.accessList.activity}</td>
                            <td>{item.accessList.add ? trueIcon : falseIcon}</td>
                            <td>{item.accessList.view ? trueIcon : falseIcon}</td>
                            <td>{item.accessList.edit ? trueIcon : falseIcon}</td>
                            <td>{item.accessList.delete ? trueIcon : falseIcon}</td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
        </div>
    )
}
