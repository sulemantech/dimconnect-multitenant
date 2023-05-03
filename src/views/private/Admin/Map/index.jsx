import { Suspense, lazy } from 'preact/compat'
import Legend from './Legend'
import AddControl from './AddControl'
import EditControl from './EditControl'
const Map = lazy(() => import('./Map'))
const BaseMapControl = lazy(() => import('./BaseMapControl'))
const OverlayControl = lazy(() => import('./OverlayControl'))


export default () => {
  return (
    <div className="absolute left-0 top-0 bottom-0 right-0 touch-none overflow-hidden">
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </div>
  )
}

export const BottomRight = ({ children }) => {
  return (
    <div className="absolute bottom-10 right-2 flex flex-col items-end justify-end">
      {children}
    </div>
  )
}

export const BottomLeft = ({ children }) => {
  return (
    <div className="absolute bottom-2 left-2 flex flex-col items-start justify-end">
      {children}
    </div>
  )
}
