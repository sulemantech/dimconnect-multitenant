import PageProvider from "../../../../providers/PageProvider"
import CustomTable from "../../../../components/CustomTable"
import { ActionIcon, Alert, Badge, Button, Card, CardSection, Chip, Divider, Loader, MANTINE_COLORS, MultiSelect, Pagination, Select, Text, Title } from "@mantine/core"
import { assignRolesToUser, createUser, deleteUser, editUser, getRoles, getUsers, getUserById } from "../../../../api";
import { useState, useLayoutEffect } from 'preact/hooks'
import { IconUser, IconUserCheck, IconUserPlus } from "@tabler/icons";
import { IconUserCancel } from "@tabler/icons-react";
import { useEffect } from "preact/hooks";
import { closeDrawer, openDrawer } from "../../../../providers/DrawerProvider";
import PermissionWrapper from "../../../../providers/PermissionsProvider";
import { PERMISSIONS } from "../../../../common";
import { useTranslation } from "react-i18next"

export default () => {


    const {t}=useTranslation()

    const [data, setData] = useState([]);

    const [roles, setRoles] = useState([]);
    const [ready, setReady] = useState(false)


    const getData = async () => {
        try {
            const rolesx = await getRoles().catch(e => setRoles([]));
            setRoles(rolesx.data.roles)


            const users = await getUsers().catch(e => setData([]))


            getUserById.assignData(users.data)
            setData(users.data.map(user => ({
                ...user,
                'Assign Role': <Chip checked={false}
                    color="blue"

                    variant="light"
                    onClick={() => {
                        openDrawer({
                            'title': 'Assign Role',
                            'children': <AssignRole user={user} roles={rolesx.data.roles} refreshData={refreshData} />
                        })
                    }}
                >
                    <Text mt={2} color="brand" className="flex tracking-wide font-semibold text-xs items-center justify-center"> <IconUserPlus className="mr-2" size={20} /> Assign Role</Text>
                </Chip>,
            })))


        } catch (err) { }

        setReady(true)
    }
    const refreshData = () => {
        getData()
    }

    useLayoutEffect(() => {
        getData()
    }, [])


    return (
        <PermissionWrapper permission={PERMISSIONS["User Management"]} view message>
            <PageProvider>
                <div className="">

                    <div className="flex flex-wrap justify-center">
                        <div className="m-2 bg-white text-gray-700 rounded-lg p-5 shadow-lg min-w-[250px] flex-1 flex">
                            <div>
                                <h2 className="text-lg">{t('Pending Users')}</h2>
                                <div className="flex items-center mt-2">
                                    <h3 className="text-2xl">237</h3>
                                    <span className="text-green-500 ml-2">( + 42%)</span>
                                </div>
                                <p className="text-sm mt-2">{t('Last week analytics')}</p>
                            </div>
                            <div className="flex-1" />
                            <div className="text-yellow-500">
                                <IconUser size={32} />
                            </div>
                        </div>

                        <div className="m-2 bg-white text-gray-700 rounded-lg p-5 shadow-lg  min-w-[250px] flex-1 flex">
                            <div>
                                <h2 className="text-lg">{t('Active Users')}</h2>
                                <div className="flex items-center mt-2">
                                    <h3 className="text-2xl">19,860</h3>
                                    <span className="text-red-500 ml-2">( - 14%)</span>
                                </div>
                                <p className="text-sm mt-2">{t('Last week analytics')}</p>
                            </div>
                            <div className="flex-1" />
                            <div className="text-green-500">
                                <IconUserPlus size={32} />
                            </div>
                        </div>

                        <div className="m-2 bg-white text-gray-700 rounded-lg p-5 shadow-lg  min-w-[250px] flex-1 flex">
                            <div>
                                <h2 className="text-lg">{t('Paid Users')}</h2>
                                <div className="flex items-center mt-2">
                                    <h3 className="text-2xl">4,567</h3>
                                    <span className="text-green-500 ml-2">( + 18%)</span>
                                </div>
                                <p className="text-sm mt-2">{t('Last week analytics')}</p>
                            </div>
                            <div className="flex-1" />
                            <div className="text-red-500">
                                <IconUserCheck size={32} />
                            </div>
                        </div>

                        <div className="m-2 bg-white text-gray-700 rounded-lg p-5 shadow-lg  min-w-[250px] flex-1 flex">
                            <div>
                                <h2 className="text-lg">{t('Session')}</h2>
                                <div className="flex items-center mt-2">
                                    <h3 className="text-2xl">21,459</h3>
                                    <span className="text-green-500 ml-2">( + 29%)</span>
                                </div>
                                <p className="text-sm mt-2">{t('Total Users')}</p>
                            </div>
                            <div className="flex-1" />
                            <div className="text-blue-500">
                                <IconUserCancel size={32} />
                            </div>
                        </div>
                    </div>

                    <div >


                        {ready ? <CustomTable
                            title={t("Users Management")}
                            attributes={['id', 'email', 'userRole', 'vorname', 'nachname', 'agreement_signed', 'roles', 'Assign Role']}
                            remove
                            edit
                            data={data}

                            newStruct={{
                                data: {
                                    vorname: '',
                                    nachname: '',
                                    email: '',
                                    password: '',
                                    agreement_signed: false,
                                },
                                createMethod: createUser,
                                deleteMethod: deleteUser,
                                editMethod: editUser,
                                getMethod: getUserById.findUserById,
                            }}
                            refreshData={refreshData}
                        >
                            <RoleSelectOnCreate roles={roles} />
                        </CustomTable>
                            :
                            <div className="min-h-[300px] items-center flex justify-center">
                                <Loader color='brand' />
                            </div>
                        }



                    </div>
                </div>
            </PageProvider>
        </PermissionWrapper>
    )
}


