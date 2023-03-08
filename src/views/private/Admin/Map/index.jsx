import Map from './Map'
import BaseMapControl from './BaseMapControl'
import OverlayControl from './OverlayControl'


export default () => {
  return (
    <div className="relative flex flex-col w-full h-full">
      <Map />

      <BaseMapControl />
      <OverlayControl />
    </div>
  )
}