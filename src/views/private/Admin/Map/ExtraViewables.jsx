
import { Button, Divider, LoadingOverlay, Menu, SegmentedControl } from "@mantine/core"
import { IconEye, IconBarrierBlock, IconRoad, IconTools } from "@tabler/icons"
import { closeAllModals, openModal } from "@mantine/modals"
import { useState, useEffect, useMemo } from "preact/hooks"
import { useDidUpdate } from "@mantine/hooks"
import { Layer, Marker, Source } from "react-map-gl"
import proj4 from "proj4"
import * as turf from "@turf/turf"

import { BarrierState, dropvalue, mapSignal, roadandwaterstate, equipmentState, districts, regionCostState, mapClickBindings, costInputParams } from "../../../../signals"
import { FabClass } from "../../../../layout"
import { getBoundaries, getCostInfoByDistrictId, getEquipment } from "../../../../api"
import { IconWorldDollar } from "@tabler/icons-react"


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
    5: "KollSch",
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
        mapSignal.subscribe((value) => {
            if (!value) return
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
            const bboxDD = turf.bbox(dd)
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
                "icon-allow-overlap": false
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

const RegionCostCalculation = () => {
    const [visible, setVisible] = useState(false)
    const [map, setMap] = useState(null)
    const [data, setData] = useState(null)
    const [ags, setAgs] = useState(null)
    const [loading, setLoading] = useState(false)
    const [geometry, setGeometry] = useState([])
    const [polygon, setPolygon] = useState([])
    useEffect(() => {
        mapSignal.subscribe(setMap)
        dropvalue.subscribe(setAgs)
        regionCostState.subscribe(setVisible)
    }, [])
    useDidUpdate(() => {
        if (!map) return
        if (!visible) {
            map.getCanvas().style.cursor = ''
            delete mapClickBindings.value['CostCalculation']
            setPolygon([])
            setGeometry([])
            return
        }

        map.getCanvas().style.cursor = 'crosshair'
        mapClickBindings.value['CostCalculation'] = (e) => {
            e.preventDefault()
            if (!visible) return

            const { lng, lat } = e.lngLat
            if (!polygon) {
                console.log('set')
                setGeometry([[lng, lat]])
            } else {
                setGeometry((prev) => [...prev, [lng, lat]])
            }
        }

    }, [visible, ags, map])

    useDidUpdate(() => {
        if (!geometry) return
        if (geometry.length === 1) {
            setPolygon(geometry)
        } else if (geometry.length === 2) {
            setPolygon([geometry[0], geometry[1], geometry[1], geometry[0]])
        } else if (geometry.length > 2) {
            setPolygon([...geometry, geometry[0]])
        }
    }, [geometry])

    const submitRegionCostCalculation = () => {
        if (!polygon) return
        setLoading(true)
        const URLSearchParam = new URLSearchParams();
        URLSearchParam.append('costs', JSON.stringify(costInputParams.value));
        URLSearchParam.append('geom', JSON.stringify(
            {
                type: "Polygon",
                coordinates: [polygon]
            }
        ));

        getCostInfoByDistrictId(ags, URLSearchParam)

            .then((res) => {

                setLoading(false);
                setGeometry([]);
                setPolygon([]);

                openModal({
                    title: 'Kosteninformationen',
                    children: <CostInfoModalContent data={res.data} />
                })

            }).catch((err) => {
                setLoading(false);
                console.log(err);
            })

    }


    return (
        <>
            {
                visible &&
                <>

                    <Source id="region-cost-calculation" type="geojson" data={{
                        type: "FeatureCollection",
                        features: [{
                            type: "Feature",
                            properties: {
                                "area": polygon.length > 2 ? `${turf.area(turf.polygon([polygon])).toFixed(1)} sqm` : ""
                            },
                            geometry: {
                                "type": polygon.length == 1 ? 'Point' : polygon.length == 2 ? 'LineString' : 'Polygon',
                                "coordinates": polygon.length == 1 ? polygon[0] : polygon.length == 2 ? polygon : [polygon]
                            }
                        }]
                    }}>
                        <Layer id="region-cost-calculation" type="fill" paint={{
                            "fill-color": "red",
                            "fill-opacity": 0.4
                        }} />
                        <Layer id="region-cost-calculation-line" type="line" paint={{
                            "line-color": "red",
                            "line-width": 4,
                            "line-opacity": 0.4
                        }} />
                        {
                            polygon.length == 1 && <Layer id="region-cost-calculation-point" type="circle" paint={{
                                "circle-color": "red",
                                "circle-radius": 5
                            }} />
                        }
                        <Layer id="region-cost-calculation-label" type="symbol" layout={{
                            "text-field": ["get", "area"],
                            "text-size": 15,
                            "text-allow-overlap": true,
                            "text-ignore-placement": true
                        }} paint={{
                            "text-color": "white"
                        }} />
                    </Source>

                    {
                        // add marker in center of polygon if more than 3 points
                        polygon.length > 4 && <Marker
                            latitude={polygon[0][1]}
                            longitude={polygon[0][0]}
                            anchor="center"
                            draggable={false}
                        >
                            <Button
                                loading={loading}

                                onClick={submitRegionCostCalculation}
                                className="px-4 py-2 font-bold text-white border-white border-2 border-solid hover:scale-105 transition-all cursor-pointer bg-red-600 hover:bg-red-800 rounded-full">
                                Calculate
                            </Button>
                        </Marker>

                    }


                </>
            }
        </>
    )

}

const CostInfoModalContent = ({ data }) => {
    const [segmentedControl, setSegmentedControl] = useState('homeActivation')
    
    return (
        <div>
            <SegmentedControl
                className="mb-4"
                data={[
                    { label: 'Home Activation', value: 'homeActivation' },
                    { label: 'Cables', value: 'cable' },
                    { label: 'Ducts', value: 'duct' },
                ]}
                fullWidth
                color="brand"
                onChange={(value) => {
                    setSegmentedControl(value)
                }}
                value={segmentedControl}
            />
            <div>
                {
                    segmentedControl === 'cable' ?
                        <CableTable data={data.cables} />
                        : segmentedControl === 'duct' ?
                            <DuctTable data={data.duct} />
                            : segmentedControl === 'homeActivation' ?
                                <HomeActivationTable data={data.homeActivation} />
                                : null
                }
            </div>

        </div>
    )
}

const CableTable = ({ data }) => {
    const sections = Object.keys(data);
  
    return (
      <div className="overflow-x-auto">
        {sections.map(section => (
          <div key={section}>
            <h2 className="text-xl font-semibold mb-2">{section}</h2>
            <table className="min-w-full table-auto">
              <thead className="justify-between">
                <tr>
                  <th className="px-2 py-2">Cable Type</th>
                  <th className="px-2 py-2">Material Cost</th>
                  <th className="px-2 py-2">Labour Cost</th>
                  <th className="px-2 py-2">Total</th>
                  <th className="px-2 py-2">Volume</th>
                  <th className="px-2 py-2">Total Cost</th>
                </tr>
              </thead>
              <tbody>
                {data[section].map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : ''}>
                    <td className="px-2 py-2">{row.cable_type}</td>
                    <td className="px-2 py-2">{row.materialcost}</td>
                    <td className="px-2 py-2">{row.labourcost}</td>
                    <td className="px-2 py-2">{row.total}</td>
                    <td className="px-2 py-2">{row.volume}</td>
                    <td className="px-2 py-2">{row.total_cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    );
  };

const HomeActivationTable = ({ data }) => {
    return (
        <div>
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full overflow-hidden sm:px-6 lg:px-8">
                        <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>

                                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            Key
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            Value
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {
                                        Object.keys(data).map((key, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{key.split('_').join(' ').toUpperCase()}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{data[key]}</div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}




const DuctTable = ({ data }) => {
    const sections = Object.keys(data);
  
    return (
      <div className="overflow-x-auto">
        {sections.map(section => (
          <div key={section}>
            <h2 className="text-xl font-semibold mb-2">{section}</h2>
            <table className="min-w-full table-auto">
              <thead className="justify-between">
                <tr>
                  <th className="px-2 py-2">Duct Type</th>
                  <th className="px-2 py-2">Material Cost</th>
                  <th className="px-2 py-2">Labour Cost</th>
                  <th className="px-2 py-2">Volume</th>
                  <th className="px-2 py-2">Total Cost</th>
                </tr>
              </thead>
              <tbody>
                {data[section].map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : ''}>
                    <td className="px-2 py-2">{row.duct_type}</td>
                    <td className="px-2 py-2">{row.duct_materialcost}</td>
                    <td className="px-2 py-2">{row.duct_labourcost}</td>
                    <td className="px-2 py-2">{row.duct_volume}</td>
                    <td className="px-2 py-2">{row.total_cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    );
  };

 





export default () => {
    return (
        <>
            <RoadsAndWater />
            <Barriers />
            <Equipments />
            <RegionCostCalculation />
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
        'Region Cost': {
            icon: <IconWorldDollar className="scale-110 text-[#0071b9] " />,
            selectable: true,
            "method": () => {
                regionCostState.value = true
            }
            ,
            "antiMethod": () => {
                regionCostState.value = false
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
                        size: 'xl',
                        className: 'w-[90vw] h-[90vh]',
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