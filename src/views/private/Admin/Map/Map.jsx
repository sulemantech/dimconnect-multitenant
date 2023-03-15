import { Suspense, lazy, useEffect, useState } from 'preact/compat';

import { Map, ScaleControl } from 'react-map-gl';
import maplibreGl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import { signal } from '@preact/signals';
import MapControls from './MapControls';
import SearchControl from './SearchControl';

import DataTiles, { visibility } from './DataTiles';
import { Boundary } from '../Dashboard/Submap';
const Gpx = lazy(() => import('./Gpx'));
import AddressPoints from './AddressPoints'
import InfoCard, { infoCardVal } from './InfoCard';
import { LoadingOverlay } from '@mantine/core';
import Popup from './Popup';
import Photos from './Photos';


export const mapStyle = signal('https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json')

export default ({children}) => {
  const [basemap , setBasemap] = useState('https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json')
  const [interactiveLayerIds, setInteractiveLayerIds] = useState([])
  useEffect(() => {
    mapStyle.subscribe(setBasemap)
    visibility.subscribe((v) => {
      setInteractiveLayerIds(JSON.parse(v) ? Object.keys(JSON.parse(v)) : [])
    })
  }, [])
  const handleMapClick = (event) => {
    const features = event.features;
    if (features.length > 0) {
      
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
      interactiveLayerIds={interactiveLayerIds}
    >
      <Suspense fallback={<LoadingOverlay visible />}>
        
        <AddressPoints />
       <SearchControl />
        <MapControls />
        <ScaleControl position='bottom-right' maxWidth={200} unit='metric' />
        {/* <CustomLayerPanel /> */}
        <Photos />
        <InfoCard modal={window.innerWidth < 768} />
        <Gpx />
        <DataTiles />
        <Boundary noFill/>
        <Popup />
        </Suspense>
    </Map>
  );



}

