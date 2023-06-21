import { Suspense, lazy, useEffect, useState } from 'preact/compat';
import { Map, ScaleControl } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import { LoadingOverlay } from '@mantine/core';

import MapControls from './MapControls';
import SearchControl from './SearchControl';

import DataTiles from './DataTiles';
import { Boundary } from '../Dashboard/Submap';
import AddressPoints, { CRUDAddressPoint } from './AddressPoints'
import InfoCard from './InfoCard';
import Popup from './Popup';
import Photos from './Photos';
import DistrictPhase from './DistrictPhase';
import appConfig from '../../../../config/appConfig';

const Gpx = lazy(() => import('./Gpx'));

import { mapClickBindings,addressPointsCRUDstate ,infoCardVal,visibility,mapStyle,additionalInteractiveLayers, mapSignal, regionCostState} from '../../../../signals';
import ExtraViewables from './ExtraViewables';

let mapFirstRender = false

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
   
    if (addressPointsCRUDstate.value !== '' || regionCostState.value !== false) return
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
      mapLib={maplibregl}
      mapStyle={basemap}
      trackResize={true}
      onMoveEnd={({ target }) => {
        window.location.hash = `${target.getZoom()}/${target.getCenter().lng}/${target.getCenter().lat}`
      }}
      onRender={({ target }) => {
        if (!mapFirstRender) {
          if(window.location.hash.split('/').length === 3){
            const [zoom,lng,lat] = window.location.hash.split('/')
            
            target.setZoom(parseFloat(zoom.replace('#','')))
            target.setCenter([parseFloat(lng),parseFloat(lat)])
          }
        console.log('map loaded')
        mapSignal.value = target
        mapFirstRender = true
        }
      }}
      antialias={true}
      optimizeForTerrain={true}
      
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
        <ExtraViewables />
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

