import { openModal } from "@mantine/modals"
import tj from "@mapbox/togeojson"
import { signal } from "@preact/signals"
import { IconVideo, IconVideoPlus } from "@tabler/icons"
import { memo } from "preact/compat"
import { useEffect, useState } from "preact/hooks"
import { Marker } from "react-map-gl"
import { DOMParser } from 'xmldom'

import { getGPX, getGPXList } from "../../../../api"
import appConfig from "../../../../config/appConfig"
import { dropvalue, videoVisibility } from "../../../../signals"


export default () => {

  const [data, setData] = useState(null) // ["35",null,"resources/media/uploads/gpx/Video_28CFCE95-174D-4D9B-9860-7AB0A1670358.gpx","49.46360859039186","8.429641950009824" ]

  useEffect(() => {
    getGPXList(dropvalue.value).then(({ data }) => {
      setData(data?.[0]?.json_object_agg)
    }).catch((err) => {

    })

  }, [dropvalue.value])


  return (
    <>
      {videoVisibility.value && data ?
        <>
          {
            Object.keys(data).map((key) => (
              <>
                {
                  data[key].filter((item) => parseFloat(item[3]) > 0 && parseFloat(item[4]) > 0)?.map((item, index) => (
                    <Marker
                      key={'efe0' + index}
                      latitude={parseFloat(item[3])}
                      longitude={parseFloat(item[4])}
                      anchor="bottom"

                    >
                      <Pin onClick={(e) => {
                        e.stopPropagation();

                        getGPX(item[0]).then(({ data }) => {
                          const gpx = new DOMParser().parseFromString(data, 'text/xml');
                          const convertedData = tj.gpx(gpx);
                          convertedData.video = item[2].replace('resources/media/uploads/gpx/', '').replace('.gpx', '.mp4')
                          openModal({

                            children: <>
                              <video controls
                                onLoad={(e => { e.target.play(); e.target.requestFullscreen() })}
                                className="h-full w-full" src={`${appConfig.mediaServerURL}/${convertedData.video}`} type="video/mp4" />
                            </>
                          })
                          extendedGPXData.value = convertedData
                        }).catch((err) => {

                        })
                      }} />
                    </Marker>
                  ))
                }
              </>
            ))
          }
          <ExtendedGPX />
        </>

        : <></>}
    </>
  )
}



const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
 c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
 C20.1,15.8,20.2,15.8,20.2,15.7z`;

const pinStyle = {
  fill: 'orange',
  stroke: 'white'
};

const Pin = memo((props) => {
  const { size = 40 } = props;

  return (
    <div onClick={props.onClick} className="relative flex flex-col items-center cursor-pointer hover:scale-125 transition-all justify-center">
      <svg height={size} viewBox="0 0 24 24" style={pinStyle} >
        <path d={ICON} />

      </svg>
      <IconVideo size={25} className="absolute mb-2" r="2" fill="white" />
    </div>
  );
})

const extendedGPXData = signal(null)

export const ExtendedGPX = () => {
  const [data, setData] = useState(null) // as geojson

  useEffect(() => {
    extendedGPXData.subscribe((data) => {
      setData(data)
    })
  }, [])

  return (
    <>
      {data ?
        <>
          {
            data.features.filter((item) => item.geometry.coordinates[0] > 0 && item.geometry.coordinates[1] > 0)?.map((item, index) => {
              if (item.geometry.type === 'Point')
                return (
                  <Marker
                    key={'efe0' + index}
                    latitude={item.geometry.coordinates[1]}
                    longitude={item.geometry.coordinates[0]}
                    anchor="bottom"

                  >
                    <ExtendedPin onClick={(e) => {
                      e.stopPropagation();


                      openModal({

                        children: <>
                          <video controls
                            onLoad={(e => { e.target.play(); e.target.requestFullscreen() })}
                            className="h-full w-full" src={`${appConfig.mediaServerURL}/${data.video}`} type="video/mp4" />
                        </>
                      })



                    }} />
                  </Marker>
                )
              else if (item.geometry.type === 'LineString')

                item.geometry.coordinates?.map((item, index) => {

                  return (
                    <Marker
                      key={'efe0fef' + index}
                      latitude={item[1]}
                      longitude={item[0]}
                      anchor="bottom"

                    >
                      <ExtendedPin onClick={(e) => {
                        e.stopPropagation();
                        openModal({

                          children: <>
                            <video controls
                              onLoad={(e => { e.currentTarget.play(); e.currentTarget.requestFullscreen() })}
                              className="h-full w-full" src={`${appConfig.mediaServerURL}/${data.video}`} type="video/mp4" />
                          </>
                        })

                      }} />
                    </Marker>
                  )

                })
            })
          }
        </>
        : <></>}
    </>
  )
}

const ExtendedPin = memo((props) => {
  const { size = 40 } = props;

  return (
    <div onClick={props.onClick} className="relative flex flex-col items-center cursor-pointer hover:scale-125 transition-all justify-center">
      <svg height={size} viewBox="0 0 24 24" style={{
        fill: 'tomato',
        stroke: 'white'
      }} >
        <path d={ICON} />

      </svg>
      <IconVideoPlus size={25} className="absolute mb-2" r="2" fill="white" />
    </div>
  );
})