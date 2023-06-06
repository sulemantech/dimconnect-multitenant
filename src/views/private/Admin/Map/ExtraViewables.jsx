
import { Divider, LoadingOverlay, Menu } from "@mantine/core"
import { IconEye, IconBarrierBlock, IconRoad, } from "@tabler/icons"
import { closeAllModals, openModal } from "@mantine/modals"
import { useState, useEffect } from "preact/hooks"
import { BarrierState, dropvalue, mapSignal, roadandwaterstate } from "../../../../signals"
import { FabClass } from "../../../../layout"
import { useDidUpdate } from "@mantine/hooks"
import { getBoundaries } from "../../../../api"
import { Layer, Source } from "react-map-gl"

const barrierLayers = {
    "road_service_case": {
        "color": "#fdebce"
    },
    "road_minor_case": {
        "color": {
            "stops": [
                [
                    13,
                    "#ffffff"
                ],
                [
                    15.7,
                    "#ffffff"
                ],
                [
                    16,
                    "#fdebce"
                ]
            ]
        }
    },
    "road_pri_case_ramp": {
        "color": "#ffeabb"
    },
    "road_trunk_case_ramp": {
        "color": {
            "stops": [
                [
                    12,
                    "#fbdb98"
                ],
                [
                    14,
                    "#fbdb98"
                ]
            ]
        }
    },
    "road_mot_case_ramp": {
        "color": {
            "stops": [
                [
                    12,
                    "#fbdb98"
                ],
                [
                    14,
                    "#fbdb98"
                ]
            ]
        }
    },
    "road_sec_case_noramp": {
        "color": {
            "stops": [
                [
                    11,
                    "#fffef9"
                ],
                [
                    12.99,
                    "#fffef9"
                ],
                [
                    13,
                    "#ffedc0"
                ]
            ]
        }
    },
    "road_pri_case_noramp": {
        "color": {
            "stops": [
                [
                    7,
                    "#ffe7b7"
                ],
                [
                    12,
                    "#ffeabb"
                ]
            ]
        }
    },
    "road_trunk_case_noramp": {
        "color": {
            "stops": [
                [
                    5,
                    "#ffe7b7"
                ],
                [
                    12,
                    "#fbdb98"
                ]
            ]
        }
    },
    "road_mot_case_noramp": {
        "color": {
            "stops": [
                [
                    5,
                    "#fbdb98"
                ],
                [
                    12,
                    "#fbdb98"
                ]
            ]
        }
    },
    "road_path": {
        "color": "#d7d7d7"
    },
    "road_service_fill": {
        "color": "#ffffff"
    },
    "road_minor_fill": {
        "color": "#ffffff"
    },
    "road_pri_fill_ramp": {
        "color": "#fefdd7"
    },
    "road_trunk_fill_ramp": {
        "color": "#FFE9A5"
    },
    "road_mot_fill_ramp": {
        "color": "#FFE9A5"
    },
    "road_sec_fill_noramp": {
        "color": "#fefdd7"
    },
    "road_pri_fill_noramp": {
        "color": "#fefdd7"
    },
    "road_trunk_fill_noramp": {
        "color": "#FFE9A5"
    },
    "road_mot_fill_noramp": {
        "color": "#FFE9A5"
    }
}


const RoadsAndWater = () => {
    const [visible, setVisible] = useState(false)
    const [map, setMap] = useState(null)
    useEffect(() => roadandwaterstate.subscribe(setVisible), [])
    useEffect(() => { mapSignal.subscribe(setMap) }, [])
    useDidUpdate(() => Object.keys(barrierLayers)?.map((key, index) => map.setPaintProperty(key, 'line-color', visible ? 'red' : barrierLayers[key].color)), [visible])
    return null
}

