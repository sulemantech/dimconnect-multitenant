import { useEffect, useState } from "preact/hooks"
import { getPhotos } from "../../../../api"
import { dropvalue } from "../../../../layout/Header"
import { Marker } from "react-map-gl"
import { dispatchPopupView } from "./Popup"
import appConfig from "../../../../config/appConfig"
import { memo } from "preact/compat"
import { IconPhoto } from "@tabler/icons"
import { signal } from "@preact/signals"
import { Loader } from "@mantine/core"
import { openModal } from "@mantine/modals"

export const photoVisibility = signal(true)

export default () => {
    const [data, setData] = useState([])
    useEffect(() => {
        getPhotos(dropvalue.value).then(({ data }) => {
           
            setData(data?.[0]?.json_object_agg)
        }).catch((err) => {
            setData([])
        })
    }, [dropvalue.value])
    // { 195 : ["1", "/photo/1BqWyMP9kXPSSuYNQwTFLx", "8.452872222183284", "49.47358333683217"] }
    return (
        <>
            {photoVisibility.value &&
                Object.keys(data).map((key) => (
                    <>
                        {
                            data[key].filter((item) => parseFloat(item[3]) > 0 && parseFloat(item[2]) > 0)
                            .map((item,index) => (
                                <Marker
                                    key={'efe0' + index}
                                    latitude={parseFloat(item[3])}
                                    longitude={parseFloat(item[2])}
                                    anchor="bottom"
                                    onClick={() => {
                                        dispatchPopupView(<>
                                            <Loader size="lg" />
                                        </>, parseFloat(item[3]), parseFloat(item[2]))
                                        setTimeout(() => {
                                            dispatchPopupView(<ImageComponent src={`${appConfig.backendUrl}/static${item[1]}.jpeg`} />, parseFloat(item[3]), parseFloat(item[2]))
                                        }, 500)
                                    }}
                                >
                                    <Pin />
                                </Marker>
                            ))
                        }
                    </>
                ))
            }
        </>
    )
}

const ImageComponent = ({ src }) => {
   return <>
        <div className="flex flex-col items-center">
            <img className="w-64 h-64 cursor-pointer hover:scale-90 transition-transform" src={src}
             
                onClick={()=>{
                    openModal({
                        children: <img className="w-full h-full" src={src} />
                    })
                }}
            />
        </div>

    </>
}

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const pinStyle = {
    fill: '#0071b9',
    stroke: 'white'
};

const Pin = memo((props) => {
    const { size = 40 } = props;

    return (
        <div className="relative flex flex-col items-center cursor-pointer hover:scale-125 transition-all justify-center">
            <svg height={size} viewBox="0 0 24 24" style={pinStyle} >
                <path d={ICON} />

            </svg>
            <IconPhoto size={25} className="absolute mb-2" r="2" fill="white" />
        </div>
    );
})
