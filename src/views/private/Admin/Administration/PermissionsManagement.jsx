import { Card, CardSection, Divider, Pagination, LoadingOverlay, Switch, Table, Button, Text, ThemeIcon, Title, Alert } from "@mantine/core"
import { useState, useEffect, useMemo } from 'preact/hooks'
import { IconEye, IconCircleX, IconCircleCheck, IconAlertCircle, IconEdit } from "@tabler/icons";

import PageProvider from "../../../../providers/PageProvider"
import CustomTable from "../../../../components/CustomTable"
import { createRole, createRoleWithPermissions, deleteRole, editRole, getAccessList, getRoles, updateRoleWithPermissions } from "../../../../api";
import { permissible } from "../../../../signals";
import { closeDrawer, openDrawer } from "../../../../providers/DrawerProvider";
import PermissionWrapper from "../../../../providers/PermissionsProvider";
import { PERMISSIONS } from "../../../../common";

export default () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)

    const getData = () => {
        setLoading(true)
        getRoles().then((res) => {
            setData(res.data.roles.map((role) => {
                return {
                    ...role,
                    permissions: <><Button leftIcon={<IconEye />} size="xs" radius={'xl'}
                        onClick={() => {
                            openDrawer({
                                title: 'Permissions',
                                children: <PermissionList id={role.id} name={role.name} description={role.description} />
                            })
                        }}
                    >View</Button>
                        <Button leftIcon={<IconEdit />} ml={5} size="xs" radius={'xl'}
                            onClick={() => {
                                openDrawer({
                                    title: 'Edit Permissions',
                                    children: <PermissionList editMode id={role.id} name={role.name} description={role.description} />
                                })
                            }}
                        >Edit</Button>

                    </>
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
        <PermissionWrapper permission={PERMISSIONS["Roles Management"]} view message>
            <PageProvider>
                <div className="">

                    <div >



                        {!loading ?
                            <CustomTable
                                attributes={['id', 'name', 'description', 'permissions']}
                                title={'Roles and Permissions'}
                                remove

                                data={data}

                                newStruct={{
                                    data: {
                                        name: '',
                                        description: '',

                                    },
                                    createMethod: createRoleWithPermissions,
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
                                                            name={key.activity + '__add'}
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
                                                            name={key.activity + '__view'}
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
                                                            name={key.activity + '__edit'}

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
                                                            name={key.activity + '__delete'}

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
                    </div>
                </div>
            </PageProvider>
        </PermissionWrapper>
    )
}

const PermissionList = ({ id, name, description, editMode = false }) => {
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

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        const permissions = []
        Object.keys(data).forEach((key) => {
            const [activity, action] = key.split('__')
            const index = permissions.findIndex((item) => item.activity === activity)
            if (index === -1) {
                permissions.push({
                    activity,
                    [action]: data[key] === 'on'
                })
            } else {
                permissions[index][action] = data[key] === 'on'
            }
        })
        updateRoleWithPermissions(id, { permissions }).then(({ data }) => {
            closeDrawer()
            setLoading(false)
        }).catch((err) => {
            setError(err.response.data.message || err.message || 'Something went wrong')
            setLoading(false)
        })

    }

    if (loading) return <LoadingOverlay visible />

    if (error && !editMode) return <Alert color="red" icon={<IconAlertCircle />}>
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
            {
                (editMode && error) && <Alert color="red" icon={<IconAlertCircle />}>
                <Text color="red">{error}</Text>
            </Alert>
            }
            <form onSubmit={handleSubmit}>

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
                            (editMode ? [...permissible.value.map((item) => ({ ...item, add: false, view: false, edit: false, delete: false }))
                                .filter((item) => !data.find((i) => i.activity === item.activity))
                                , ...data]
                                 : data).map((item, index) => (
                                <tr key={index}>
                                    {
                                        editMode ?
                                            <>
                                                <td>{item.activity}</td>
                                                
                                                <td >
                                                    <Switch type="checkbox" color="blue" name={`${item.activity}__add`} defaultChecked={item.add} />
                                                    
                                                </td>
                                                <td >
                                                    <Switch type="checkbox" color="yellow" name={`${item.activity}__view`} defaultChecked={item.view} />
                                                   
                                                </td>
                                                <td >
                                                    <Switch type="checkbox" color="green" name={`${item.activity}__edit`} defaultChecked={item.edit} />
                                                    
                                                </td>
                                                <td >
                                                    <Switch type="checkbox" color="red" name={`${item.activity}__deleteFlag`} defaultChecked={item.deleteFlag} />
                                                   
                                                </td>
                                            </>
                                            :
                                            <>
                                                <td>{item.activity}</td>
                                                <td>{item.add ? trueIcon : falseIcon}</td>
                                                <td>{item.view ? trueIcon : falseIcon}</td>
                                                <td>{item.edit ? trueIcon : falseIcon}</td>
                                                <td>{item.delete ? trueIcon : falseIcon}</td>
                                            </>
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                {editMode && <div className="flex">
                    <div className="flex-1"></div>
                    <Button type="submit" mt={15}>Save</Button>
                </div>}
            </form>
        </div>
    )
}

