import { useScrollLock } from "@mantine/hooks"
import { Skeleton } from "@mantine/core"

import { BottomLeft,BottomRight } from "../../../layout/Fixed"
// const BaseMapControl = lazy(() => import('../../private/Admin/Map/BaseMapControl'))
// const Legend = lazy(() => import('../../private/Admin/Map/Legend'))
// const OverlayControl = lazy(() => import('../../private/Admin/Map/OverlayControl'))
// const MapView = lazy(() => import('./MapView'))
// const ProtectedWrapper = lazy(() => import('./ProtectedWrapper'))
// const AddControl = lazy(() => import('../../private/Admin/Map/AddControl'))
// const EditControl = lazy(() => import('../../private/Admin/Map/EditControl'))
// const WebViewFooter = lazy(() => import('./WebViewFooter'))
import BaseMapControl from "../../private/Admin/Map/BaseMapControl"
import Legend from "../../private/Admin/Map/Legend"
import OverlayControl from "../../private/Admin/Map/OverlayControl"
import MapView from "./MapView"
import ProtectedWrapper from "./ProtectedWrapper"
import AddControl from "../../private/Admin/Map/AddControl"
import EditControl from "../../private/Admin/Map/EditControl"
import WebViewFooter from "./WebViewFooter"



import { dropvalue } from "../../../signals"
import PermissionWrapper from "../../../providers/PermissionsProvider"
import { ExtraViewableControl } from "../../private/Admin/Map/ExtraViewables"

export default () => {
    useScrollLock(true);
    const params = new URLSearchParams(window.location.search)
    const ags = params.get('ags')
    const client = params.get('client')
    const statusPage = params.get('statusPage')
    const apvPage = params.get('apvPage')
   
    if (ags) {
        dropvalue.value = ags
    }

    return (
        <div className="m-0 absolute top-0 left-0 right-0 bottom-0 touch-none overflow-hidden">
            <ProtectedWrapper>
              
                   <PermissionWrapper permission="Map" view >
                {
                    ags && client === 'ios' ?
                        <div className="flex relative flex-col h-full">
                            <MapView /> 
                            {!statusPage && !apvPage &&
                            <BottomRight>
                               
                                    <div className="mb-20">
                                        <OverlayControl modal/>
                                        <BaseMapControl modal/>
                                        <ExtraViewableControl modal/>
                                        <PermissionWrapper permission="Map" add>

                                        <AddControl  />
                                        </PermissionWrapper>
                                        <PermissionWrapper permission="Map" edit>
                                        <EditControl modal/>
                                        </PermissionWrapper>
                                    </div>
                                   
                                
                            </BottomRight>}
                            <BottomLeft>
                               
                                <div className="mb-20">
                                <Legend noAddressPoint={statusPage} noStatus={!statusPage}/>
                                </div>
                               
                            </BottomLeft>
                            <WebViewFooter />
                        </div>
                        :
                        <div>Not Valid Params</div>
                    }
                    </PermissionWrapper>
               
            </ProtectedWrapper>
        </div>
    )
}