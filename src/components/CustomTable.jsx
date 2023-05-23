import { ActionIcon, Button, Input, ScrollArea, Select, Switch } from "@mantine/core";
import { closeAllModals, openConfirmModal, openModal } from "@mantine/modals";
import { IconArrowDown, IconArrowUp, IconPaperclip, IconPlus } from "@tabler/icons";
import { useState } from "preact/hooks";
import readXlsxFile from 'read-excel-file';
import appConfig from '../config/appConfig'
import { FaEdit, FaTrash } from "react-icons/fa";
import { closeDrawer, openDrawer } from "../providers/DrawerProvider";
import { useCallback } from 'preact/hooks'
export default ({ children, data, setLimit, attributes = [], newStruct = {}, refreshData, edit = false, remove = false, attatchment = false }) => { // as {"id":25,"name":"HO1V","min":"25","max":"55"}[]

    const [sort, setSort] = useState({ field: "name", order: "asc" });
    const [filter, setFilter] = useState('')
    const [submitloading, setsubmitLoading] = useState(false)


    const handleSubmit = (e) => {
        setsubmitLoading(true)
        e.preventDefault()
        const creationform = e.target
        const formdata = new FormData(creationform)

        const values = {}

        // props : 
        //  data-main-key="permissions"
        // data-group-key={'activity'}                                    
        // data-group-key-value={key.activity}
        // data-group-value={'edit'}

        //Structure required :
        // permissions : {
        //    "permissions": [ # data-main-key
        // {
        //     "activity": "APV", # data-group-key
        //     "add": true, # data-group-value
        //     "view": true, # data-group-value
        //     "edit": false, # data-group-value
        //     "deleteFlag": false # data-group-value
        //   },
        //   {
        //     "activity": "Ticket",
        //     "add": false,
        //     "view": true,
        //     "edit": true,
        //     "deleteFlag": true
        //   }
        // ]

        for (let i = 0; i < creationform.length; i++) {

            // get group name if any
            if (creationform[i].getAttribute('data-main-key')) {

                values[creationform[i].getAttribute('data-main-key')] = {
                    ...values[creationform[i].getAttribute('data-main-key')],
                    [creationform[i].name]: formdata.get(creationform[i].name) == 'on' ? true : formdata.get(creationform[i].name)
                }

            } else {
                values[creationform[i].name] = formdata.get(creationform[i].name) == 'on' ? true : formdata.get(creationform[i].name)
            }
        }


        console.log(values)
        return
        newStruct.createMethod(values).then((res) => {
            setsubmitLoading(false)
            refreshData()
            closeDrawer()
        })
            .catch((err) => {

            })
    }

    const createNew = useCallback(
        () => {
            openDrawer({
                title: 'Create New',
                children: (
                    <form
                        onSubmit={handleSubmit}
                        id="creationform">
                        {
                            Object.keys(newStruct.data)?.map((item) => (

                                (Array.isArray(newStruct.data[item])) ?
                                    <div className="flex flex-col">
                                        <label className="text-sm text-gray-600">{item.replace('_', ' ').trim().toUpperCase()}</label>
                                        {/* <select required className="bg-gray-200 rounded-md p-1" name={item}>
                                            {
                                                newStruct?.data[item]?.map((option) => {
                                                    return (
                                                        <option value={option}>{option}</option>
                                                    )
                                                })
                                            }
                                        </select> */}
                                        <Select data={newStruct?.data[item]} required className="bg-gray-200 rounded-md p-1" name={item} />
                                    </div>
                                    :
                                    typeof newStruct.data[item] === 'boolean' ?
                                        <>

                                            <div className="flex">
                                                <label className="text-sm text-gray-600 flex-1">{item.replace('_', ' ').trim().toUpperCase()}</label>
                                                <Switch required className=" rounded-md p-1 flex-1" name={item} />
                                            </div>
                                        </>
                                        :
                                        <div className="flex flex-col">
                                            <label className="text-sm text-gray-600">{item.replace('_', ' ').trim().toUpperCase()}</label>
                                            <Input required type="text" className="bg-gray-200 rounded-md p-1" name={item} />
                                        </div>

                            ))
                        }
                        <div className="py-3">
                            {children}
                        </div>
                        <div className="flex justify-end">
                            <Button
                                loading={submitloading}
                                type={'submit'}>
                                Create
                            </Button>
                        </div>
                    </form>
                )
            })
        },
        [children],
    )




    return (
        <div className="flex flex-col rounded-md bg-white">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <div className="flex p-2 text-neutral-700 text-xs items-center">
                            <div>
                                Show <select className="bg-gray-200 rounded-md p-1" onChange={e => setLimit(e.target.value)}>
                                    <option>10</option>
                                    <option>25</option>
                                    <option>50</option>
                                    <option>100</option>
                                </select> entries

                            </div>

                            <div className="flex-1"></div>

                            <div className="flex">
                                <input type="text" className="bg-gray-200 rounded-md p-1" placeholder="Search" onChange={e => setFilter(e.target.value)} />
                                {newStruct.hasOwnProperty('createMethod') && <Button
                                    leftIcon={<IconPlus size={15} />}
                                    onClick={createNew}
                                >
                                    Add New
                                </Button>}
                            </div>

                        </div>

                        <table className="min-w-full divide-y divide-gray-200 px-2">

                            <thead className="bg-gray-200">
                                <tr>
                                    {
                                        attributes?.map((item) => {
                                            return (
                                                <th scope="col" key={item} className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                                    <p class={`flex items-center`}>
                                                        {item.replace('_', ' ').toUpperCase()}
                                                        <ActionIcon className="text-gray-900"
                                                            size="xs"
                                                            variant="white"
                                                            onClick={() => setSort({ field: item, order: sort.order === "asc" ? "desc" : "asc" })}
                                                        >{sort.field === item && sort.order === "asc" ? <IconArrowDown className="text-red-900" size={15} /> : <IconArrowUp className="text-gray-600" size={15} />}
                                                        </ActionIcon>
                                                    </p>
                                                </th>
                                            )
                                        })
                                    }
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 ">
                                {data
                                    .sort((a, b) => {
                                        if (sort.order === "asc") {
                                            if (a[sort.field] < b[sort.field]) {
                                                return -1;
                                            }
                                            if (a[sort.field] > b[sort.field]) {
                                                return 1;
                                            }
                                            return 0;
                                        } else {
                                            if (a[sort.field] > b[sort.field]) {
                                                return -1;
                                            }
                                            if (a[sort.field] < b[sort.field]) {
                                                return 1;
                                            }
                                            return 0;
                                        }
                                    })?.filter((obj) => {
                                        if (filter === '') return data;
                                        return Object.values(obj).some(val => val.toString().toLowerCase().includes(filter.toLowerCase()))
                                    })?.map((item) => (
                                        <tr key={item.id} >
                                            {
                                                attributes?.map((attr) => {
                                                    return (
                                                        <td key={attr + 'hgrui'} className="px-6 text-left py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {item[attr]}
                                                        </td>
                                                    )
                                                }
                                                )
                                            }
                                            <td className="flex justify-end px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                {edit && <ActionIcon

                                                    onClick={() => {
                                                        openDrawer({
                                                            title: 'Edit',
                                                            children: <EditForm item={item} newStruct={newStruct} >{children}</EditForm>,
                                                        })
                                                    }}
                                                ><FaEdit /></ActionIcon>}
                                                {attatchment && <ActionIcon
                                                    onClick={() => {
                                                        openDrawer({
                                                            title: 'Attatchment',
                                                            children: <AttatchmentForm item={item} newStruct={newStruct} />,
                                                        })
                                                    }}

                                                ><IconPaperclip /></ActionIcon>}
                                                {remove && <ActionIcon
                                                    color="red"
                                                    onClick={() => openConfirmModal({
                                                        title: 'Are You Sure?',
                                                        children: <div>This action cannot be undone</div>,
                                                        labels: { confirm: 'Delete', cancel: 'Cancel' },
                                                        cancelProps: { variant: 'default' },
                                                        onConfirm: () => newStruct.deleteMethod(item.id).then(res => refreshData())
                                                    })}
                                                ><FaTrash /></ActionIcon>}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>

        </div>
    )
}

const EditForm = ({ item, newStruct, children }) => {
    const [form, setForm] = useState(item);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const update = () => {
        setLoading(true);
        newStruct.updateMethod(form).then(res => {
            setLoading(false);
            if (res.status === 200) {
                openModal({
                    title: 'Success',
                    description: 'Data updated successfully',
                    labels: { confirm: 'Ok' },
                    onConfirm: () => {
                        closeAllModals()
                        refreshData();
                    }
                })
            } else {
                openModal({
                    title: 'Error',
                    description: 'Something went wrong',
                    labels: { confirm: 'Ok' },
                    onConfirm: () => {
                        closeAllModals();
                    }
                })
            }
        })
    }
    try {
        return (
            <div className="flex flex-col">
                {
                    Object.keys(newStruct.data)?.map((attr) => {
                        return (
                            <div key={attr} className="flex flex-col mb-4">
                                <label className="text-gray-700">{attr.replace('_', ' ').toUpperCase()}</label>
                                <input
                                    className="bg-gray-200 rounded-md p-2"
                                    value={form[attr]}
                                    onChange={(e) => setForm({ ...form, [attr]: e.target.value })}
                                />
                            </div>
                        )
                    })

                }
                <div className="my-4">
                    {children}
                </div>
                <div className="flex">
                    <Button
                        onClick={update}
                    >
                        Update
                    </Button>
                    <Button
                        onClick={() => closeDrawer()}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        )
    } catch (error) {
        return (
            <div>
                <h1>Something went wrong</h1>
            </div>
        )
    }
}

const AttatchmentForm = ({ item, newStruct }) => {
    const routeId = item.id;
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const upload = () => {

        const geocode = (address) => {

            address = address.replace(' ', '+');
            address = address.replace(',', '+');
            address = address.replace('.', '+');
            address = address.replace('(', '+');
            address = address.replace(')', '+');
            address = address.replace('++', '+');
            address = address.replace('#', '+');
            address = address.replace('?', '+');

            return new Promise((resolve, reject) => {
                const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=" + appConfig.mapboxToken
                fetch(url)
                    .then(res => res.json())
                    .then(res => {
                        if (res.features.length > 0) {
                            const feature = res.features[0];
                            resolve({
                                address: feature.place_name,
                                city: feature.context[1].text,
                                postal_code: feature.context[0].text,
                                complete_address: address,
                                type: feature.place_type[0],
                                lat: feature.center[1],
                                lng: feature.center[0],
                                route_id: routeId
                            })
                        } else {
                            reject('No results found')
                        }
                    })
                    .catch(err => reject(err))
            })
        }

        setLoading(true);
        const promises = data?.map(row => {
            return geocode(row.addr1 + ' ' + row.city + ' ' + row.postcode)
        })
        Promise.all(promises).then(res => {
            setLoading(false);
            newStruct.attatchmentMethod(res).then(res => {
                setLoading(false);
                closeAllModals();
            })
                .catch(err => {
                    setLoading(false);
                    setError(err);
                })
        }).catch(err => {
            setLoading(false);
            setError(err);
        })
    }

    const readCSV = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            if (file.type == 'text/csv') {
                const text = (e.target.result);
                const data = text.split('\n').slice(1)?.map(row => {
                    const lastComma = row.lastIndexOf(',');
                    const sencondLastComma = row.lastIndexOf(',', lastComma - 1);
                    const addr1 = row.substring(0, sencondLastComma);
                    const city = row.substring(sencondLastComma + 1, lastComma);
                    const postcode = row.substring(lastComma + 1);
                    return { addr1, city, postcode };
                });
                setData(data);
                // if xlsx or xls
            } else if (file.type == 'application/vnd.ms-excel' || file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                readXlsxFile(file).then((rows) => {
                    const data = rows.slice(1)?.map(row => {
                        const addr1 = row[0];
                        const city = row[1];
                        const postcode = row[2];
                        return { addr1, city, postcode };
                    });
                    setData(data);
                })
            }

        };
        reader.readAsText(file);
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-col mb-4">
                <label className="text-gray-700">Upload CSV</label>
                <input
                    type="file"
                    className="bg-gray-200 rounded-md p-2"
                    onChange={readCSV}
                />
            </div>
            <div className="flex flex-col mb-4">
                <label className="text-gray-700">Preview</label>
                <table className="table-auto">
                    <thead>
                        <tr className="text-xs font-bold">
                            <th className="px-4 py-2">ADDR1</th>
                            <th className="px-4 py-2">CITY</th>
                            <th className="px-4 py-2">POSTCODE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.slice(0, 5)?.map((row, i) => (
                            <tr key={i} className='text-xs'>
                                <td className="border px-4 py-2">{row.addr1}</td>
                                <td className="border px-4 py-2">{row.city}</td>
                                <td className="border px-4 py-2">{row.postcode}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex">
                <Button
                    loading={loading}
                    onClick={upload}
                >
                    Upload
                </Button>
                <Button
                    loading={loading}
                    onClick={() => closeAllModals()}
                >
                    Cancel
                </Button>
            </div>
        </div>
    )
}