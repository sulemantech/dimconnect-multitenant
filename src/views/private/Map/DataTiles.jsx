import { signal } from "@preact/signals"
import { useEffect,useState } from "preact/hooks"
import { Layer, Source, useMap } from "react-map-gl"
import { dropvalue } from "../../../layout/Header"

export const visibility = signal(null)

export default () => {

    
    const [tileData,setTileData] = useState(null)

    
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
                        type : layer.geometry,
                        attributes : layer.attributes
                    }
                })
                setTileData(data)
               if(!visibility.value){
                visibility.value = JSON.stringify(visibilitytemp)
               
               }else{
                setTileData(data)
               }
               
            })
        
    }, [dropvalue.value])

    // on visibility change
  

    return (
        <>

                {tileData != null &&
                   
                       <TilesView tileData={tileData} id={dropvalue.value} />
                }
            </>

            )
}

export const TilesView = ({tileData,id}) => {
 
    return(
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
            console.log(inside)
            return <Layer
                interactive
                id={layer.layer + id}
                type={layer.geometry.replace('Multi', '') == 'Polygon' ? 'fill' : layer.geometry.replace('Multi', '') == 'LineString' ? 'line' : 'circle'}
                sourceId={`tilesource${id}`}
                source-layer={layer.layer}
                paint={
                    inside?.style ? inside?.style : layer.geometry.replace('Multi', '') == 'Polygon' ? {
                        "fill-color": "orange",
                        "fill-opacity": 0.1
                    } : layer.geometry.replace('Multi', '') == 'LineString' ? {
                        "line-color": "grey",
                        "line-width": ["interpolate", ["linear"], ["zoom"], 5, 0, 18, 2],
                    } : {
                        "circle-color": "red",
                        "circle-radius": ["interpolate", ["linear"], ["zoom"], 5, 0, 18, 5],
                    } 
                }
                layout={{
                    ...layer.layout,
                    // visibility: inside?.visible ? 'visible' : 'none'
                }}
            />
        })
    }
</Source>
    )
}