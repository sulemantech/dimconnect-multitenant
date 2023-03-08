import {Suspense, lazy} from 'preact/compat'
const Map = lazy(() => import('./Map'))
const BaseMapControl = lazy(() => import('./BaseMapControl'))
const OverlayControl = lazy(() => import('./OverlayControl'))


export default () => {
  return (
    <div className="relative flex flex-col w-full h-full">
      <Suspense fallback={<div>Loading...</div>}>
      <Map />

      <BaseMapControl />
      <OverlayControl />
      </Suspense>
    </div>
  )
}