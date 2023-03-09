import { Suspense, lazy } from 'preact/compat'
import Legend from './Legend'
const Map = lazy(() => import('./Map'))
const BaseMapControl = lazy(() => import('./BaseMapControl'))
const OverlayControl = lazy(() => import('./OverlayControl'))


export default () => {
  return (
    <div className="relative flex flex-col w-full h-full">
      <Suspense fallback={<div>Loading...</div>}>
        <Map />
        <BottomRight>
          <>
            <div>
            <OverlayControl />
            <BaseMapControl />
            </div>
            <Legend />
          </>
        </BottomRight>
      </Suspense>
    </div>
  )
}

export const BottomRight = ({ children }) => {
  return (
    <div className="absolute bottom-10 right-2">
      {children}
    </div>
  )
}