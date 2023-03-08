import { useEffect, useState } from "preact/hooks"
import tj from "@mapbox/togeojson"
import { Marker } from "react-map-gl"
export default () => {
    const rawtext = `<?xml version="1.0" encoding="UTF-8"?>
    <gpx version="1.1"
         creator="GPX Generator"
         xmlns="http://www.topografix.com/gpx/1/1"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">
    
      <wpt lat="37.8003" lon="-122.4467">
        <time>2023-02-10T12:00:00Z</time>
        <name>Starting Point</name>
        <desc>This is the starting point of the route.</desc>
      </wpt>
    
      <rte>
        <name>Sample Route</name>
        <desc>This is a sample route with direction information and timestamps.</desc>
        <rtept lat="37.8003" lon="-122.4467">
          <time>2023-02-10T12:00:00Z</time>
          <name>Starting Point</name>
          <desc>This is the starting point of the route.</desc>
          <extensions>
            <gpxx:RoutePointExtension xmlns:gpxx="http://www.garmin.com/xmlschemas/GpxExtensions/v3">
              <gpxx:DisplayMode>SymbolAndName</gpxx:DisplayMode>
              <gpxx:Direction>N</gpxx:Direction>
            </gpxx:RoutePointExtension>
          </extensions>
        </rtept>
    
        <rtept lat="37.8022" lon="-122.4447">
          <time>2023-02-10T12:15:00Z</time>
          <name>Point 1</name>
          <desc>This is the first point in the route.</desc>
          <extensions>
            <gpxx:RoutePointExtension xmlns:gpxx="http://www.garmin.com/xmlschemas/GpxExtensions/v3">
              <gpxx:DisplayMode>SymbolAndName</gpxx:DisplayMode>
              <gpxx:Direction>NE</gpxx:Direction>
            </gpxx:RoutePointExtension>
          </extensions>
        </rtept>
    
        <rtept lat="37.8042" lon="-122.4427">
          <time>2023-02-10T12:30:00Z</time>
          <name>Point 2</name>
          <desc>This is the second point in the route.</desc>
          <extensions>
            <gpxx:RoutePointExtension xmlns:gpxx="http://www.garmin.com/xmlschemas/GpxExtensions/v3">
              <gpxx:DisplayMode>SymbolAndName</gpxx:DisplayMode>
              <gpxx:Direction>E</gpxx::Direction>
              </gpxx:RoutePointExtension>
          </extensions>
        </rtept>
    </gpx>
    `
    const [data, setData] = useState(null)

    useEffect(() => {

        const geojson = tj['gpx']((new DOMParser()).parseFromString(rawtext, 'text/xml'))
        setData(geojson)

    }, [])


    return (
        <>
            {data != null &&
                <>{
                    data.features.map((feature, index) => {
                        console.log(feature)
                        return (
                                <Marker key={index} latitude={feature.geometry.coordinates[1]} longitude={feature.geometry.coordinates[0]} >

                            </Marker>
                        )
                    })
                }</>
            }
        </>
    )
}