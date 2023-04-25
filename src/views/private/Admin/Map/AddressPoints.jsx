import { useEffect, useMemo, useState } from "preact/hooks"
import { getAddressPointDetails, getAddressPointStatus, postAddressPoint, updateAddressPoint } from "../../../../api"
import { dropvalue } from "../../../../layout/Header"
import { Layer, Source, useMap } from "react-map-gl"
import { signal } from "@preact/signals"
import { useDidUpdate } from "@mantine/hooks"
import { closeAllModals, openModal } from "@mantine/modals"
import { Button, NativeSelect, Select, Text, TextInput, Textarea } from "@mantine/core"
import { showNotification } from "@mantine/notifications"
import jwtDecode from "jwt-decode"
import appConfig from "../../../../config/appConfig"
import { IconCheck, IconCross, IconX } from "@tabler/icons"
import proj4 from "proj4"
import { mapClickBindings } from "../../../../app"
import { editControlLoading, throwEditControlAntiMethods } from "./EditControl"
import { throwAddControlAntiMethods } from "./AddControl"


export const addressPointsVisibility = signal(true)
export const addressPointsReceived = signal(false)
export const addressPointsStatusVisibility = signal({
    "1": true,
    "2": true,
    "3": true,
    "4": true,
    "5": true,
    "6": true,
})


