import { Suspense, useEffect, useState } from 'preact/compat';

import { GeolocateControl, Map, ScaleControl } from 'react-map-gl';
import maplibreGl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import { signal } from '@preact/signals';
import MapControls from '../../private/Admin/Map/MapControls';
import SearchControl from '../../private/Admin/Map/SearchControl';

import DataTiles, { visibility } from '../../private/Admin/Map/DataTiles';
import { Boundary } from '../../private/Admin/Dashboard/Submap';

import AddressPoints from '../../private/Admin/Map/AddressPoints';
import InfoCard, { infoCardVal } from '../../private/Admin/Map/InfoCard';
import { LoadingOverlay } from '@mantine/core';
import Popup from '../../private/Admin/Map/Popup';
import Photos from '../../private/Admin/Map/Photos';
import Gpx from '../../private/Admin/Map/Gpx';
import { mapStyle } from '../../private/Admin/Map/Map';

export default () => {
  const [basemap , setBasemap] = useState('https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json')
  useEffect(() => {
    mapStyle.subscribe(setBasemap)
  }, [])
  const handleMapClick = (event) => {
    const features = event.features;

    // post message to parent latlng
    window.parent.postMessage({ latlng: event.lngLat }, '*');

    if (features) {

      infoCardVal.value = features
    }
  };

  return (
    <Map

      onClick={handleMapClick}
      attributionControl={false}
      mapLib={maplibreGl}
      mapStyle={basemap}
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
      <Suspense fallback={<LoadingOverlay visible />}>

        <AddressPoints />
        <SearchControl nohead />
        <GeolocateControl positionOptions={{enableHighAccuracy: true}} trackUserLocation={true} style={{
          marginTop: '20px',
          color: 'white',
          borderRadius: '50%',
          scale: '1.5',
          fill: 'white',
          marginRight: '20px',
        }}/>
        <ScaleControl position='bottom-left' maxWidth={100} unit='metric' />
        <Gpx />
        <InfoCard />
        <Photos />
        <DataTiles ags />
        <Boundary noFill />
        <Popup />
      </Suspense>
    </Map>
  );



}

