import { Button, NativeSelect, ScrollArea, TextInput, Textarea } from "@mantine/core"
import { closeAllModals, openModal } from "@mantine/modals"
import { showNotification } from "@mantine/notifications"
import { IconCheck, IconX } from "@tabler/icons"
import jwtDecode from "jwt-decode"
import { useEffect, useMemo, useState } from "preact/hooks"
import proj4 from "proj4"
import { Layer, Source } from "react-map-gl"

import appConfig from "../../../../config/appConfig"

import { getAddressPointDetails, getAddressPointStatus, postAddressPoint, updateAddressPoint } from "../../../../api"
import { addressPointsCRUDstate, addressPointsReceived, addressPointsStatusVisibility, addressPointsVisibility, dropvalue, editControlLoading, mapClickBindings } from "../../../../signals"


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
                    cluster={true}
                    clusterMaxZoom={14}
                    clusterRadius={50}
                    clusterMinPoints={20}
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

                                15, 3,
                                22, 15
                            ],
                            "circle-stroke-color": "white",
                            "circle-stroke-width": [
                                "interpolate",
                                ["linear"],
                                ["zoom"],
                                0, 0.1,
                                10, 0.1,
                                15, 1,
                                22, 2
                            ],
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
                            ],

                        }}
                        layout={{
                            "visibility": "visible"


                        }}
                        filter={['in', 'status', ...Object.entries(addressPointsStatusVisibilityState).filter(([key, value]) => value).map(([key, value]) => key)]}

                    />
                    <Layer
                        id="addressPointsCluster"
                        type="circle"
                        source="addressPoints"
                        filter={['has', 'point_count']}
                        paint={{

                            'circle-color': '#0E76BB',
                            'circle-radius': ['step', ['get', 'point_count'], 10, 100, 20, 750, 30]

                        }}
                        layout={{
                            "visibility": "visible"
                        }}
                    />
                    <Layer
                        id="addressPointsClusterCount"
                        type="symbol"
                        source="addressPoints"
                        filter={['has', 'point_count']}
                        layout={{
                            "text-field": "{point_count_abbreviated}",
                            // "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
                            "text-size": 12,
                            "visibility": "visible"
                        }}
                        paint={{
                            "text-color": "white"
                        }}
                    />
                </Source>
            }
        </>

    )
}






export const CRUDAddressPoint = () => {


    useEffect(() => {


        addressPointsCRUDstate.subscribe(val => {

            if (val !== '') {

                document.getElementsByClassName("mapboxgl-canvas")[0].style.cursor = val == 'edit' ? "pointer" : "crosshair"
                mapClickBindings.value['CRUDAddressPoint'] = (e) => {
                    e.preventDefault()
                    if (val == 'edit' && !editControlLoading.value) {
                        let filtered = e.features.filter((feature) => feature.layer.id === 'addressPoints')
                        if (filtered.length == 0) return
                        editControlLoading.value = true
                        const id = filtered[0].properties.id
                        getAddressPointDetails(dropvalue.value, id)
                            .then((res) => {
                                editControlLoading.value = false
                                openModal({
                                    title: `Adresspunkt bearbeiten | ID ${id}`,
                                    children: <CRUDAddressPointForm prevdata={{ ...res.data, id }} edit />
                                })
                            })
                            .catch((e) => {
                                console.error(e)
                                editControlLoading.value = false
                                showNotification({
                                    title: "Fehler",
                                    message: "Der Adresspunkt konnte nicht geladen werden",
                                    color: "red"
                                })
                            })
                    } else if (val == 'add') {

                        openModal({
                            title: "Neuer Adresspunkt",
                            children: <CRUDAddressPointForm lat={e.lngLat.lat} lng={e.lngLat.lng} add />
                        })
                    }

                }
            } else {
                document.getElementsByClassName("mapboxgl-canvas")[0].style.cursor = "grab"

                delete mapClickBindings.value['CRUDAddressPoint']
            }

        })



    }, [])
    return <>

    </>
}

const epsgeur = '+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs'


