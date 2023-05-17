import React, { useState } from 'react';
import { Map, Source, Layer, useMap } from 'react-map-gl';
import maplibreGl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { districts } from '../../../../app';
import { dropvalue } from '../../../../layout/Header';
import {  route } from 'preact-router';
import { useEffect } from 'preact/hooks';


export default () => {

  return (
    <Map

 
        attributionControl={false}
      mapLib={maplibreGl}
      mapStyle={'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'}
      trackResize={true}
      flex={3}
      style={{ width: '100%', height: '90%' }}
      initialViewState={{
        longitude: 7.785873,
        latitude: 50.614182,
        zoom: 5,

      }}
        onClick={(e) => {
          route(`/map/${dropvalue.value}${window.location.hash}`)
        }}
        transformRequest={(url, resourceType) => {
            if(url.includes('https://dim-tileserver-dev.hiwifipro.com/data/')) {
                return {
                    url: url,
                    headers: {
                        'Authorization' :`Bearer ${sessionStorage.getItem(a.sessionStorageKey)}`
                    }
                }
            }
        }}
    >
        
        <Boundary />

    </Map>
  );
}

export const Boundary = ({noFill=false}) => {
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
        }, new maplibreGl.LngLatBounds(geometry[0], geometry[0]));
        if(window.location.hash) return
        map.fitBounds(bounds, { padding: noFill ? 100 : 10 });
    })
    }, [districts.value])

    return (
        <Source id="boundary" type="geojson" data={bound}>
            <Layer
                id="boundary"
                type="line"
                paint={{
                    'line-color': '#0071b9',
                    'line-width': !noFill ? 2 : 0,
                }}
            />
            {!noFill &&
            <Layer
                id="boundary-fill"
                type="fill"
                paint={{
                    'fill-color': '#0071b9',
                    'fill-opacity': 0.1,
                }}
            />
            }
        </Source>
    )
}
