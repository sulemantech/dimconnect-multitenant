import { Suspense, lazy, useEffect, useState } from 'preact/compat';
import { Map, ScaleControl } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import { LoadingOverlay } from '@mantine/core';
import { useRef } from 'preact/hooks';
// import 'maplibre-gl/dist/maplibre-gl.css';

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

import Cookies from 'js-cookie';

const Gpx = lazy(() => import('./Gpx'));

import { mapClickBindings, addressPointsCRUDstate, infoCardVal, visibility, mapStyle, additionalInteractiveLayers, mapSignal, regionCostState, aerialViewVisibility, PRpropertiesVisibility, legendState } from '../../../../signals';
import ExtraViewables from './ExtraViewables';
import PRproperties from './PRproperties';
import AerialViewLayer from './AerialViewLayer';

let mapFirstRender = false

export default ({ children }) => {
  const mapRef = useRef(null);
  const [basemap, setBasemap] = useState('https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json')
  const [interactiveLayerIds, setInteractiveLayerIds] = useState([])

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%'
  });


  useEffect(() => {
    mapStyle.subscribe(setBasemap)
    visibility.subscribe((v) => {
      setInteractiveLayerIds(JSON.parse(v) ? Object.keys(JSON.parse(v)).concat(additionalInteractiveLayers.value) : [])
    })

    const handleResize = () => {
      setViewport(prev => ({
        ...prev,
        width: window.innerWidth,
        height: window.innerHeight
      }));
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };



  }, [])

  const handleMapClick = (event) => {
    if(legendState.value === true){legendState.value = false}
  
    const zoomFactor = 0.8;  // Adjust based on your CSS
  
    // Adjust the event's coordinates
    const adjustedX = event.point[0] / zoomFactor;
    const adjustedY = event.point[1] / zoomFactor;
    event.point = [adjustedX, adjustedY];
  
    const features = event.features; // I assume this still works. If not, you might need to use the adjusted coordinates with map's methods to get features.
  
    Object.values(mapClickBindings.value).forEach((binding) => {
      binding(event); // The event now has the adjusted point.
    });
  
    if (addressPointsCRUDstate.value !== '' || regionCostState.value !== false) return;
    if (features.length > 0) {
      infoCardVal.value = null;
      setTimeout(() => {
        infoCardVal.value = features;
      }, 100);
    }
  };
  const handleMaphover = (event) => {


  };

  // body element is scale down using css zoom property, and mouse click event is not working on map properly, fix this
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.getMap().resize();
    }
  });
  return (
    <Map
    className='map-container'
      reuseMaps
      {...viewport}
      onViewportChange={newViewport => setViewport(newViewport)}
      ref={mapRef}
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
          if (window.location.hash.split('/').length === 3) {
            const [zoom, lng, lat] = window.location.hash.split('/')

            target.setZoom(parseFloat(zoom.replace('#', '')))
            target.setCenter([parseFloat(lng), parseFloat(lat)])
          }
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
              "Authorization": `Bearer ${Cookies.get(appConfig.localStorageKey)}`
            }
          }

        }
      }}
    >
      <Suspense fallback={<LoadingOverlay visible />}>

        {PRpropertiesVisibility.value && <PRproperties />}
        { aerialViewVisibility.value && <AerialViewLayer />}

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

