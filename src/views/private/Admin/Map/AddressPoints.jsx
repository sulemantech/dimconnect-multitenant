import { useEffect, useMemo, useState } from "preact/hooks"
import { getAddressPointStatus } from "../../../../api"
import { dropvalue } from "../../../../layout/Header"
import { Layer, Source, useMap } from "react-map-gl"
import { signal } from "@preact/signals"
import { useDidUpdate } from "@mantine/hooks"
import { openModal } from "@mantine/modals"

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


export const editAddressPoint = signal(false)
export const CreateAddressPoint = () => {
    
    const map = useMap()?.current
    useEffect(() => {
        let edit = false
        editAddressPoint.subscribe(val=>{
            if(val){
                document.getElementsByClassName("mapboxgl-canvas")[0].style.cursor = "crosshair"
                edit = true
            }else{
                document.getElementsByClassName("mapboxgl-canvas")[0].style.cursor = "grab"
                edit = false
            }
        })
        map?.on("click", (e) => {
            if (edit) {
                openModal({
                    title: "Neuer Adresspunkt",
                    children: <CreateAddressPointForm lat={e.lngLat.lat} lng={e.lngLat.lng} />
                })
            }
        })
    }, [])
    return <>

    </>
}


// "stn": "123",
// "hnr": 123,
// "hnrz": "Z1",
// "plz": "12345",
// "ort": "Testort",
// "ott": "Testott",
// "anz_hh": 3,
// "anz_gew": 4,
// "status": 1,
// "status_bemerkung": 2,
// "status_bemerkung_sonstiges": "Testbemerkung",
// "anmerkung_adresse": 3,
// "x": 10.0,
// "y": 20.0,
// "benutzer": "Testbenutzer"
export const CreateAddressPointForm = ({lat, lng}) => {
    return (
        <div>
            <form>
                <div>
                    <label>Stadtname</label>
                    <input type="text" name="stn" />
                </div>
                <div>
                    <label>Hausnummer</label>
                    <input type="text" name="hnr" />
                </div>
                <div>
                    <label>Hausnummerzusatz</label>
                    <input type="text" name="hnrz" />
                </div>
                <div>
                    <label>Postleitzahl</label>
                    <input type="text" name="plz" />
                </div>
                <div>
                    <label>Ort</label>
                    <input type="text" name="ort" />
                </div>
                <div>
                    <label>Ortsteil</label>
                    <input type="text" name="ott" />
                </div>
                <div>
                    <label>Anzahl Haushalte</label>
                    <input type="text" name="anz_hh" />
                </div>
                <div>
                    <label>Anzahl Gewerbe</label>
                    <input type="text" name="anz_gew" />
                </div>
                <div>
                    <label>Status</label>
                    <select name="status">
                        <option value="1">ja (Anschluss prüfen)</option>
                        <option value="2">ja</option>
                        <option value="3">nein (Anschluss geprüft)</option>
                        <option value="4">nein</option>
                        <option value="5">inexistente Adresse</option>
                    </select>
                </div>
                <div>
                    <label>Status Bemerkung</label>
                    <input type="text" name="status_bemerkung" />
                </div>
                <div>
                    <label>Status Bemerkung Sonstiges</label>
                    <input type="text" name="status_bemerkung_sonstiges" />
                </div>
                </form>
        </div>
    )
}
