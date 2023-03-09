import { Input } from "@mantine/core"
import { useClickOutside, useInputState } from "@mantine/hooks"
import { IconSearch } from "@tabler/icons"
import GeoCodingOSM from "geocoding-osm"
import { useEffect, useState } from "preact/hooks"
import { useMap } from "react-map-gl"
import {booleanWithin} from '@turf/turf'
import { districts } from "../../../../app"
import { dropvalue, tilesAvailable } from "../../../../layout/Header"
import { showNotification } from "@mantine/notifications"

GeoCodingOSM.setLanguage("de")

export default ({within=false}) => {
    const [search, setSearch] = useInputState("")
    const [searchResult, setSearchResult] = useState([])
    const ref = useClickOutside(() => setSearchResult([]))
    const map = useMap()?.current
    // [
    //     {
    //         "place_id": 85326874,
    //         "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
    //         "osm_type": "node",
    //         "osm_id": 8455644574,
    //         "boundingbox": [ 
    //             "53.5560111",
    //             "53.5561111",
    //             "13.2673625",
    //             "13.2674625"
    //         ],
    //         "lat": "53.5560611",
    //         "lon": "13.2674125",
    //         "display_name": "ARS, 52, Friedrich-Engels-Ring, Innenstadt, Нойбранденбург, Mecklenburgische Seenplatte, Мекленбург-Передняя Померания, 17033, Германия",
    //         "class": "shop",
    //         "type": "yes",
    //         "importance": 0.10000999999999996
    //     },
   
    // ]
    const community = districts.value?.features?.find((district) => district.properties.c[0] === dropvalue.value)
                          
    useEffect(() => {
        if (search.length > 0) {
            (async () => {
                const geo = new GeoCodingOSM()
                
                const result = await geo.search({
                    q: search,
                    addressdetails: 1,
                    extratags: 1,
                    namedetails: 1,
                    countrycodes: "de",

                    
                })
                setSearchResult(result)
              
            })()
        }
    }, [search])

const goTo = (item) => {
    
    districts.value?.features.forEach((district) => {
        const point = {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [item.lon, item.lat]
            }
        }
        if(booleanWithin(point, district)){
            if(Object.values(tilesAvailable).map((item) => item.value).includes(district.properties.c[0])){
            dropvalue.value = district.properties.c[0]
            }else{
                showNotification({
                    title: "District not available",
                    message: "This district is not available right now.",
                    color: "red",
                })
            }
        }
    })

    setTimeout(() => {
        map.flyTo({
            center: [item.lon, item.lat],
            zoom: 15,
        })
    }, 2000)

    setSearchResult([])
}


    return (
        <>
            <div className="absolute flex left-2 top-24 ">
                <Input value={search} onChange={setSearch}
                    placeholder="Search" color="white" icon={<IconSearch className=" text-[#0071b9] " />} variant="unstyled" className="shadow-lg text-[#0071b9] bg-white  border-white border-solid border-2 rounded-lg" />

            </div>
            <div className="absolute flex flex-col left-2 top-36 " ref={ref}>
                {
                    searchResult
                    .filter((item) => {
                        if(within){
                            const point = {
                                type: 'Feature',
                                geometry: {
                                    type: 'Point',
                                    coordinates: [item.lon, item.lat]
                                }
                            }
                            return booleanWithin(point, community)
                        }else{
                            return true
                        }
                    })
                    .map((item, index) => {
                        return (
                            <>
                            <div 
                            onClick={() => goTo(item)}
                            key={index} className="bg-white shadow-lg rounded-lg p-2 cursor-pointer hover:bg-slate-100 hover:scale-105 transition-all">
                                {
                                    item.display_name
                                }
                            </div>
                            <hr />
                                </>
                        )
                    })
                }
            </div>
        </>

    )
}