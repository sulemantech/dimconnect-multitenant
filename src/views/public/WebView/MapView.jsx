import { Suspense, lazy, useEffect, useState } from 'preact/compat';

import { GeolocateControl, Map, Marker, ScaleControl, useMap } from 'react-map-gl';
import maplibreGl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import { signal } from '@preact/signals';

import SearchControl from '../../private/Admin/Map/SearchControl';

import DataTiles, { visibility } from '../../private/Admin/Map/DataTiles';
import { Boundary } from '../../private/Admin/Dashboard/Submap';

import AddressPoints, { CreateAddressPoint, addressPointsReceived } from '../../private/Admin/Map/AddressPoints';

const InfoCard = lazy(() => import('../../private/Admin/Map/InfoCard'));
import { infoCardVal } from '../../private/Admin/Map/InfoCard';
import { LoadingOverlay } from '@mantine/core';
import Popup from '../../private/Admin/Map/Popup';
import Photos from '../../private/Admin/Map/Photos';
import Gpx from '../../private/Admin/Map/Gpx';
import { mapStyle } from '../../private/Admin/Map/Map';
import { IconCompass } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';
import DistrictPhase, { DistrictPhaseVisibility } from '../../private/Admin/Map/DistrictPhase';
import appConfig from '../../../config/appConfig';
import { mapClickBindings } from '../../../app';
const CustomGeoLocateData = signal(null)
export default () => {
  const params = new URLSearchParams(window.location.search)
  const statusPage = params.get('statusPage')
  if(statusPage){
    DistrictPhaseVisibility.value = true
  }
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

    // post message to parent latlng
    window.parent.postMessage({ latlng: event.lngLat }, '*');

    if (features.length > 0) {

      infoCardVal.value = features
    }
    Object.values(mapClickBindings.value).forEach(binding => {
      binding(event)
    })
  };
 
  return (
    <Map

      onClick={handleMapClick}
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
      interactiveLayerIds={interactiveLayerIds}
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

        <Boundary noFill />
        {statusPage ? <DistrictPhase/>: <>
        <AddressPoints />
        <SearchControl nohead />
        <div  className="absolute top-2 right-2 hover:scale-95 items-center justify-center flex border-white border-solid border-2 transition-all cursor-pointer mb-2 h-16 aspect-square w-16 z-70 p-3 rounded-full shadow-lg text-[#0071b9] bg-white "
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
        <ScaleControl position='bottom-left' maxWidth={100} unit='metric' />
        <Gpx />
        <InfoCard modal/>
        <Photos />
        <CreateAddressPoint />
      
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
