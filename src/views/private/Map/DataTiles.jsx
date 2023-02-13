import { signal } from "@preact/signals"
import { useEffect,useState } from "preact/hooks"
import { Layer, Source, useMap } from "react-map-gl"
import { dropvalue } from "../../../layout/Header"

export const visibility = signal(null)

export default () => {

    const [tileJSON,settileJSON] = useState(null)
    const map = useMap()?.current
    useEffect(() => {
        
        fetch(`https://dim-tileserver-dev.hiwifipro.com/data/${dropvalue.value}.json`)
            .then(res => res.json())
            .then(data => {
                let visibilitytemp = {}
                data?.tilestats?.layers?.forEach(layer => {
                    visibilitytemp[layer.layer] = {
                        visible: true,
                        name: layer.layer,
                        type : layer.geometry,
                        attributes : layer.attributes
                    }
                })
               if(!visibility.value){
                visibility.value = JSON.stringify(visibilitytemp)
                const bounds = data?.bounds
                map.easeTo({ center: [bounds[0] + (bounds[2] - bounds[0]) / 2, bounds[1] + (bounds[3] - bounds[1]) / 2], zoom: 12 })
                settileJSON(visibilitytemp)
               
               }else{
                map.easeTo({ center: [8.029105246999109, 49.410560035491216], zoom: 12 })
                settileJSON(JSON.parse(visibility.value))
               }
               
            })
        
    }, [])

    // on visibility change
  

    return (
        <>
         
            <>
                {tileJSON != null &&
                    <>
                        <Source
                            id="geostyle"
                            type="vector"
                            tiles={[`https://dim-tileserver-dev.hiwifipro.com/data/${dropvalue.value}/{z}/{x}/{y}.pbf`]}
                            minzoom={1}
                            maxzoom={18}
                        />


                        {
                            Object.keys(tileJSON).map((key) => {
                                const layer = tileJSON[key]
                              
                                return <Layer
                                    interactive
                                    id={layer.name}
                                    type={layer.type.replace('Multi', '') == 'Polygon' ? 'fill' : layer.type.replace('Multi', '') == 'LineString' ? 'line' : 'circle'}
                                    source="geostyle"
                                    source-layer={layer.name}
                                    paint={
                                        layer.style ? layer.style : layer.type.replace('Multi', '') == 'Polygon' ? {
                                            "fill-color": "orange",
                                            "fill-opacity": 0.1
                                        } : layer.type.replace('Multi', '') == 'LineString' ? {
                                            "line-color": "grey",
                                            "line-width": ["interpolate", ["linear"], ["zoom"], 5, 0, 18, 2],
                                        } : {
                                            "circle-color": "red",
                                            "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 0, 18, 5],
                                        } 
                                    }
                                    layout={{
                                        ...layer.layout,
                                        visibility: JSON.parse(visibility.value)[layer.name].visible ? 'visible' : 'none'
                                    }}
                                />
                            })
                        }
                    </>
                }
            </>
</>
            )
}