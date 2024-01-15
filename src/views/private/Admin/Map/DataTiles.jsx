import { useEffect, useState } from "preact/hooks"
import { Layer, Source } from "react-map-gl"
import SplineWrapper from "spline-wrapper"

import { dropvalue, visibility } from "../../../../signals"
import appConfig from "../../../../config/appConfig"

import Cookies from 'js-cookie';

export default () => {


    const [tileData, setTileData] = useState(null)


    useEffect(() => {
        dropvalue.subscribe((value) => {
            setTileData(null)



            fetch(`https://dim-tileserver-dev.hiwifipro.com/data/${value}.json`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${Cookies.get(appConfig.localStorageKey) || Cookies.get(appConfig.localStorageKeyWebview)}`,
                }
            })
                .then(res => res.json())
                .then(data => {

                    let visibilitytemp = {}
                    data?.tilestats?.layers?.forEach(layer => {
                        visibilitytemp[layer.layer] = {
                            visible: true,
                            name: layer.layer,
                            type: layer.geometry,
                            attributes: layer.attributes
                        }
                    })
                    setTileData(data)

                    visibility.value = JSON.stringify(visibilitytemp)



                })

        })

    }, [])

    // on visibility change

    return (
        <>

            {tileData != null &&

                <TilesView tileData={tileData} id={dropvalue.value} />
            }
        </>

    )
}



export const TilesView = ({ tileData, id }) => {

    const PolyfillColors = {
        [`${dropvalue.value}_district_boundaries`]: 'whitesmoke',
        [`${dropvalue.value}_OUT_DistributionClusters`]: 'purple',
        [`${dropvalue.value}_OUT_FeederClusters`]: 'pink',
        [`${dropvalue.value}_OUT_PrimDistributionClusters`]: 'green',

    }

    return (
        <SplineWrapper>
            <Source
                type="vector"
                format="pbf"
                url={`https://dim-tileserver-dev.hiwifipro.com/data/${id}.json`}
                minzoom={1}
                maxzoom={18}
                name={`tilesource${id}`}
            >

                {
                    tileData?.tilestats?.layers?.map((layer) => {
                        const inside = JSON.parse(visibility.value)[layer.layer]

                        return <Layer
                            interactive
                            id={layer.layer}
                            type={layer.geometry.replace('Multi', '') == 'Polygon' ? 'fill' : layer.geometry.replace('Multi', '') == 'LineString' ? 'line' : 'circle'}
                            sourceId={`tilesource${id}`}
                            minzoom={
                                layer.geometry.replace('Multi', '') == 'Polygon' ?
                                    1
                                    :
                                    layer.geometry.replace('Multi', '') == 'LineString' ?
                                        14
                                        :
                                        14
                            }
                            maxzoom={
                                layer.geometry.replace('Multi', '') == 'Polygon' ?
                                    14
                                    :
                                    layer.geometry.replace('Multi', '') == 'LineString' ?
                                        22
                                        :
                                        22
                            }
                            source-layer={layer.layer}
                            paint={
                                inside?.style ? inside?.style : layer.geometry.replace('Multi', '') == 'Polygon' ?
                                    {
                                        // how to do transparent fill
                                        "fill-color": PolyfillColors[layer.layer] ? PolyfillColors[layer.layer] : 'grey',
                                        "fill-opacity": 0.5
                                    }
                                    :
                                    layer.geometry.replace('Multi', '') == 'LineString'
                                        ?
                                        (() => {

                                            if (layer.layer == dropvalue.value + '_OUT_DistributionCables') {
                                                return {
                                                    "line-color": "orange",
                                                    "line-opacity": 0.7,
                                                    "line-width": ["interpolate", ["linear"], ["zoom"], 14, 2, 18, 4],
                                                }
                                            }
                                            else if (layer.layer == dropvalue.value + '_OUT_FeederCables') {
                                                return {
                                                    "line-color": "purple",
                                                    "line-opacity": 0.7,
                                                    "line-width": ["interpolate", ["linear"], ["zoom"], 14, 3, 18, 6],
                                                }
                                            }
                                            else if (layer.layer == dropvalue.value + '_OUT_PrimDistributionCables') {
                                                return {
                                                    "line-color": "blue",
                                                    "line-opacity": 0.7,
                                                    "line-width": ["interpolate", ["linear"], ["zoom"], 14, 1, 18, 2],
                                                }
                                            } else {
                                                return {
                                                    "line-color": "yellow",
                                                    "line-opacity": 0.7,
                                                    "line-width": ["interpolate", ["linear"], ["zoom"], 14, 0.5, 18, 1],
                                                }
                                            }


                                        })()

                                        :
                                        {
                                            "circle-color": "transparent",
                                            "circle-stroke-width": 1,
                                            "circle-stroke-opacity": 0.1,
                                            "circle-stroke-color": "white",

                                            "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 5, 18, 15],
                                        }
                            }



                            layout={{
                                ...layer.layout,
                                visibility: inside?.visible ? 'visible' : 'none'
                            }}

                            beforeId={
                                layer.geometry.replace('Multi', '') == 'Polygon' ? "waterway" :
                                    "addressPoints"
                            }
                        />
                    })
                }
            </Source>
        </SplineWrapper>
    )
}