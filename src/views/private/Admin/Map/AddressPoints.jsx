import { useEffect, useMemo, useState } from "preact/hooks"
import { getAddressPointStatus } from "../../../../api"
import { dropvalue } from "../../../../layout/Header"
import { Layer, Source } from "react-map-gl"

export default () => {
    const [addressPoints, setAddressPoints] = useState({
        "1" : [],
        "2" : [],
        "3" : [],
        "4" : [],
    })

    useEffect(() => {
        getAddressPointStatus(dropvalue.value).then(({ data }) => {
           
            setAddressPoints(data?.[0]?.json_object_agg)

        })

    }, [dropvalue.value])

    const geojson = useMemo(() => {
        //e.g {"1" : [[id,lat,lng],[id,lat,lng]]}
        let geojson = {
            "type": "FeatureCollection",
            "features": []
        }
        for (const [key, value] of Object.entries(addressPoints)) {
            value.forEach(point => {
                geojson.features.push({
                    "type": "Feature",
                    "properties": {
                        "id": point[0],
                        "status": key
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [point[1], point[2]]
                    }
                })
            })
        }
      
        return geojson
    }, [addressPoints])


    return (
        <Source
            id="addressPoints"
            type="geojson"
            data={geojson}
        >
        <Layer
            id="addressPoints"
            type="circle"
            source="addressPoints"
            interactive
            paint={{
                "circle-radius": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    0, 0.5,
                    22, 7
                ],
                "circle-stroke-color": "white",
                "circle-stroke-width": 1,
                "circle-blur-transition": { duration: 0 },
                "circle-opacity-transition": { duration: 0 },
                "circle-color": [
                    "match",
                    ["get", "status"],
                    "1",
                    "#FF0000",
                    "2",
                    "#FFA500",
                    "3",
                    "#FFFF00",
                    "4",
                    "#00FF00",
                    "#000000"
                ]
            }}
            
        />
        </Source>
    )
}