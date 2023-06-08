
import { Divider, LoadingOverlay, Menu } from "@mantine/core"
import { IconEye, IconBarrierBlock, IconRoad, IconTools } from "@tabler/icons"
import { closeAllModals, openModal } from "@mantine/modals"
import { useState, useEffect,useMemo } from "preact/hooks"
import { useDidUpdate } from "@mantine/hooks"
import { Layer, Source } from "react-map-gl"
import proj4 from "proj4"
import { bbox } from "@turf/turf"

import { BarrierState, dropvalue, mapSignal, roadandwaterstate, equipmentState, districts } from "../../../../signals"
import { FabClass } from "../../../../layout"
import { getBoundaries, getEquipment } from "../../../../api"


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


const availableLegende = {
    5:  "KollSch",
    6: "PoP",
    10: "Nvt"
}





const Equipments = () => {
    const [visible, setVisible] = useState(false)
    const [map, setMap] = useState(null)
    const [data, setData] = useState(null)
    const [ags, setAgs] = useState(null)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        equipmentState.subscribe(setVisible)
        mapSignal.subscribe((value)=>{
            if(!value) return
            setMap(value)
            value.loadImage('/icons/square.png', (error, image) => {
                if (error) throw error;
                value.addImage('KollSch', image);
            });
            value.loadImage('/icons/house.png', (error, image) => {
                if (error) throw error;
                value.addImage('PoP', image);
            })
            value.loadImage('/icons/triangle.png', (error, image) => {
                if (error) throw error;
                value.addImage('Nvt', image);
            })
        })
        dropvalue.subscribe(setAgs)
    }, [])
    useDidUpdate(() => {
        if (!visible) return
        if (!data?.[ags]) {

            if (!districts.value.hasOwnProperty('features')) return
            setLoading(true)

            const dd = districts.value?.features?.find(district => district.properties?.c == ags)
            const bboxDD = bbox(dd)
            const epsgeur = '+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs'
            const epsg4326 = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs'

            const bboxDD4326 = proj4(epsg4326, epsgeur, [bboxDD[0], bboxDD[1]]).concat(proj4(epsg4326, epsgeur, [bboxDD[2], bboxDD[3]]))

            const [minX, minY, maxX, maxY] = bboxDD4326

            getEquipment(ags, minX, minY, maxX, maxY).then(res => {
               

                setData((prev) => ({ ...prev, [ags]: res.data }))
                setLoading(false)
            })
        }
    }, [visible, ags])


    if (loading) return <LoadingOverlay visible />
    if (!visible) return null
    // return (
    //     <>
    //         {
    //             Object.keys(data?.[ags] ?? {}).map((key, index) => {
                   
    //                return data?.[ags]?.[key]?.data?.map((coordinates) => {
    //                     return <MarkerMemo key={coordinates[0]} x={coordinates[0]} y={coordinates[1]} legendeCode={data?.[ags]?.[key]?.id} />
    //                 })
    //             })
    //         }
    //     </>
    // )

    const geojson = useMemo(() => {
        if (!data?.[ags]) return null
        const features = Object.keys(data?.[ags] ?? {}).map((key, index) => {
            return data?.[ags]?.[key]?.data?.map((coordinates) => {
                return {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates
                    },
                    properties: {
                        legende: availableLegende[data?.[ags]?.[key]?.id],
                    }
                }
            })
        }).flat()
        return {
            type: "FeatureCollection",
            features
        }
    })

    return (
        <Source id="equipments" type="geojson" data={geojson}>
            <Layer id="equipments" type="symbol" layout={{
                "icon-image": ["get", "legende"],
                "icon-size": 0.9,
                "icon-allow-overlap": true
            }} 
                beforeId="addressPoints"
            />
        </Source>
    )
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
                        "line-width": 4,
                        "line-opacity": 0.4
                    }} />
                </Source>
                    <Source id="barriers-polygon" type="geojson" data={{
                        type: "FeatureCollection",
                        features: data?.[ags].filter((item) => item.geometry.type === "Polygon")
                    }}>
                        <Layer id="barriers-polygon" type="fill" paint={{
                            "fill-color": "red",
                            "fill-opacity": 0.4
                        }} />
                    </Source>
                    <Source id="barriers-polygon" type="geojson" data={{
                        type: "FeatureCollection",
                        features: data?.[ags].filter((item) => item.geometry.type === "Point")
                    }}>
                        <Layer id="barriers-polygon" type="circle" paint={{
                            "circle-color": "red",
                            "circle-radius": 20
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
            <Equipments />
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
        },
        'Equipment': {
            icon: <IconTools className="scale-110 text-[#0071b9] " />,
            selectable: true,
            "method": () => {
                equipmentState.value = true
            }
            ,
            "antiMethod": () => {
                equipmentState.value = false
            }
        },


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