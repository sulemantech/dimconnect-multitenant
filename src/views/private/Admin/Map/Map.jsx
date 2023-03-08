import React, { useState, useRef, useEffect } from 'react';
import { Map, Marker, Source, Layer, ScaleControl } from 'react-map-gl';
import maplibreGl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import { signal } from '@preact/signals';
import MapControls from './MapControls';
import SearchControl from './SearchControl';

import DataTiles, { visibility } from './DataTiles';
import { Boundary } from '../Dashboard/Submap';
import Gpx from './Gpx';
import InfoCard, { infoCardVal } from './InfoCard';
import AddressPoints from './AddressPoints';


export const mapStyle = signal('https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json')

export default ({children}) => {

  const handleMapClick = (event) => {
    const features = event.features;
    if (features) {
      
      infoCardVal.value = features
    }
  };

  return (
    <Map
      
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
        zoom: 5,

      }}
      interactiveLayerIds={JSON.parse(visibility.value) ? Object.keys(JSON.parse(visibility.value)) : []}
    >
        <AddressPoints />
       <SearchControl />
        <MapControls />
        <ScaleControl position='bottom-right' maxWidth={200} unit='metric' />
        {/* <CustomLayerPanel /> */}
        <InfoCard />
        <Gpx />
        <DataTiles />
        <Boundary noFill/>
    </Map>
  );



}

