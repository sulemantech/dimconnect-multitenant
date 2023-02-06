
import React, { useState, useRef, useEffect } from 'react';
import { Map, Marker, Source, Layer, ScaleControl } from 'react-map-gl';
import maplibreGl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import { signal } from '@preact/signals';
import MapControls from './MapControls';
import SearchControl from './SearchControl';

import DataTiles from './DataTiles';


export const mapStyle = signal('https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json')

export default () => {

  const [viewport, setViewport] = useState({
    latitude: 3.74565,
    longitude: 44.97306,
    zoom: 12
  });
  const mapRef = useRef(null);

  

  const handleMapClick = (event) => {
    const feature = event.features[0];
    if (feature) {
      const popup = new maplibreGl.Popup({ offset: 15 })
        .setLngLat(feature.geometry.coordinates)
        .setHTML(`<h3>${feature.properties.name}</h3>`)
        .addTo(mapRef.current);
    }
  };

  return (
    <Map
      ref={mapRef}
      onClick={handleMapClick}
        attributionControl={false}
      mapLib={maplibreGl}
      mapStyle={mapStyle.value}
      trackResize={true}
      flex={3}
      style={{ width: '100%', height: '100%' }}
      initialViewState={{
        longitude: 7.785873,
        latitude: 50.614182,
        zoom: 18,

      }}
    
    >
        <SearchControl />
        <MapControls />
        <ScaleControl position='bottom-right' maxWidth={200} unit='metric' />
        {/* <CustomLayerPanel /> */}
        <DataTiles />

    </Map>
  );



}
