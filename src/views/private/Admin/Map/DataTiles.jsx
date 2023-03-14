import { signal } from "@preact/signals"
import { useEffect, useState } from "preact/hooks"
import { Layer, Source, useMap } from "react-map-gl"
import { getAddressPointStatus } from "../../../../api"
import { dropvalue } from "../../../../layout/Header"

export const visibility = signal(null)

export default () => {


    const [tileData, setTileData] = useState(null)
   

    useEffect(() => {
        dropvalue.subscribe((value) => {
        setTileData(null)
       

   
            fetch(`https://dim-tileserver-dev.hiwifipro.com/data/${value}.json`)
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
                if (!visibility.value) {
                    visibility.value = JSON.stringify(visibilitytemp)

                } else {
                    setTileData(data)
                }

            })
        
    })

    }, [])

    // on visibility change

    return (
        <>

            {tileData != null &&

                <TilesView tileData={tileData} id={dropvalue.value}  />
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
                                        
                                        if (layer.layer == dropvalue.value+'_OUT_DistributionCables') {
                                            return {
                                                "line-color": "red",
                                                "line-opacity": 0.7,
                                                "line-width": ["interpolate", ["linear"], ["zoom"], 5, 2, 18, 6],
                                            }
                                        }
                                        else if (layer.layer == dropvalue.value+'_OUT_FeederCables') {
                                            return {
                                                "line-color": "purple",
                                                "line-opacity": 0.7,
                                                "line-width": ["interpolate", ["linear"], ["zoom"], 5, 3, 18, 8],
                                            }
                                        }
                                        else if (layer.layer == dropvalue.value+'_OUT_PrimDistributionCables') {
                                            return {
                                                "line-color": "blue",
                                                "line-opacity": 0.7,
                                                "line-width": ["interpolate", ["linear"], ["zoom"], 5, 1, 18, 4],
                                            }
                                        } else {
                                            return {
                                                "line-color": "grey",
                                                "line-opacity": 0.7,
                                                "line-width": ["interpolate", ["linear"], ["zoom"], 5, 0, 18, 2],
                                            }
                                        }


                                    })()

                                    :
                                    {
                                        "circle-color": "transparent",
                                        "circle-stroke-width": 1,
                                        "circle-stroke-opacity":0.1,
                                        "circle-stroke-color": "white",

                                        "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 5, 18, 15],
                                    }
                        }



                        layout={{
                            ...layer.layout,
                            // visibility: inside?.visible ? 'visible' : 'none'      
                        }}
                        
                        beforeId={
                            layer.geometry.replace('Multi', '') == 'Polygon' ? "waterway" :
                            "addressPoints"
                        }
                    />
                })
            }
        </Source>
    )
}