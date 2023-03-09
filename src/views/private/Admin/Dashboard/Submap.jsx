import React, { useState, useRef, useEffect } from 'react';
import { Map, Marker, Source, Layer, ScaleControl, useMap } from 'react-map-gl';
import maplibreGl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { districts } from '../../../../app';
import { dropvalue } from '../../../../layout/Header';
import { route } from 'preact-router';


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
          route('/map')
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
        if (!map) return
        if (!districts.value.hasOwnProperty('features')) return
       
        const dd = districts.value?.features?.find(district => district.properties?.c == dropvalue.value)
        setBound(dd)
        const geometry = dd.geometry.coordinates[0]
        const bounds = geometry.reduce((bounds, coord) => {
            return bounds.extend(coord);
        }, new maplibreGl.LngLatBounds(geometry[0], geometry[0]));
        map.fitBounds(bounds, { padding: noFill ? 100 : 10 });
    }, [dropvalue.value,districts.value])

    return (
        <Source id="boundary" type="geojson" data={bound}>
            <Layer
                id="boundary"
                type="line"
                paint={{
                    'line-color': '#0071b9',
                    'line-width': 0,
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
