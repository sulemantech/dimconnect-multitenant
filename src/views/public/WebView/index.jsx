import { dropvalue } from "../../../layout/Header"
import { BottomLeft, BottomRight } from "../../private/Admin/Map"
import BaseMapControl from "../../private/Admin/Map/BaseMapControl"
import Legend from "../../private/Admin/Map/Legend"
import OverlayControl from "../../private/Admin/Map/OverlayControl"
import MapView from "./MapView"
import ProtectedWrapper from "./ProtectedWrapper"
import CustomerHeader from "../../private/Customer/CustomerHeader"
import AddControl from "../../private/Admin/Map/AddControl"
import EditControl from "../../private/Admin/Map/EditControl"
import { useScrollLock } from "@mantine/hooks"
import WebViewFooter from "./WebViewFooter"
export default () => {
    const [scrollLocked, setScrollLocked] = useScrollLock(true);
    const params = new URLSearchParams(window.location.search)
    const ags = params.get('ags')
    const client = params.get('client')
    const statusPage = params.get('statusPage')
   
    if (ags) {
        dropvalue.value = ags
    }

    return (
        <div className="m-0 absolute top-0 left-0 right-0 bottom-0 touch-none overflow-hidden">
            <ProtectedWrapper>
                {
                    ags && client === 'ios' ?
                        <div className="flex relative flex-col h-full">
                            <MapView /> 
                            {!statusPage &&
                            <BottomRight>
                                <>
                                    <div className="mb-12">
                                        <OverlayControl modal/>
                                        <BaseMapControl modal/>
                                        <AddControl modal webview/>
                                        <EditControl modal/>
                                    </div>
                                   
                                </>
                            </BottomRight>}
                            <BottomLeft>
                                <div className="mb-12">
                                <Legend noAddressPoint={statusPage} noStatus={!statusPage}/>
                                </div>
                            </BottomLeft>
                            <WebViewFooter />
                        </div>
                        :
                        <div>Not Valid Params</div>
                }
            </ProtectedWrapper>
        </div>
    )
}