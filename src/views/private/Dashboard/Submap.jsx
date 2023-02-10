import React, { useState, useRef, useEffect } from 'react';
import { Map, Marker, Source, Layer, ScaleControl, useMap } from 'react-map-gl';
import maplibreGl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { districts } from '../../../app';
import { dropvalue } from '../../../layout/Header';


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
        zoom: 18,

      }}
      
    >
        
        <Boundary />

    </Map>
  );
}

const Boundary = () => {
    const [bound, setBound] = useState(null)
    const map = useMap()?.current

    useEffect(() => {
        if (!map) return
        if (!districts.value.hasOwnProperty('features')) return
        console.log(districts.value.features[0])
        const dd = districts.value?.features?.find(district => district.properties?.c == dropvalue.value)
        console.log(dd)
    }, [dropvalue.value,districts.value])

    return (
        <Source id="boundary" type="geojson" data={bound}>
            <Layer
                id="boundary"
                type="line"
                paint={{
                    'line-color': '#0071b9',
                    'line-width': 3,
                }}
            />
        </Source>
    )
}
