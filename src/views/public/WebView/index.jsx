import { dropvalue } from "../../../layout/Header"
import { BottomRight } from "../../private/Admin/Map"
import BaseMapControl from "../../private/Admin/Map/BaseMapControl"
import Legend from "../../private/Admin/Map/Legend"
import OverlayControl from "../../private/Admin/Map/OverlayControl"
import MapView from "./MapView"
import ProtectedWrapper from "./ProtectedWrapper"
import CustomerHeader from "../../private/Customer/CustomerHeader"
export default () => {

    const params = new URLSearchParams(window.location.search)
    const ags = params.get('ags')
    const client = params.get('client')

    if (ags) {
        dropvalue.value = ags
    }

    return (
        <div className="m-0">
            <ProtectedWrapper>
                {
                    ags && client === 'ios' ?
                        <div className="relative w-screen h-screen">
                            <MapView />
                           
                            <BottomRight>
                                <>
                                    <div>
                                        <OverlayControl modal/>
                                        <BaseMapControl modal/>
                                    </div>
                                   
                                </>
                            </BottomRight>
                        </div>
                        :
                        <div>Not Valid Params</div>
                }
            </ProtectedWrapper>
        </div>
    )
}