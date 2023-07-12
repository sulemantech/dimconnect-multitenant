import { useEffect, useState } from "preact/hooks"
import { Layer, Source } from "react-map-gl"

import { getDistrictPhase } from "../../../../api"
import { DistrictPhaseLayersVisibility, DistrictPhaseVisibility } from "../../../../signals"

let statuses = {
    1: 'Onboarding',
    2: 'APV: Validierung durch TRC',
    3: 'APV: Validierung durch Kommune',
    4: 'NPV: Netzplanaufbereitung durch TRC',
    5: 'NPV: Netzplanaufbereitung durch Kommune',
    6: 'Finalisierung Netzdetailplanung durch TRC',
    7: 'Finalisierung Netzdetailplanung durch Kommune',
}


export default ({ id = false, grouped = false }) => {
    const [data, setData] = useState({})
    const [visible, setVisible] = useState(false)
    const [layersVisible, setLayersVisible] = useState({})
    useEffect(() => {
        getDistrictPhase().then(({ data }) => {

            const parsed = data[0].map(({ json }) => {
                const { geometry, properties } = json
                properties.phase = statuses[properties.phase]

                return {
                    geometry: JSON.parse(geometry),
                    properties
                }
            })

            let geojson = {
                type: "FeatureCollection",
                features: parsed.filter(feature => feature.geometry.coordinates[0] !== undefined)
            }


            setData(geojson)
        })
        DistrictPhaseVisibility.subscribe(setVisible)
        DistrictPhaseLayersVisibility.subscribe(setLayersVisible)
    }
        , [])
    return (
        <>
            {
                (data.features && visible) && (
                    <Source id="district-phase" type="geojson" data={data}>
                        <Layer
                            id="district-phase-layer"
                            type="fill"
                            paint={{
                                "fill-color": [
                                    "match",
                                    ["get", "status"],
                                    "Finalisierung Netzdetailplanung durch TRC", "orange",
                                    "Abgeschlossen", "#c6efce",
                                    "Noch nicht begonnen", "#808080",
                                    "NPV: Netzplanaufbereitung durch TRC", "#ffeb9c",
                                    'grey'
                                ],
                                "fill-opacity": 0.5
                            }}
                            filter={["in", "status", ...Object.keys(layersVisible).filter(key => layersVisible[key])]}
                            beforeId="waterway"
                        />
                        <Layer
                            id="district-phase-layer-line"
                            type="line"
                            paint={{
                                "line-color": "orange",
                                "line-width": 1,
                                "line-opacity": 0.6
                            }}
                            filter={["in", "status", ...Object.keys(layersVisible).filter(key => layersVisible[key])]}
                            beforeId="waterway"
                        />
                        <Layer
                            minzoom={8}
                            id="district-phase-layer-text"
                            type="symbol"
                            layout={{
                                "text-field": '{phase}',

                                "text-size": 12,
                                "text-offset": [0, 0.6],
                                "text-anchor": "top"
                            }}
                            paint={{
                                "text-color": "blue",
                                "text-halo-color": "white",
                                "text-halo-width": 1

                            }}
                            filter={["in", "status", ...Object.keys(layersVisible).filter(key => layersVisible[key])]}
                        />
                    </Source>
                )
            }
        </>
    )
}