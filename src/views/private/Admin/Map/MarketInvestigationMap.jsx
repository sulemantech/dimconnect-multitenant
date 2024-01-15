import { Suspense, useEffect, useState } from 'preact/compat';
import { Map, ScaleControl } from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import { LoadingOverlay } from '@mantine/core';
import { useRef } from 'preact/hooks';

import MapControls from './MapControls';
import SearchControl from './SearchControl';

import MarketTiles from './MarketTiles';
import { Boundary } from '../Dashboard/Submap';
import appConfig from '../../../../config/appConfig';

import { mapStyle } from '../../../../signals';
import PermissionWrapper from '../../../../providers/PermissionsProvider';
import { PERMISSIONS } from '../../../../common';

import Cookies from 'js-cookie';

let mapFirstRender = false

export default (props) => {
  // center of the district
  const [center] = useState([8.481408219380569,52.14515041641306])
  
  // map reference to access map methods
  const mapRef = useRef(null);

  useEffect(() => {
    if (props.url) {
      // after rednering the map, fly to the center of the district
      setTimeout(() => {
      mapRef.current?.getMap().flyTo({
        center: center,
        zoom: 11.42115358517738,

      })
      }, 1000);
    }
  }, [])



  const [basemap, setBasemap] = useState('https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json')
  useEffect(() => {
    // subscribe to the mapStyle signal to change the basemap
    mapStyle.subscribe(setBasemap)
  }, [])

  return (
    <PermissionWrapper permission={PERMISSIONS.Market} view={true} message>
    {/* // Map component from react-map-gl library to render the map */}
    <Map
      ref={mapRef}  // map reference to access map methods
      attributionControl={false}  // disable the default attribution control of the map
      mapLib={maplibregl}  // map library to use for rendering the map (maplibre-gl)
      mapStyle={basemap} // basemap style

      // initial map viewport settings (zoom level, center, pitch, bearing)
      onRender={({ target }) => {
        if (!mapFirstRender) {
          target.setZoom(11.42115358517738)
          target.setCenter([8.481408219380569,52.14515041641306])
          mapFirstRender = true
        }
      }}
      style={{ width: '100%', height: '100%' }} // map container style
      transformRequest={(url, resourceType) => { // transformRequest function to add Authorization header to requests for tiles from the Tileserver
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
      <Suspense fallback={<LoadingOverlay visible />}> {/* fallback loading overlay */}
        <SearchControl  marketsearch={true} /> {/* search control to search for addresses */}
        <MapControls /> {/* map controls to change the basemap and the map style */}
        <ScaleControl position='bottom-right' maxWidth={200} unit='metric' /> {/* scale control to show the scale of the map */}
        <MarketTiles ags={"05758032"} /> {/* data tiles to show the data of the district */}
        <Boundary noFill /> {/* boundary of the district */}
      </Suspense> 
    </Map>
    </PermissionWrapper>
  );
}

