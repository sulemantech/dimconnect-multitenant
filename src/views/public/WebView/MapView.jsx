import { Suspense } from 'preact/compat';

import { Map, ScaleControl } from 'react-map-gl';
import maplibreGl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import { signal } from '@preact/signals';
import MapControls from '../../private/Admin/Map/MapControls';
import SearchControl from '../../private/Admin/Map/SearchControl';

import DataTiles,{visibility} from '../../private/Admin/Map/DataTiles';
import { Boundary } from '../../private/Admin/Dashboard/Submap';

import AddressPoints from '../../private/Admin/Map/AddressPoints';
import InfoCard,{infoCardVal} from '../../private/Admin/Map/InfoCard';
import { LoadingOverlay } from '@mantine/core';
import Popup from '../../private/Admin/Map/Popup';


export const mapStyle = signal('https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json')

export default () => {

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
      <Suspense fallback={<LoadingOverlay visible />}>
        
        <AddressPoints />
       <SearchControl />
        <MapControls />
        <ScaleControl position='bottom-right' maxWidth={200} unit='metric' />
        {/* <CustomLayerPanel /> */}
        <InfoCard />
        
        <DataTiles ags/>
        <Boundary noFill/>
        <Popup />
        </Suspense>
    </Map>
  );



}

