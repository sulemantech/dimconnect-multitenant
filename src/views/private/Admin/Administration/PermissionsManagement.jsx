import { Card, CardSection, Divider, Pagination, LoadingOverlay, Switch, Table, Button, Text, ThemeIcon, Title, Alert } from "@mantine/core"
import { useState, useEffect, useMemo } from 'preact/hooks'
import { IconEye, IconCircleX, IconCircleCheck, IconAlertCircle } from "@tabler/icons";

import PageProvider from "../../../../providers/PageProvider"
import CustomTable from "../../../../components/CustomTable"
import { createRole, deleteRole, editRole, getAccessList, getRoles } from "../../../../api";
import { permissible } from "../../../../signals";
import { openDrawer } from "../../../../providers/DrawerProvider";

export default () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)

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

            setLoading(false)
        })
            .catch((err) => {
                setData([]);
            })
    }
    const refreshData = () => {
        getData()
    }

    useEffect(getData, [])


    return (
        <PageProvider>
            <div className="">

                <Card >

                    <CardSection className="p-2">
                        <h6 className='font-bold text-neutral-700 tracking-wider'>Roles and Permissions Management</h6>
                        <Divider />
                    </CardSection>
                    {!loading ?
                        <CustomTable
                            attributes={['name', 'description', 'permissions']}

                            remove
                            edit
                            data={data}

                            newStruct={{
                                data: {
                                    name: '',
                                    description: '',

                                },
                                createMethod: createRole,
                                deleteMethod: deleteRole,
                                editMethod: editRole,
                                getMethod: getAccessList,
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
                                        <td className="text-gray-700 text-xs whitespace-nowrap text-start border-l-[1] border-neutral-200 border-solid overflow-hidden ">ADD</td>
                                        <td className="text-gray-700 text-xs whitespace-nowrap text-start border-l-[1] border-neutral-200 border-solid overflow-hidden ">VIEW</td>
                                        <td className="text-gray-700 text-xs whitespace-nowrap text-start border-l-[1] border-neutral-200 border-solid overflow-hidden ">EDIT</td>
                                        <td className="text-gray-700 text-xs whitespace-nowrap text-start border-l-[1] border-neutral-200 border-solid overflow-hidden ">Delete</td>
                                    </tr>

                                </thead>
                                <tbody className="text-[10px]">

                                    {
                                        permissible.value.map((key, index) => (
                                            <tr key={index} >
                                                <td className="font-semibold text-xs text-gray-700 text-start whitespace-nowrap overflow-hidden ">{key.activity}</td>
                                                <td className="text-gray-700 text-xs whitespace-nowrap text-start border-l-[1] border-neutral-200 border-solid overflow-hidden ">
                                                    <Switch
                                                        type={'checkbox'}
                                                        color="blue"
                                                        name={key + '__add'}
                                                        defaultChecked={key.add}

                                                        data-main-key="permissions"
                                                        data-group-key={'activity'}

                                                        data-group-key-value={key.activity}
                                                        data-group-value={'add'}
                                                    />
                                                </td>
                                                <td className="text-gray-700 text-xs whitespace-nowrap text-start border-l-[1] border-neutral-200 border-solid overflow-hidden ">
                                                    <Switch
                                                        type={'checkbox'}
                                                        color="yellow"
                                                        name={key + '__view'}
                                                        defaultChecked={key.view}

                                                        data-main-key="permissions"
                                                        data-group-key={'activity'}

                                                        data-group-key-value={key.activity}
                                                        data-group-value={'view'}
                                                    />
                                                </td>
                                                <td className="text-gray-700 text-xs whitespace-nowrap text-start border-l-[1] border-neutral-200 border-solid overflow-hidden ">
                                                    <Switch
                                                        defaultChecked={key.edit}
                                                        color="green"
                                                        name={key + '__edit'}

                                                        data-main-key="permissions"
                                                        data-group-key={'activity'}

                                                        data-group-key-value={key.activity}
                                                        data-group-value={'edit'}
                                                    />
                                                </td>
                                                <td className="text-gray-700 text-xs whitespace-nowrap text-start border-l-[1] border-neutral-200 border-solid overflow-hidden ">
                                                    <Switch
                                                        defaultChecked={key.delete}
                                                        color="red"
                                                        name={key + '__delete'}

                                                        data-main-key="permissions"
                                                        data-group-key={'activity'}

                                                        data-group-key-value={key.activity}
                                                        data-group-value={'deleteFlag'}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>

                        </CustomTable>


                        :
                        <LoadingOverlay visible />

                    }
                </Card>
            </div>
        </PageProvider>
    )
}

const PermissionList = ({ id, name, description }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    useEffect(() => {
        setLoading(true)
        getAccessList(id).then(({ data }) => {
            setData(data.accessList)
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
                                <td>{item.activity}</td>
                                <td>{item.add ? trueIcon : falseIcon}</td>
                                <td>{item.view ? trueIcon : falseIcon}</td>
                                <td>{item.edit ? trueIcon : falseIcon}</td>
                                <td>{item.delete ? trueIcon : falseIcon}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
}
