import { Menu } from "@mantine/core"

import { IconStack2 } from "@tabler/icons"
import { useEffect, useState } from "preact/hooks"
import { visibility } from "./DataTiles"
import { dropvalue } from "../../../../layout/Header"
import { photoVisibility } from "./Photos"
import { closeAllModals, openModal } from "@mantine/modals"
import { videoVisibility } from "./Gpx"

export default ({ modal = false }) => {
    const [data, setData] = useState({})
    useEffect(() => {
        setData(JSON.parse(visibility.value) || {})
    }, [visibility.value])

    if (modal) {
        return (
            <div id='overlaycontrol' className="hover:scale-95 items-center justify-center flex border-white border-solid border-2 transition-all cursor-pointer mb-2 h-16 aspect-square w-16 z-70 p-3 rounded-full shadow-lg text-[#0071b9] bg-white "
                onClick={() => {
                    openModal({
                        title: 'Overlay Control',
                        children: (
                            <div className="flex flex-col gap-2">
                                {
                                    Object.keys(data).map((key, index) => {
                                        return (
                                            <div className="flex gap-2 items-center" key={index} onClick={() => {
                                                closeAllModals()
                                                let temp = data
                                                temp[key] = {
                                                    ...temp[key],
                                                    visible: !temp[key].visible
                                                }
                                                visibility.value = JSON.stringify(temp)
                                                
                                            }}>
                                                {
                                                    data[key].visible ? <span className="text-green-500">✔</span> : <span className="text-red-500">✖</span>
                                                }
                                                {key
                                                    .replace(dropvalue.value, '')
                                                    .replace('_OUT_', '')
                                                    .split('_')
                                                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                                    .join(' ')
                                                }
                                            </div>
                                        )
                                    })
                                }
                                <hr className={'my-2'} />
                                <div className="flex gap-2 items-center" onClick={() => {
                                    closeAllModals()
                                    photoVisibility.value = !photoVisibility.value
                                }
                                }>
                                    {
                                        photoVisibility.value ? <span className="text-green-500">✔</span> : <span className="text-red-500">✖</span>
                                    }
                                    Photos
                                </div>
                                <div className="flex gap-2 items-center" onClick={() => {
                                    closeAllModals()
                                    videoVisibility.value = !videoVisibility.value
                                }
                                }>
                                    {
                                        videoVisibility.value ? <span className="text-green-500">✔</span> : <span className="text-red-500">✖</span>
                                    
                                    }
                                    Videos
                                </div>
                            </div>
                        )
                    })

                }}
            >
                <IconStack2 size={30} />
            </div>
        )

    }

    return (

        <Menu position="left-end" withArrow>
            <Menu.Target>
                <div id='overlaycontrol' className="hover:scale-95 items-center justify-center flex border-white border-solid border-2 transition-all cursor-pointer mb-2 h-16 aspect-square w-16 z-70 p-3 rounded-full shadow-lg text-[#0071b9] bg-white ">
                    <IconStack2 size={30} />
                </div>
            </Menu.Target>
            <Menu.Dropdown>
                {
                    Object.keys(data).map((key, index) => {
                        return (
                            <Menu.Item key={index} onClick={() => {
                                let temp = data
                                temp[key] = {
                                    ...temp[key],
                                    visible: !temp[key].visible
                                }

                                visibility.value = JSON.stringify(temp)
                            }}>{
                                    data[key].visible ? <span className="text-green-500">✔</span> : <span className="text-red-500">✖</span>
                                } {key
                                    .replace(dropvalue.value, '')
                                    .replace('_OUT_', '')
                                    .split('_')
                                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                    .join(' ')

                                }</Menu.Item>
                        )
                    })
                }
                <Menu.Item onClick={() => {
                    photoVisibility.value = !photoVisibility.value
                }}>
                    {
                        photoVisibility.value ? <span className="text-green-500">✔</span> : <span className="text-red-500">✖</span>
                    }
                    Photos
                </Menu.Item>
                <Menu.Item onClick={() => {
                    videoVisibility.value = !videoVisibility.value
                }
                }>
                    {
                        videoVisibility.value ? <span className="text-green-500">✔</span> : <span className="text-red-500">✖</span>
                    }
                    Videos
                </Menu.Item>

            </Menu.Dropdown>
        </Menu>

    )
}