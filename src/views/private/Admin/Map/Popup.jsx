import { useClickOutside } from "@mantine/hooks"
import { effect, signal } from "@preact/signals"
import { useEffect, useState } from "preact/hooks"
import { Popup } from "react-map-gl"



const popupViewSignal = signal(null)

export const dispatchPopupView = (view, latitude, longitude) => {
    if (!view || !latitude || !longitude) {
        popupViewSignal.value = {
            error : `view, latitude, longitude are required`
        }
        return  
    }
    popupViewSignal.value = {
        view,latitude,longitude
    }
}

export default () => {
    const [state, setState] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (popupViewSignal.value) {
           setState(popupViewSignal.value)
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