export default () => {
    const [addressPoints, setAddressPoints] = useState({
        "1": [],
        "2": [],
        "3": [],
        "4": [],
        "5": [],
        "6": [],
    })

    const [addressPointsStatusVisibilityState, setAddressPointsStatusVisibilityState] = useState({
        "1": true,
        "2": true,
        "3": true,
        "4": true,
        "5": true,
        "6": true,
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
            {addressPointsVisibility.value &&
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
                        filter={['in', 'status', ...Object.entries(addressPointsStatusVisibilityState).filter(([key, value]) => value).map(([key, value]) => key)]}

                    />
                </Source>
            }
        </>

    )
}


export const addAddressPoint = signal(false)
export const editAddressPoint = signal(false)

addAddressPoint.subscribe(val => {
    if (val) {
        throwEditControlAntiMethods.value = throwEditControlAntiMethods.value + 1
    }
})

editAddressPoint.subscribe(val => {
    if (val) {
        throwAddControlAntiMethods.value = throwAddControlAntiMethods.value + 1
    }
})

export const CreateAddressPoint = () => {

   
    useEffect(() => {
        
        
        addAddressPoint.subscribe(val => {
            if (val) {
                
                document.getElementsByClassName("mapboxgl-canvas")[0].style.cursor = "crosshair"
                mapClickBindings.value['AddAddressPoint'] = (e) => {
           
                    openModal({
                        title: "Neuer Adresspunkt",
                        children: <CreateAddressPointForm lat={e.lngLat.lat} lng={e.lngLat.lng} />
                    })
                
            }
            } else {
                document.getElementsByClassName("mapboxgl-canvas")[0].style.cursor = "grab"
                
                delete mapClickBindings.value['AddAddressPoint']
            }
        })

   
       
    }, [])
    return <>

    </>
}

const epsgeur = '+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs'

export const CreateAddressPointForm = ({ lat, lng }) => {



    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        const data = new FormData(e.target)
        const obj = {}
        for (const [key, value] of data.entries()) {
            obj[key] = value
        }
        const projected = proj4(epsgeur, [lng, lat])
        obj.x = projected[0]
        obj.y = projected[1]
        obj.benutzer = decoded?.data?.email
        postAddressPoint(dropvalue.value, obj).then(() => {
            setLoading(false)
            showNotification({
                title: "Adresspunkt erstellt",
                message: "Der Adresspunkt wurde erfolgreich erstellt",
                color: "teal",
                icon: <IconCheck />,
                position: "br",
                autoClose: 5000,
            })
            addAddressPoint.value = false
            closeAllModals()
        }).catch((e) => {
            setLoading(false)
            showNotification({
                title: "Fehler",
                message: "Der Adresspunkt konnte nicht erstellt werden",
                color: "red",
                icon: <IconX />,
                position: "br",
                autoClose: 5000,
            })
            
            setError(e?.response?.data?.message || e.message)
        })


    }
   
    const decoded = jwtDecode(sessionStorage.getItem(appConfig.sessionStorageKey) || sessionStorage.getItem(appConfig.sessionStorageKeyWebview))
    

    return (
        <div>
            <form onSubmit={onSubmit} style={{ width: "100%" }}>
                <div className="flex">
                    <TextInput name="stn" label="Straße" required flex={6} style="width:60%" />
                    <TextInput name="hnr" label="Hausnummer" required mx={4} type="number" flex={2.5} maxLength={3} style="width:25%"/>
                    <TextInput name="hnrz" label="Zusatz" flex={1.5} maxLength={2}  style="width:15%"/>
                </div>
                <div className="flex">
                <TextInput name="plz" label="Plz" required />
                <TextInput name="ort" label="Ort" required ml={4} />
                </div>
                <TextInput name="ott" label="Ortsteil"  />
                <TextInput name="anz_hh" label="Anzahl der Haushalte" required type="number"/>
                <TextInput name="anz_gew" label="Anzahl der Firmen" required type="number"/>
                <NativeSelect name="status" label="Wird beplant" data={[{ value: 1, label: "ja (Anschluss prüfen)" }, { value: 2, label: "ja" }, { value: 3, label: "nein (Anschluss geprüft)" }, { value: 4, label: "nein" }, { value: 5, label: "inexistente Adresse" }]} />
                <NativeSelect name="status_bemerkung" label="Begründung keine Beplanung" required data={[{ value: 1, label: "Keine Auswahl" },{ value: 2, label: "Plan-Versorgung laut Ortskenntnis" }, { value: 3, label: "Ist-Versorgung laut Ortskenntnis" }, { value: 4, label: "Kein relevanter Standort" }, { value: 5, label: "Sonstige" }]} />
                <Textarea name="status_bemerkung_sonstiges" label="Sonstige Bemerkung zur Beplanung"  />
                <NativeSelect name="anmerkung_adresse" label="Anmerkung Adresse" required data={[{ value: 0, label: "Keine Auswahl" },{ value: 1, label: "Baulücke" }, { value: 2, label: "Baugrundstück" }, { value: 3, label: "Bildungsstätte" }, { value: 4, label: "Gewerbe" }, { value: 5, label: "Freizeit" }, { value: 6, label: "Funkmast" }, { value: 7, label: "Tourismus" }, { value: 8, label: "Veranstaltungsort" }, { value: 9, label: "Versorgungseinheit" }, { value: 10, label: "Verwaltung" }, { value: 11, label: "Wohnhaus" }, { value: 12, label: "Sonstiges" }, { value: 13, label: "WLAN-Standort" }, { value: 14, label: "Wohn- und Gewerbestandort" }, { value: 15, label: "ÖPNV-Haltstellen / Vekehrsanlage" }]} />
               
                {
                    error && <div className="text-red-500 my-1 text-xs">{error}</div>
                }
                <Button type="submit" variant="outline" fullWidth my={'xs'}
                    disabled={loading}
                    loading={loading}
                >Speichern</Button>
            </form>
        </div>
    )
}

export const showEditAddressPointForm = async (id) => {
   editControlLoading.value = true
   getAddressPointDetails(dropvalue.value, id)
   .then((res) => {
    editControlLoading.value = false
        openModal({
            title: "Adresspunkt bearbeiten",
            children: <EditAddressPointForm prevdata={{ ...res.data, id }} />
        })
    })
   .catch((e) => {
        showNotification({
            title: "Fehler",
            message: "Der Adresspunkt konnte nicht geladen werden",
            color: "red",
            icon: <IconX />,
            position: "br",
            autoClose: 5000,
        })
    })
   
}

