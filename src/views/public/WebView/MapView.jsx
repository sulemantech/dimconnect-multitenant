import 'maplibre-gl/dist/maplibre-gl.css';

import { Suspense, lazy, useEffect, useState } from 'preact/compat';
import {  Map, Marker, ScaleControl, useMap } from 'react-map-gl';
import maplibreGl from 'maplibre-gl';
import { signal } from '@preact/signals';
import { LoadingOverlay } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

import SearchControl from '../../private/Admin/Map/SearchControl';
import DataTiles from '../../private/Admin/Map/DataTiles';
import { Boundary } from '../../private/Admin/Dashboard/Submap';
import AddressPoints, { CRUDAddressPoint, } from '../../private/Admin/Map/AddressPoints';
const InfoCard = lazy(() => import('../../private/Admin/Map/InfoCard'));

import appConfig from '../../../config/appConfig';
import Popup from '../../private/Admin/Map/Popup';
import Photos from '../../private/Admin/Map/Photos';
import Gpx from '../../private/Admin/Map/Gpx';
import { IconCompass } from '@tabler/icons';
import DistrictPhase from '../../private/Admin/Map/DistrictPhase';

import { mapClickBindings , additionalInteractiveLayers , mapStyle, DistrictPhaseVisibility, infoCardVal, visibility, addressPointsCRUDstate } from '../../../signals';
import { FabClass } from '../../../layout';


const CustomGeoLocateData = signal(null)
export default () => {
  const params = new URLSearchParams(window.location.search)
  const statusPage = params.get('statusPage')
  if(statusPage){
    DistrictPhaseVisibility.value = true
  }
  const APVPage = params.get('apvPage')
  
  const [basemap , setBasemap] = useState('https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json')
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
    // post message to parent latlng
    window.parent.postMessage({ latlng: event.lngLat }, '*');

    Object.values(mapClickBindings.value).forEach(binding => {
      binding(event)
    })
    if (addressPointsCRUDstate.value != '') return
   
    if (features.length > 0) {
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

      onClick={handleMapClick}
      onMouseMove={handleMaphover}
      attributionControl={false}
      mapLib={maplibreGl}
      mapStyle={basemap}
      trackResize={true}
      // hash={true}
      style={{ flex : 1 ,display: 'flex'}}
      initialViewState={{
        longitude: 7.785873,
        latitude: 50.614182,
        zoom: 5,

      }}
      onError={(e) => {}}
      interactiveLayerIds={APVPage? ['addressPoints'] : interactiveLayerIds}
      transformRequest={(url, resourceType) => {
        if(url.includes('dim-tileserver')) {
         
          //  add Authorization header to requests for tiles from the Tileserver
            return {
                url: url,
                headers: {
                  "Authorization" :`Bearer ${sessionStorage.getItem(appConfig.sessionStorageKeyWebview)}`
                }
              }

        }
    }}
    >
      <Suspense fallback={<LoadingOverlay visible />}>

        <InfoCard modal presegment={APVPage ? 'ADDRESS POINT' : null} />
        <Boundary noFill />
        {statusPage ? <DistrictPhase/>
        : 
        APVPage ? <AddressPoints /> 
        :
        <>
        <AddressPoints /> 
        <SearchControl nohead />
        <div  className={`absolute top-2 right-2 ${FabClass} text-[#0071b9] bg-white `}
           onClick={() => {
            navigator.geolocation.getCurrentPosition((position) => {
              CustomGeoLocateData.value = {
                longitude: position.coords.longitude,
                latitude: position.coords.latitude,
              };
            }, (error) => {
              showNotification({
                title: 'Error',
                message: error.message,
                color: 'red',
                icon: <IconCompass size={26} />,
              });
            });
          }}
        >
          <IconCompass size={26} />
        </div>
        <ScaleControl position='bottom-right' maxWidth={100} unit='metric' />
        <Gpx />
        <Photos />
        <CRUDAddressPoint />
      
         <DataTiles ags />
        <Popup />
        
        <CustomGeoLocateMarker />
        </>
}
      </Suspense>
    </Map>
  );



}




const CustomGeoLocateMarker = () => {
  const [data, setData] = useState(null)
  const map = useMap()?.current
  useEffect(() => {
    CustomGeoLocateData.subscribe((val) => {
      setData(val)
      if (val) {
        map.flyTo({
          center: [val.longitude, val.latitude],
          zoom: 12,
        })
      }
    })
  }, [])
  return data ? (
    <Marker
      longitude={data.longitude}
      latitude={data.latitude}
      
    >
      <div className="bg-red-800 p-2 rounded-full shadow-lg" >
        <IconCompass size={20} className='text-white'/>
      </div>
    </Marker>
  ) : null
}
