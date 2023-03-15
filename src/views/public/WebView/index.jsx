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
        <div className="m-0 absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
            <ProtectedWrapper>
                {
                    ags && client === 'ios' ?
                        <div className="flex relative flex-col h-full">
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