const Barriers = () => {
    const [visible, setVisible] = useState(false)
    const [map, setMap] = useState(null)
    const [data, setData] = useState(null)
    const [ags, setAgs] = useState(null)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        BarrierState.subscribe(setVisible)
        mapSignal.subscribe(setMap)
        dropvalue.subscribe(setAgs)
    }, [])
    useDidUpdate(() => {
        if (!visible) return
        if (!data?.[ags]) {
            setLoading(true)
            getBoundaries(ags).then((res) => {

                setData((prev) => ({ ...prev, [ags]: res.data }))
                setLoading(false)
            })
        }
    }, [visible, ags])


    if (loading) return <LoadingOverlay visible />
    return (
        <>
            {
                visible && data?.[ags] && <> <Source id="barriers" type="geojson" data={{
                    type: "FeatureCollection",
                    features: data?.[ags].filter((item) => item.geometry.type === "LineString")
                }}>
                    <Layer id="barriers" type="line" paint={{
                        "line-color": "red",
                        "line-width": 2
                    }} />
                </Source>
                    <Source id="barriers-polygon" type="geojson" data={{
                        type: "FeatureCollection",
                        features: data?.[ags].filter((item) => item.geometry.type === "Polygon")
                    }}>
                        <Layer id="barriers-polygon" type="fill" paint={{
                            "fill-color": "red",
                            "fill-opacity": 0.5
                        }} />
                    </Source>
                    <Source id="barriers-polygon" type="geojson" data={{
                        type: "FeatureCollection",
                        features: data?.[ags].filter((item) => item.geometry.type === "Point")
                    }}>
                        <Layer id="barriers-polygon" type="circle" paint={{
                            "circle-color": "red",
                            "circle-radius": 5
                        }} />
                    </Source>
                </>
            }
        </>
    )
}




export default () => {
    return (
        <>
            <RoadsAndWater />
            <Barriers />
        </>
    )
}

export const ExtraViewableControl = ({ modal = false, webview = false }) => {

    const [activeOption, setActiveOption] = useState(null)

    const Options = {
        'Roads and Waterways': {
            icon: <IconRoad className="scale-110 text-[#0071b9] " />,
            selectable: true,
            "method": () => {
                roadandwaterstate.value = true
            },
            "antiMethod": () => {
                roadandwaterstate.value = false
            }
        },
        'Barriers': {
            icon: <IconBarrierBlock className="scale-110 text-[#0071b9] " />,
            selectable: true,
            "method": () => {
                BarrierState.value = true
            }
            ,
            "antiMethod": () => {
                BarrierState.value = false
            }
        }

    }

    useEffect(() => {

    }, [])

    const AddControlButton = <div className={`mt-2 ${FabClass}  ${activeOption ? 'bg-red-500 text-white' : 'bg-white text-[#0071b9]'}`}>

        <IconEye className="scale-150" />
    </div>

    if (activeOption) {
        return (
            <div onClick={() => {
                setActiveOption(null)
                // call all anti methods
                Object.keys(Options)?.map((key, index) => {
                    Options[key].antiMethod()
                })
            }}>
                {AddControlButton}
            </div>
        )
    }

    if (modal) {
        return (
            <div
                onClick={() => {
                    openModal({
                        title: 'Create',
                        children: (
                            <div className="flex flex-col gap-2">
                                {
                                    Object.keys(Options)?.map((key, index) => {
                                        return (
                                            <div
                                                onClick={() => {
                                                    if (Options[key].selectable) setActiveOption(key)
                                                    Options[key].method()
                                                    if (modal) closeAllModals()
                                                }}
                                            >
                                                <div className="flex items-center gap-2 cursor-pointer">
                                                    {Options[key].icon}
                                                    <b className=" text-[#0071b9] tracking-wide font-bold">
                                                        {key}
                                                    </b>
                                                </div>
                                                <Divider className="my-2" />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )

                    })
                }}
            >
                {AddControlButton}
            </div>

        )
    }

    return (

        <Menu position="left-end" withArrow >
            <Menu.Target>
                {AddControlButton}
            </Menu.Target>
            <Menu.Dropdown>
                {
                    Object.keys(Options)?.map((key, index) => {
                        return (
                            <Menu.Item key={index}
                                onClick={() => {
                                    if (Options[key].selectable) setActiveOption(key)
                                    Options[key].method()
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    {Options[key].icon}
                                    <b className=" text-[#0071b9] tracking-wide font-bold">
                                        {key}
                                    </b>
                                </div>
                            </Menu.Item>
                        )
                    })
                }
            </Menu.Dropdown>
        </Menu>

    )
}