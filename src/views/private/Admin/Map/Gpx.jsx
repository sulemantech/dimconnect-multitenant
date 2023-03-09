import {memo} from "preact/compat"
import { useEffect, useState } from "preact/hooks"
import tj from "@mapbox/togeojson"
import { Layer, Marker, Popup, Source } from "react-map-gl"
import {DOMParser} from 'xmldom'
import { dispatchPopupView } from "./Popup"

export default () => {
    const rawtext = `<?xml version="1.0" encoding="UTF-8"?>
    <gpx xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.topografix.com/GPX/1/1" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd" version="1.1" creator="DIM Connect Video Upload">
      <wpt lat="51.537506103515625" lon="7.332530127225544">
        <time>2023-03-01T14:48:18Z</time>
        <name>Starting Point</name>
        <desc>This is the starting point of the video.</desc>
      </wpt>
      <wpt lat="51.53739019598961" lon="7.332645088997117">
        <time>2023-03-01T14:56:33Z</time>
        <name>End Point</name>
        <desc>This is the end point of the video.</desc>
      </wpt>
      <trk>
        <trkseg>
          <trkpt lat="51.537395850659536" lon="7.332679760980514">
            <time>2023-03-01T14:56:25Z</time>
            <name>Point 1</name>
          </trkpt>
        </trkseg>
      </trk>
    </gpx>
    `
    const [data, setData] = useState(null)

    useEffect(() => {
      try {
        const parser = new DOMParser()
        const parsed = parser.parseFromString(rawtext, 'text/xml')
        const geojson = tj.gpx(parsed)
        console.log(geojson)
        setData(geojson)
      } catch (error) {
        console.error(error)
      }
      return () => {
        setData(null)
      }


    }, [])


    return (
        <>
            {data != null ?
                <>
                  {
                    data?.features?.filter(feature => feature.geometry.coordinates[0] != null && feature.geometry.coordinates[1] != null).map((feature, index) => {
                      return (
                        <Marker key={index} longitude={feature.geometry.coordinates[0]} latitude={feature.geometry.coordinates[1]}
                          onClick={()=>{
                            const view = <div>
                              <h1>{feature.properties.name}</h1>
                              <p>{feature.properties.desc}</p>
                            </div>
                           dispatchPopupView(view, feature.geometry.coordinates[1], feature.geometry.coordinates[0])
                          }}
                        >
                          <Pin size={20} />
                        </Marker>
                      )
                    })
                  }
                </>

            : <></>}
        </>
    )
}



const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const pinStyle = {
  fill: '#d00',
  stroke: 'none'
};

const Pin = memo((props) => {
  const {size = 20} = props;

  return (
    <svg height={size} viewBox="0 0 24 24" style={pinStyle}>
      <path d={ICON} />
    </svg>
  );
})