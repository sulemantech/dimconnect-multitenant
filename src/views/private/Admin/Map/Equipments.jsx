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
import { BarrierState, dropvalue, mapSignal, roadandwaterstate, equipmentState, districts, regionCostState, mapClickBindings, costInputParams, netzPlanningStatusVisibility } from "../../../../signals"
import { FabClass } from "../../../../layout"
import { getBoundaries, getCostInfoByDistrictId, getEquipment } from "../../../../api"
import { IconWorldDollar } from "@tabler/icons-react"

import GeoCodingOSM from "geocoding-osm"
import { CostInfoModalContent, CableTable, CostInfoSettings, DuctTable, HomeActivationTable, generatePDF } from "../Dashboard/CostInfo"
import { showNotification } from "@mantine/notifications"
import { status } from './../Dashboard/Tickets';


const availableLegende = {
    5: "KollSch",
    6: "PoP",
    10: "Nvt"
}
export const Equipments = () => {
    const [visible, setVisible] = useState(false)
    const [map, setMap] = useState(null)
    const [data, setData] = useState(null)
    const [ags, setAgs] = useState(null)
    const [loading, setLoading] = useState(false)
    
    const [equipmentData, setEquipmentData] = useState({
        "5": [],
        "6": [],
        "10": [],
    });

    const [netzPlanningStatusVisibilityState, setnetzPlanningStatusVisibilityState] = useState({
        "5": true,
        "6": true,
        "10": true,
    });

    useEffect(() => {
        getEquipment(ags, minX, minY, maxX, maxY).then(res => {
            setData(res.data)
        })
        console.log('netzPlanningStatusVisibility:', netzPlanningStatusVisibility);
        equipmentState.subscribe(setVisible)
        netzPlanningStatusVisibility.subscribe((val) => {
            setnetzPlanningStatusVisibilityState(val)
        })
        mapSignal.subscribe((value) => {
            if (!value) return
            setMap(value)
            value.loadImage('/icons/square.png', (error, image) => {
                if (error) throw error;
                value.addImage('KollSch', image);
            });
            value.loadImage('/icons/house.png', (error, image) => {
                if (error) throw error;
                value.addImage('PoP', image);
            })
            value.loadImage('/icons/triangle.png', (error, image) => {
                if (error) throw error;
                value.addImage('Nvt', image);
            })
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
            return data?.[key]?.data?.map((coordinates) => {
                return {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates
                    },
                    properties: {
                        legende: availableLegende[data?.[key]?.id],
                        status:key
                    }
                }
            })
        }).flat()
        return {
            type: "FeatureCollection",
            features
        }
    })

    return (
        <Source id="equipments" type="geojson" data={geojson}>
            <Layer id="equipments" type="symbol" layout={{
                "icon-image": ["get", "legende"],
                "icon-size": 0.9,
                "icon-allow-overlap": false
            }}
            filter={['in', 'status', ...Object.entries(netzPlanningStatusVisibilityState).filter(([key, value]) => value).map(([key, value]) => key)]}

                beforeId="addressPoints"
            />
        </Source>
    )
}