import { useEffect, useState } from "preact/hooks"
import { dropvalue } from "../../../../layout/Header"
import { getnetzplanning } from "../../../../api"
import { Source,Layer, useMap } from "react-map-gl"


 let SAMPLE = [{"json":{"type":"Feature","geometry":{"type":"Point","coordinates":[7.459926816,49.295767688]},"properties":{"legende":"Versorgungspunkt"}}},{"json":{"type":"Feature","geometry":{"type":"Point","coordinates":[7.580202076,49.254743359]},"properties":{"legende":"Versorgungspunkt"}}},
 {"json":{"type":"Feature","geometry":{"type":"MultiLineString","coordinates":[[[7.528042722,49.241698519],[7.527974888,49.241705404]]]},"properties":{"legende":"Tiefbau"}}}
]



export default () =>{
    const [data,setData ] = useState({
        points : {},
        line : {},
        polygon : {}
    })
    
    useEffect(()=>{
        dropvalue.subscribe((value)=>{
            getnetzplanning(value).then(({data})=>{
                let points = []
                let line = []
                let polygon = []
                
                data.forEach((item)=>{
                    try{
                    if(item.json.geometry.type == "Point" || item.json.geometry.type == "MultiPoint"){
                        points.push(item.json)
                    }
                    if(item.json.geometry.type == "MultiLineString" || item.json.geometry.type == "LineString"){
                        line.push(item.json)
                    }
                    if(item.json.geometry.type == "Polygon" || item.json.geometry.type == "MultiPolygon"){
                        polygon.push(item.json)
                    }
                    }catch(e){
                       
                    }
                })
                if(points.length > 0){
                    setData({
                        points : {
                            type : "FeatureCollection",
                            features : points
                        },
                        line : {
                            type : "FeatureCollection",
                            features : line
                        },
                        polygon : {
                            type : "FeatureCollection",
                            features : polygon
                        }
                    })
                }
            })
        }
        )
    }
    ,[])
    return(
        <>
            {data.points.features != undefined &&
                <>
                    <Source id="netzpoints" type="geojson" data={data.points}>
                        <Layer id="netzpoints" type="circle" paint={{'circle-radius': 5,'circle-color': '#007cbf'}} />
                    </Source>
                    <Source id="netzlines" type="geojson" data={data.line}>
                        <Layer id="netzlines" type="line" paint={{'line-color': '#007cbf','line-width': 2}} />
                    </Source>
                    {/* <Source id="netzpolygon" type="geojson" data={data.polygon}>
                        <Layer id="netzpolygon" type="fill" paint={{'fill-color': '#007cbf','fill-opacity': 0.5}} />
                    </Source> */}
                </>
            }
        </>
    )
}