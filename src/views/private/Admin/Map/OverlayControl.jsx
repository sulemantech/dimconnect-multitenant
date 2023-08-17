

import { Menu } from "@mantine/core"
import { closeAllModals, openModal } from "@mantine/modals"
import { IconStack2 } from "@tabler/icons"
import { useEffect, useState } from "preact/hooks"

import { FabClass } from "../../../../layout"
import { addressPointsVisibility, dropvalue, photoVisibility, videoVisibility, visibility } from "../../../../signals"

export default ({ modal = false }) => {
    const [data, setData] = useState({})
    useEffect(() => {
        setData(JSON.parse(visibility.value) || {})
    }, [visibility.value])

    const OverlayControlButton = <div id='overlaycontrol' className={`${FabClass} mb-2 text-[#0E76BB] bg-white`}>
        <IconStack2 className="scale-150" />
    </div>

    if (modal) {
        return (
            <div id='overlaycontrol'
                onClick={() => {
                    openModal({
                        title: 'Overlay Control',
                        children: (
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2 items-center" onClick={() => {
                                    closeAllModals()
                                    addressPointsVisibility.value = !addressPointsVisibility.value
                                }
                                }>
                                    {
                                        addressPointsVisibility.value ? <span className="text-green-500">✔</span> : <span className="text-red-500">✖</span>
                                    }
                                    Address Points
                                </div>
                                {
                                    Object.keys(data)?.map((key, index) => {
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
                                                    .split('_')?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
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
                {OverlayControlButton}
            </div>
        )

    }

    return (

        <Menu position="left-end" withArrow>
            <Menu.Target>
                {OverlayControlButton}
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item onClick={() => {
                    addressPointsVisibility.value = !addressPointsVisibility.value
                }}>
                    {
                        addressPointsVisibility.value ? <span className="text-green-500">✔</span> : <span className="text-red-500">✖</span>
                    }
                    Address Points
                </Menu.Item>
                {
                    Object.keys(data)?.map((key, index) => {
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
                                    .split('_')?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
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