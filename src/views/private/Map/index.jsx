import Map from './Map'
import BaseMapControl from './BaseMapControl'
import OverlayControl from './OverlayControl'
import SearchControl from './SearchControl'

export default () => {
  return (
      <div className="relative flex flex-col w-full h-full">
      <Map />
      
      <BaseMapControl />
      <OverlayControl />
  </div>
  )
}