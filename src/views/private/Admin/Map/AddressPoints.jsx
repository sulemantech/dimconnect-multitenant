import { useEffect, useMemo, useState } from "preact/hooks"
import { getAddressPointStatus } from "../../../../api"
import { dropvalue } from "../../../../layout/Header"
import { Layer, Source } from "react-map-gl"
import { signal } from "@preact/signals"
import { useDidUpdate } from "@mantine/hooks"

export const addressPointsVisibility = signal(true)
export const addressPointsReceived = signal(false)
export const addressPointsStatusVisibility = signal({
    "1" : true,
    "2" : true,
    "3" : true,
    "4" : true,
    "5" : true,
    "6" : true,
})


export default () => {
    const [addressPoints, setAddressPoints] = useState({
        "1" : [],
        "2" : [],
        "3" : [],
        "4" : [],
        "5" : [],
        "6" : [],
    })

    const [addressPointsStatusVisibilityState, setAddressPointsStatusVisibilityState] = useState({
        "1" : true,
    "2" : true,
    "3" : true,
    "4" : true,
    "5" : true,
    "6" : true,
    })

    useEffect(() => {
        getAddressPointStatus(dropvalue.value).then(({ data }) => {
            addressPointsReceived.value = true
            setAddressPoints(data?.[0]?.json_object_agg)

        })
        addressPointsStatusVisibility.subscribe((val) => {
            setAddressPointsStatusVisibilityState(val)
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
        <>
        { addressPointsVisibility.value &&
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
                    "rgb(255, 140, 42)",
                    "2",
                    "rgb(29, 155, 216)",
                    "3",
                    "rgb(237, 82, 73)",
                    "4",
                    "rgb(0, 0, 0)",
                    "5",
                    "rgb(167, 38, 231)",
                    "6",
                    "rgb(112, 173, 70)",
                    "#000000"
                ]
            }}
            filter={['in', 'status', ... Object.entries(addressPointsStatusVisibilityState).filter(([key, value]) => value).map(([key, value]) => key)]}
            
        />
        </Source>
}
        </>
      
    )
}