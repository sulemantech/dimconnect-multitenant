import React from 'react'
import Map from './Map'
import BaseMapControl from './Map/BaseMapControl'
import OverlayControl from './Map/OverlayControl'
import SearchControl from './Map/SearchControl'

const Dashboard = () => {
  return (
    <div className="relative flex flex-col w-full h-full">
        <Map />
        
        <BaseMapControl />
        <OverlayControl />
    </div>
  )
}

export default Dashboard