const AssignRole = ({ user, roles, refreshData }) => {

    const { t } = useTranslation()

    const [selectedRole, setSelectedRole] = useState(user.userRole)
    const [ready, setReady] = useState(false)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const assignRole = async () => {
        const temp = {}
        selectedRole.forEach((role) => {
            temp[role] = roles.find((r) => r.id === role).name
        })

        setLoading(true)
        try {
            const res = await assignRolesToUser(user.id, temp)
            setSuccess(true)
            setMessage(res.message)
            refreshData()
            closeDrawer()
        } catch (err) {
            setError(true)
            setMessage(err.message)
        }
        setLoading(false)
    }
    useEffect(() => {
        setReady(true)
    }
        , [])
    return (
        <PermissionWrapper permission={PERMISSIONS["User Management"]} add>
            <div className="flex flex-col">
                <div className="flex flex-col">

                    {/* user details */}

                    <div>
                        <div className="flex flex-col m-auto">
                            <p className="flex justify-between items-center h-10">
                                <Text className="text-sm">{t('User ID')}</Text>
                                <Text color="brand" className="mt-1">{user.id}</Text>

                            </p><Divider /><p className="flex justify-between items-center h-10">
                                <Text className="text-sm">{t('Email')}</Text>
                                <Text color="brand" className="mt-1">{user.email}</Text>
                            </p><Divider /><p className="flex justify-between items-center h-10">
                                <Text className="text-sm">{t('Name')}</Text>
                                <Text color="brand" className="mt-1">{user.vorname} {user.nachname}</Text>
                            </p><Divider /><p className="flex justify-between items-center h-10">
                                <Text className="text-sm">{t('Existing Role')}</Text>
                                <Text color="brand" className="mt-1">{user.userRole?.join(', ')}</Text>
                            </p><Divider />
                        </div>
                    </div>

                    <Title size={'sm'} mt={20}>{t("Select Role")}</Title>

                    <MultiSelect
                        className="mt-1"
                        data={roles?.map((role, index) => ({
                            value: role.id,
                            label: <Badge color={MANTINE_COLORS[index]}>{role.name}</Badge>,
                        }))}

                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e)}
                    />
                </div>
                <div className="flex flex-col mt-2">
                    <Button
                        onClick={assignRole}
                        loading={loading}
                        disabled={loading}
                        className="mt-2"
                        variant="default"
                    >
                        Assign Role
                    </Button>
                </div>
                {error && <div className="mt-2">
                    <Alert severity="error">{message}</Alert>
                </div>}
                {success && <div className="mt-2">
                    <Alert severity="success">{message}</Alert>
                </div>}
            </div>
        </PermissionWrapper>
    )
}


const RoleSelectOnCreate = ({ roles }) => {
    const [selectedRole, setSelectedRole] = useState([])
    const temp = {}
    selectedRole.forEach((role) => {
        temp[role] = roles.find((r) => r.id === role).name
    })
    return (
        <>
            <Title size={'sm'} mt={20}>{t('Select Role')}</Title>
            <input type="hidden" name="roles" value={JSON.stringify(temp)} />
            <MultiSelect
                className="mt-1"

                data={roles?.map((role, index) => ({
                    value: role.id,
                    label: <Badge color={MANTINE_COLORS[index]}>{role.name}</Badge>,
                }))}
                value={selectedRole}
                onChange={(e) => setSelectedRole(e)}

            />
        </>
    )
}


