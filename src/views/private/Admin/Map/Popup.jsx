import { useClickOutside } from "@mantine/hooks"
import { effect, signal } from "@preact/signals"
import { useEffect, useState } from "preact/hooks"
import { Popup, useMap } from "react-map-gl"



const popupViewSignal = signal(null)

export const dispatchPopupView = (view, latitude, longitude) => {
    if (!view || !latitude || !longitude) {
        popupViewSignal.value = {
            error: `view, latitude, longitude are required`
        }
        return
    }
    popupViewSignal.value = {
        view, latitude, longitude
    }
}

export default () => {
    const [state, setState] = useState(null)
    const map = useMap()?.current

    useEffect(() => {
        if (popupViewSignal.value) {
            setState(popupViewSignal.value)
            if (map && popupViewSignal.value.latitude && popupViewSignal.value.longitude) {
                map.flyTo({
                    center: [popupViewSignal.value.longitude, popupViewSignal.value.latitude],
                    zoom: map.getZoom(),
                    speed: 0.8,
                    curve: 1,
                    padding: {
                        top: 350,
                    },
                    easing: (t) => t,
                })
            }
        }
    }, [popupViewSignal.value])
    const useClickOutsideRef = useClickOutside(() => {
        setState(null)
    })
    return (
        <>
            {state && <Popup
                latitude={state.latitude}
                longitude={state.longitude}
                closeButton={false}
                closeOnClick={false}
                onClose={() => setState(null)}
                anchor="bottom" >

                <div ref={useClickOutsideRef}>
                    {state.view}
                </div>

            </Popup>}
        </>
    )
}