export const CRUDAddressPointForm = ({ prevdata, edit = false, add = false, lat, lng }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const decoded = jwtDecode(localStorage.getItem(appConfig.localStorageKey) || localStorage.getItem(appConfig.localStorageKeyWebview))

    const onSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        const data = new FormData(e.target)
        const obj = prevdata || {}
        for (const [key, value] of data.entries()) {
            obj[key] = value
        }

        if (add) {
            const projected = proj4(epsgeur, [lng, lat])
            obj.x = projected[0]
            obj.y = projected[1]
        }

        obj.benutzer = decoded?.data?.email

        if (edit) {
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
        if (add) {
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
                addressPointsCRUDstate.value = ''
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
    }


    return (
        <ScrollArea >
            <div >
                <form className="w-[98%]" onSubmit={onSubmit}>

                    <div className="flex">
                        <TextInput name="stn" label="Straße" mx={2} required defaultValue={prevdata?.stn} className="flex-[2]" />
                        <TextInput name="hnr" label="Nr" mx={2} required type="number" defaultValue={prevdata?.hnr} className="flex-1" maxLength={3} />
                        <TextInput name="hnrz" label="Zusatz" mx={2} defaultValue={prevdata?.hnrz} className="flex-1" maxLength={2} />
                    </div>
                    <div className="flex">
                        <TextInput name="plz" label="Plz" mx={2} required className="flex-[1.4]" defaultValue={prevdata?.plz} />
                        <TextInput name="ort" label="Ort" mx={2} required className="flex-[2]" defaultValue={prevdata?.ort} />
                        <TextInput name="ott" label="Ortsteil" mx={2} className="flex-[1.2]" defaultValue={prevdata?.ott} />
                    </div>
                    <div className="flex">
                        <TextInput name="anz_hh" label="Anzahl der Haushalte" mx={2} required type="number" defaultValue={prevdata?.anz_hh} size="xs" className="flex-1" />
                        <TextInput name="anz_gew" label="Anzahl der Firmen" mx={2} required type="number" defaultValue={prevdata?.anz_gew} size="xs" className="flex-1" />
                    </div>
                    <NativeSelect name="status" label="Wird beplant" mx={2} data={[{ value: 1, label: "ja (Anschluss prüfen)" }, { value: 2, label: "ja" }, { value: 3, label: "nein (Anschluss geprüft)" }, { value: 4, label: "nein" }, { value: 5, label: "inexistente Adresse" }]} defaultValue={prevdata?.status} />
                    <NativeSelect name="status_bemerkung" mx={2} label="Begründung keine Beplanung" required data={[{ value: 1, label: "Keine Auswahl" }, { value: 2, label: "Plan-Versorgung laut Ortskenntnis" }, { value: 3, label: "Ist-Versorgung laut Ortskenntnis" }, { value: 4, label: "Kein relevanter Standort" }, { value: 5, label: "Sonstige" }]} defaultValue={prevdata?.status_bemerkung} />
                    <Textarea name="status_bemerkung_sonstiges" mx={2} label="Sonstige Bemerkung zur Beplanung" defaultValue={prevdata?.status_bemerkung_sonstiges} />
                    <NativeSelect name="anmerkung_adresse" mx={2} label="Anmerkung Adresse" required data={[{ value: 0, label: "Keine Auswahl" }, { value: 1, label: "Baulücke" }, { value: 2, label: "Baugrundstück" }, { value: 3, label: "Bildungsstätte" }, { value: 4, label: "Gewerbe" }, { value: 5, label: "Freizeit" }, { value: 6, label: "Funkmast" }, { value: 7, label: "Tourismus" }, { value: 8, label: "Veranstaltungsort" }, { value: 9, label: "Versorgungseinheit" }, { value: 10, label: "Verwaltung" }, { value: 11, label: "Wohnhaus" }, { value: 12, label: "Sonstiges" }, { value: 13, label: "WLAN-Standort" }, { value: 14, label: "Wohn- und Gewerbestandort" }, { value: 15, label: "ÖPNV-Haltstellen / Vekehrsanlage" }]} defaultValue={prevdata?.anmerkung_adresse} />

                    {
                        error && <div className="text-red-500 my-1 text-xs">{error}</div>
                    }
                    <Button type="submit" fullWidth my={'xs'}
                        disabled={loading}
                        loading={loading}
                    >Speichern</Button>
                </form>
            </div>
        </ScrollArea>

    )
}
