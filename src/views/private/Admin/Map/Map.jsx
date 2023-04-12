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
import Netzplanning from './Netzplanning';
import DistrictPhase from './DistrictPhase';


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
      reuseMaps
      onClick={handleMapClick}
        attributionControl={false}
      mapLib={maplibreGl}
      mapStyle={basemap}
      trackResize={true}
      antialias={true}
      optimizeForTerrain={true}
      workerCount={4}
      flex={3}
      refreshExpiredTiles={true}
      style={{ width: '100%', height: '100%' }}
      initialViewState={{
        longitude: 7.785873,
        latitude: 50.614182,
        zoom: 5,

      }}
      interactiveLayerIds={interactiveLayerIds}
         transformRequest={(url, resourceType) => {
            if(url.includes('https://dim-tileserver-dev.hiwifipro.com/data/')) {
              //  add Authorization header to requests for tiles from the Tileserver
                return {
                    url: url,
                    headers: {
                      "Authorization" :`Bearer ${sessionStorage.getItem('hf8f8fj3dj193jf913fj91f91jf9')}`
                    }
                  }
  
            }
        }}
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
        {/* <Netzplanning /> */}
        <DistrictPhase grouped />
        </Suspense>
    </Map>
  );



}

