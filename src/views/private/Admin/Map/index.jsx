import { Suspense, lazy } from 'preact/compat'
import { useScrollLock } from '@mantine/hooks'

import { BottomLeft, BottomRight } from '../../../../layout/Fixed'
const Map = lazy(() => import('./Map'))
const BaseMapControl = lazy(() => import('./BaseMapControl'))
const OverlayControl = lazy(() => import('./OverlayControl'))
const Legend = lazy(() => import('./Legend'))
const AddControl = lazy(() => import('./AddControl'))
const EditControl = lazy(() => import('./EditControl'))

export default () => {
  useScrollLock(true)
  return (
    <div className="absolute left-0 top-0 bottom-0 right-0 touch-none overflow-hidden">
      
        <Map />
        <BottomRight>
          <>
            <div>
            <OverlayControl modal={window.innerWidth < 768} />
            <BaseMapControl modal={window.innerWidth < 768} />
            <AddControl modal={window.innerWidth < 768} />
            <EditControl modal={window.innerWidth < 768} />
            </div>
          </>
        </BottomRight>
        <BottomLeft>

            <Legend />
        </BottomLeft>
      
    </div>
  )
}

