import CustomerHeader from "./CustomerHeader"
import { useEffect } from "preact/hooks"
import { openModal } from "@mantine/modals"
import { booleanWithin, point } from "@turf/turf"
import {districts} from '../../../app'
import { dropvalue } from "../../../layout/Header"
import BaseMapControl from "../Admin/Map/BaseMapControl"
import Map from "react-map-gl"
import maplibreGl from "maplibre-gl"
export default () => {

    useEffect(() => {
        // if(!districts.value.features) return
        // const navigator = window.navigator
        // const nav = navigator.geolocation.getCurrentPosition((position) => {
            
        //     // const p = point([position.coords.longitude, position.coords.latitude])
        //     // 50.596286605577795, 7.249177160087882
        //     const p = point([7.249177160087882, 50.596286605577795])

        //     districts.value.features.forEach((feature) => {
        //         if(booleanWithin(p,feature)){
                    
        //             dropvalue.value = feature.properties.c
        //         }else{
        //             openModal({
        //                 title: "Data Error",
        //                 closeOnClickOutside:false,
        //                 children: <div>
        //                     <p>There was an error getting data for your location</p>
        //                     <p>Try again later</p>
        //                     </div>
        //             })
        //         }
        //     })

        // }, (error) => {
        //    openModal({
        //         title: "Location Error",
        //         closeOnClickOutside:false,
        //         onClose: () => {
        //             nav
        //         },
        //         children: <div>
        //             <p>There was an error getting your location</p>
        //             <p>{error.message}</p>

        //         </div>
        //    })
        // })
        // nav
    }, [districts.value])

    return(
        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col  ">
           
            <Map 
            mapLib={maplibreGl}
            mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
            trackResize={true}
            flex={3}
            >
                <CustomerHeader />
                <BaseMapControl />
            </Map>
        </div>
    )
}