export const EditAddressPointForm = ({ prevdata }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const onSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        const data = new FormData(e.target)
        const obj = prevdata
        for (const [key, value] of data.entries()) {
            obj[key] = value
        }
        obj.benutzer = decoded?.data?.email
        updateAddressPoint(dropvalue.value, prevdata?.id, obj).then((res) => {
            setLoading(false)
            showNotification({
                title: "Erfolg",
                message: "Der Adresspunkt wurde erfolgreich bearbeitet",
                color: "teal",
                icon: <IconCheck />,
                position: "br",
                autoClose: 5000,
            })
            addAddressPoint.value = false
            closeAllModals()
        }).catch((e) => {
            setLoading(false)
            showNotification({
                title: "Fehler",
                message: "Der Adresspunkt konnte nicht bearbeitet werden",
                color: "red",
                icon: <IconX />,
                position: "br",
                autoClose: 5000,
            })
            setError(e?.response?.data?.message || e.message)
        })
    }

        
    return (
        <div>
            <form style={{ width: "100%" }} onSubmit={onSubmit}>
                <Text style="display:inline-block">ID: {prevdata?.id}</Text>
                <div className="flex">
                <TextInput name="stn" label="Straße" required defaultValue={prevdata?.stn} style="width:60%"/>    
                <TextInput name="hnr" label="Hausnummer" required mx={4} type="number" defaultValue={prevdata?.hnr} style="width:25%" maxLength={3} />
                <TextInput name="hnrz" label="Zusatz" defaultValue={prevdata?.hnrz} style="width:15%" maxLength={2}/>
                </div>
                <div className="flex">
                <TextInput name="plz" label="Plz" required defaultValue={prevdata?.plz} />
                <TextInput name="ort" label="Ort" required ml={4} defaultValue={prevdata?.ort} />
                </div>
                <TextInput name="ott" label="Ortsteil" defaultValue={prevdata?.ott} />
                <TextInput name="anz_hh" label="Anzahl der Haushalte" required type="number" defaultValue={prevdata?.anz_hh} />
                <TextInput name="anz_gew" label="Anzahl der Firmen" required type="number" defaultValue={prevdata?.anz_gew} />
                <NativeSelect name="status" label="Wird beplant" data={[{ value: 1, label: "ja (Anschluss prüfen)" }, { value: 2, label: "ja" }, { value: 3, label: "nein (Anschluss geprüft)" }, { value: 4, label: "nein" }, { value: 5, label: "inexistente Adresse" }]} defaultValue={prevdata?.status} />
                <NativeSelect name="status_bemerkung" label="Begründung keine Beplanung" required data={[{ value: 1, label: "Keine Auswahl" }, { value: 2, label: "Plan-Versorgung laut Ortskenntnis" }, { value: 3, label: "Ist-Versorgung laut Ortskenntnis" }, { value: 4, label: "Kein relevanter Standort" }, { value: 5, label: "Sonstige" }]} defaultValue={prevdata?.status_bemerkung} />
                <Textarea name="status_bemerkung_sonstiges" label="Sonstige Bemerkung zur Beplanung" defaultValue={prevdata?.status_bemerkung_sonstiges} />
                <NativeSelect name="anmerkung_adresse" label="Anmerkung Adresse" required data={[{ value: 0, label: "Keine Auswahl" }, { value: 1, label: "Baulücke" }, { value: 2, label: "Baugrundstück" }, { value: 3, label: "Bildungsstätte" }, { value: 4, label: "Gewerbe" }, { value: 5, label: "Freizeit" }, { value: 6, label: "Funkmast" }, { value: 7, label: "Tourismus" }, { value: 8, label: "Veranstaltungsort" }, { value: 9, label: "Versorgungseinheit" }, { value: 10, label: "Verwaltung" }, { value: 11, label: "Wohnhaus" }, { value: 12, label: "Sonstiges" }, { value: 13, label: "WLAN-Standort" }, { value: 14, label: "Wohn- und Gewerbestandort" }, { value: 15, label: "ÖPNV-Haltstellen / Vekehrsanlage" }]} defaultValue={prevdata?.anmerkung_adresse} />

                {
                    error && <div className="text-red-500 my-1 text-xs">{error}</div>
                }
                <Button type="submit" variant="outline" fullWidth my={'xs'}
                    disabled={loading}
                    loading={loading}
                >Speichern</Button>
            </form>
        </div>

    )
}