import { signal } from "@preact/signals"
import { useEffect, useState } from "preact/hooks"
import { Layer, Source, useMap } from "react-map-gl"
import { getAddressPointStatus } from "../../../../api"
import { dropvalue } from "../../../../layout/Header"

export const visibility = signal(null)

export default () => {


    const [tileData, setTileData] = useState(null)
   

    useEffect(() => {
        setTileData(null)
       

   
            fetch(`https://dim-tileserver-dev.hiwifipro.com/data/${dropvalue.value}.json`)
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
        


    }, [dropvalue.value])

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
                   
                    // if(layer.layer == `${dropvalue.value}_OUT_DemandPoints`){
                    //     const expressionValidated = addressPointStatus?.['1']?.map((id) => ['==', 'id', id])
                    //     const expressionUnvalidated = addressPointStatus?.['2']?.map((id) => ['==', 'id', id])
                    //     const expressionToBeValidated = addressPointStatus?.['4']?.map((id) => ['==', 'id', id])
                    //     return [
                    //     <Layer
                    //         interactive
                    //         id={layer.layer + 'validated'}
                    //         type='circle'
                    //         sourceId={`tilesource${id}`}
                    //         source-layer={layer.layer}
                    //         paint={{
                    //             'circle-color' : "orange",
                    //             'circle-radius': ['interpolate', ['linear'], ['zoom'], 5, 3, 18, 7],
                    //             'circle-stroke-width': 1,
                    //             'circle-stroke-color': 'white'

                    //         }}
                            
                    //         filter={['any', ...expressionValidated]}
                    //     />,
                    //     <Layer
                    //         interactive
                    //         id={layer.layer + 'unvalidated'}
                    //         type='circle'
                    //         sourceId={`tilesource${id}`}
                    //         source-layer={layer.layer}
                    //         paint={{
                    //             'circle-color' : "red",
                    //             'circle-radius': ['interpolate', ['linear'], ['zoom'], 5, 3, 18, 7],
                    //             'circle-stroke-width': 1,
                    //             'circle-stroke-color': 'white'

                    //         }}
                    //         filter={['any', ...expressionUnvalidated]}
                    //     />,
                    //     <Layer  
                    //         interactive 
                    //         id={layer.layer + 'tobeverified'}
                    //         type='circle'
                    //         sourceId={`tilesource${id}`}
                    //         source-layer={layer.layer}
                    //         paint={{
                    //             'circle-color' : "blue",
                    //             'circle-radius': ['interpolate', ['linear'], ['zoom'], 5, 3, 18, 7],
                    //             'circle-stroke-width': 1,
                    //             'circle-stroke-color': 'white'

                    //         }}
                    //         filter={['any', ...expressionToBeValidated]}
                    //     />].map((layer) => layer)
                            
                    // }

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

                                    "fill-opacity": 0
                                }
                                :
                                layer.geometry.replace('Multi', '') == 'LineString'
                                    ?
                                    (() => {
                                        
                                        if (layer.layer == dropvalue.value+'_OUT_DistributionCables') {
                                            return {
                                                "line-color": "red",
                                                "line-width": ["interpolate", ["linear"], ["zoom"], 5, 0, 18, 5],
                                            }
                                        }
                                        else if (layer.layer == dropvalue.value+'_OUT_FeederCables') {
                                            return {
                                                "line-color": "purple",
                                                "line-width": ["interpolate", ["linear"], ["zoom"], 5, 0, 18, 5],
                                            }
                                        }
                                        else if (layer.layer == dropvalue.value+'_OUT_PrimDistributionCables') {
                                            return {
                                                "line-color": "blue",
                                                "line-width": ["interpolate", ["linear"], ["zoom"], 5, 0, 18, 5],
                                            }
                                        } else {
                                            return {
                                                "line-color": "grey",
                                                "line-width": ["interpolate", ["linear"], ["zoom"], 5, 0, 18, 5],
                                            }
                                        }


                                    })()

                                    :
                                    {
                                        "circle-color": "transparent",
                                        "circle-stroke-width": 1,
                                        "circle-stroke-color": "white",

                                        "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 1, 18, 1],
                                    }
                        }



                        layout={{
                            ...layer.layout,
                            // visibility: inside?.visible ? 'visible' : 'none'      
                        }}
                        
                        beforeId="addressPoints"
                    />
                })
            }
        </Source>
    )
}