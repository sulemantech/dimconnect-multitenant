import { Card, LoadingOverlay } from '@mantine/core';
import maplibregl from 'maplibre-gl';
import { route } from 'preact-router';
import { useEffect, useState } from 'preact/hooks';
import { Layer, Map, Source, useMap } from 'react-map-gl';
import { districts, dropvalue } from '../../../../signals';


export default () => {
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setMounted(true)
        }
            , 1000)
    }, [])
    return (
        <>
            {
                mounted ? <Component /> : <LoadingOverlay visible={true} />
            }
        </>
    )
}

const Component = () => {
    return (
        <Card className="flex-grow flex flex-1 m-2 mt-0 ml-0">

        <Map


attributionControl={false}
mapLib={maplibregl}
            mapStyle={'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'}
            trackResize={true}

            style={{ flex: 1, height: '90%' }}
            initialViewState={{
                longitude: 7.785873,
                latitude: 50.614182,
                zoom: 5,
                
            }}
            onClick={(e) => {
                route(`/map?ags=${dropvalue.value}${window.location.hash}`)
            }}
            transformRequest={(url, resourceType) => {
                if (url.includes('https://dim-tileserver-dev.hiwifipro.com/data/')) {
                    return {
                        url: url,
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem(a.localStorageKey)}`
                        }
                    }
                }
            }}
        >

            <Boundary />

        </Map>
</Card>
    );
}

export const Boundary = ({ noFill = false }) => {
    const [bound, setBound] = useState(null)
    const map = useMap()?.current

    useEffect(() => {
        dropvalue.subscribe((dropvalueValue) => {
            if (!map) return
            if (!districts.value.hasOwnProperty('features')) return
            const dd = districts.value?.features?.find(district => district.properties?.c == dropvalueValue)
            if (dd?.geometry == undefined) return

            setBound(dd)
            const geometry = dd.geometry.type === 'MultiPolygon' ? dd.geometry.coordinates[0][0] : dd.geometry.coordinates[0]
            const bounds = geometry.reduce((bounds, coord) => {
                return bounds.extend(coord);
            }, new maplibregl.LngLatBounds(geometry[0], geometry[0]));

            map.fitBounds(bounds, { padding: noFill ? 100 : 10 });
        })
    }, [districts.value])

    return (
        <Source id="boundary" type="geojson" data={bound}>
            <Layer
                id="boundary"
                type="line"
                paint={{
                    'line-color': '#0E76BB',
                    'line-width': !noFill ? 2 : 0,
                }}
            />
            {!noFill &&
                <Layer
                    id="boundary-fill"
                    type="fill"
                    paint={{
                        'fill-color': '#0E76BB',
                        'fill-opacity': 0.1,
                    }}
                />
            }
        </Source>
    )
}
