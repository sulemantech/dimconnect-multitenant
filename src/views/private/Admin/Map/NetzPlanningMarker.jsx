
import { ActionIcon, Button, Divider, LoadingOverlay, Menu, SegmentedControl } from "@mantine/core"
import { IconEye, IconBarrierBlock, IconRoad, IconTools, IconDownload, IconInfoCircle } from "@tabler/icons"
import { closeAllModals, openModal } from "@mantine/modals"
import { useState, useEffect, useMemo } from "preact/hooks"
import { useDidUpdate } from "@mantine/hooks"
import { Layer, Marker, Source } from "react-map-gl"
import proj4 from "proj4"
import * as turf from "@turf/turf"
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, usePDF, PDFViewer, } from '@react-pdf/renderer';
import React from "react"
import { BarrierState, dropvalue, mapSignal, roadandwaterstate,  districts, regionCostState, mapClickBindings, costInputParams, netzplanning } from "../../../../signals"
import { FabClass } from "../../../../layout"
import { getBoundaries, getCostInfoByDistrictId, getEquipment } from "../../../../api"
import { IconWorldDollar } from "@tabler/icons-react"

import GeoCodingOSM from "geocoding-osm"
import { CostInfoModalContent, CableTable, CostInfoSettings, DuctTable, HomeActivationTable, generatePDF } from "../Dashboard/CostInfo"
import { showNotification } from "@mantine/notifications"






const availableLegende = {
    5: "KollSch",
    6: "PoP",
    10: "Nvt"
}


 export const NetzPlanningMarker = () => {
    const [visible, setVisible] = useState(false)
    const [map, setMap] = useState(null)
    const [data, setData] = useState(null)
    const [ags, setAgs] = useState(null)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        netzplanning.subscribe(setVisible)
        mapSignal.subscribe((value) => {
            if (!value) return
            setMap(value)


            // if(netzplanning.value["1"]==true){
            value.loadImage('/icons/square.png', (error, image) => {
                if (error) throw error;
                value.addImage('KollSch', image);
            })
        // }
            // if(netzplanning.value["2"]==true){
            value.loadImage('/icons/house.png', (error, image) => {
                if (error) throw error;
                value.addImage('PoP', image);
            })
        // }
            // if (netzplanning.value["3"]==true){
            value.loadImage('/icons/triangle.png', (error, image) => {
                if (error) throw error;
                value.addImage('Nvt', image);
            })
        // }
        })
        dropvalue.subscribe(setAgs)
    }, [])
    useDidUpdate(() => {
        if (!visible) return
        if (!data?.[ags]) {

            if (!districts.value.hasOwnProperty('features')) return
            setLoading(true)

            const dd = districts.value?.features?.find(district => district.properties?.c == ags)
            const bboxDD = turf.bbox(dd)
            const epsgeur = '+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs'
            const epsg4326 = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs'

            const bboxDD4326 = proj4(epsg4326, epsgeur, [bboxDD[0], bboxDD[1]]).concat(proj4(epsg4326, epsgeur, [bboxDD[2], bboxDD[3]]))

            const [minX, minY, maxX, maxY] = bboxDD4326

            getEquipment(ags, minX, minY, maxX, maxY).then(res => {


                setData((prev) => ({ ...prev, [ags]: res.data }))
                setLoading(false)
            })
        }
    }, [visible, ags])


    if (loading) return <LoadingOverlay visible />
    if (!visible) return null
  
    const geojson = useMemo(() => {
        if (!data?.[ags]) return null
        const features = Object.keys(data?.[ags] ?? {}).map((key, index) => {
            return data?.[ags]?.[key]?.data?.map((coordinates) => {
                return {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates
                    },
                    properties: {
                        legende: availableLegende[data?.[ags]?.[key]?.id],
                    }
                }
            })
        }).flat()
        console.log("features",features)
        return {
            type: "FeatureCollection",
            features
        }
    })

    return (
        <Source id="netzplanningmarker" type="geojson" data={geojson}>
            <Layer id="netzplanningmarker" type="symbol" layout={{
                "icon-image": ["get", "legende"],
                "icon-size": 0.9,
                "icon-allow-overlap": false
            }}
                // beforeId="addressPoints"
            />
        </Source>
    )
}
// export default NetzPlanningMarker;