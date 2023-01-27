
   import React, { useState ,useRef,useEffect} from 'react';
   import { Map, Marker,Source, Layer  } from 'react-map-gl';
   import maplibreGl from 'maplibre-gl';
  import axios from 'axios';
  import { dropvalue } from '../../layout/Header';
export default () => {
  
  const [viewport, setViewport] = useState({
    latitude: 3.74565,
    longitude: 44.97306,
    zoom: 20
  });
  const mapRef= useRef(null);

 useEffect(()=>{
 
  getData(dropvalue.value)
console.log('sdsads',dropvalue.value)

if(dropvalue.value){
  axios.get(`http://localhost:3032/district/${dropvalue.value}`).then(
    response =>{
      console.log(response['data'][0])
      const bounds = [[response.data[0]['xmin'],response.data[0]['ymin']],[response.data[0]['xmax'], response.data[0]['ymax']]];
mapRef.current.fitBounds(bounds,
  {
  zoom: 13
});
   
    }
  )
}
      
  

 },[dropvalue.value])



const getData = async (value) => { 

   
}



    
    const handleMapClick = (e) => {
      
      const projection = mapRef.current.getProjection();
      console.log(projection.getCode());

    // const viewport = mapRef.current.getViewport();
    // console.log(viewport.projection);
      // mapRef.current.setZoom(mapRef.current.getZoom() + 1);
      // You can call mapRef.current. methods here
     
    }
  
  return (
    <Map 
    //   mapboxApiAccessToken={'pk.eyJ1IjoidWJhaWR1bGxhaDEiLCJhIjoiY2xkM2RkMnV2MGg5bDNvbDBoamZsb2NwdSJ9.4ronX5Nc-gueYS1sJ8fW5w'}
    ref={mapRef} 
    onClick={handleMapClick} 

    mapLib={maplibreGl}
      mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
      trackResize={true}
      flex={3}
      height="100%"
      initialViewState={{
        longitude: 3.74565,
        latitude: 44.97306,
        zoom: 13,
 
      }}
      // onViewportChange={(viewport) => setViewport(viewport)}
    >
         <Source
        id="geostyle"
        type="vector"
        tiles={['http://18.218.50.110:8881/data/dimv4/{z}/{x}/{y}.pbf']}
        minzoom = {1}
        maxzoom = {20}
     />
      <Layer
        id="bound"
        type="fill"
        source="geostyle"
        source-layer= 'boundaries'
        paint={{
          "fill-color": "#088",
          "fill-opacity": 0.8
        }}
  
      />
    
    </Map>
  );


    
}
