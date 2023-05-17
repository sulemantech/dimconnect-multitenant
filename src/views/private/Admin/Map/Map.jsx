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
import AddressPoints, { CRUDAddressPoint, addressPointsCRUDstate } from './AddressPoints'
import InfoCard, { infoCardVal } from './InfoCard';
import { LoadingOverlay } from '@mantine/core';
import Popup from './Popup';
import Photos from './Photos';

import DistrictPhase from './DistrictPhase';
import appConfig from '../../../../config/appConfig';
import { mapClickBindings } from '../../../../app';
import { editControlLoading } from './EditControl';


export const mapStyle = signal('https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json')

export const additionalInteractiveLayers = signal(['addressPoints'])

export default ({ children }) => {
  const [basemap, setBasemap] = useState('https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json')
  const [interactiveLayerIds, setInteractiveLayerIds] = useState([])
  useEffect(() => {
    mapStyle.subscribe(setBasemap)
    visibility.subscribe((v) => {
      setInteractiveLayerIds(JSON.parse(v) ? Object.keys(JSON.parse(v)).concat(additionalInteractiveLayers.value) : [])
    })

  }, [])
  const handleMapClick = (event) => {
    const features = event.features
    // .filter(f => !additionalInteractiveLayers.value.includes(f.layer.id))
    
    Object.values(mapClickBindings.value).forEach((binding) => {
      binding(event)
    })
   
    if (addressPointsCRUDstate.value !== '') return
    if (features.length > 0){
        infoCardVal.value = null
        setTimeout(() => {
       infoCardVal.value = features
        }, 100);
    }

  };
  const handleMaphover = (event) => {
    

  };

  return (
    <Map
      reuseMaps
      onClick={handleMapClick}
      onMouseMove={handleMaphover}
      attributionControl={false}
      mapLib={maplibreGl}
      mapStyle={basemap}
      trackResize={true}
      antialias={true}
      optimizeForTerrain={true}
      workerCount={4}
      flex={3}
      onError={(e) => {}}
      // hash={true}
      refreshExpiredTiles={true}
      style={{ width: '100%', height: '100%' }}
      initialViewState={{
        longitude: parseFloat(window.location.hash.split('/')[1]) || 7.785873,
        latitude: parseFloat(window.location.hash.split('/')[2]) || 50.614182,
        zoom: parseFloat(window.location.hash.split('/')[0].replace("#")) || 5,

      }}
      interactiveLayerIds={interactiveLayerIds}
      transformRequest={(url, resourceType) => {
        if (url.includes('https://dim-tileserver-dev.hiwifipro.com/data/')) {
          //  add Authorization header to requests for tiles from the Tileserver
          return {
            url: url,
            headers: {
              "Authorization": `Bearer ${sessionStorage.getItem(appConfig.sessionStorageKey)}`
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
        <Boundary noFill />
        <Popup />
        {/* <Netzplanning /> */}
        <DistrictPhase grouped />
        <CRUDAddressPoint />
      </Suspense>
    </Map>
  );



}

