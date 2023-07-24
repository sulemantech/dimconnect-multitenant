import { useScrollLock } from '@mantine/hooks'
import { lazy, Suspense } from 'preact/compat'

import { BottomLeft, BottomRight } from '../../../../layout/Fixed'
import PermissionWrapper from '../../../../providers/PermissionsProvider'

import { PERMISSIONS } from '../../../../common'
import { ExtraViewableControl } from './ExtraViewables'
const Map = lazy(() => import('./Map'))
const BaseMapControl = lazy(() => import('./BaseMapControl'))
const OverlayControl = lazy(() => import('./OverlayControl'))
const Legend = lazy(() => import('./Legend'))
const AddControl = lazy(() => import('./AddControl'))
const EditControl = lazy(() => import('./EditControl'))

export default () => {
  useScrollLock(true)
  return (
    <div className="flex flex-grow touch-none overflow-hidden">
      <PermissionWrapper permission={PERMISSIONS.Map} view showError>

        <Map />

      </PermissionWrapper>
      <BottomRight>
        <Suspense fallback={<div>Loading...</div>}>
          <div>
            <OverlayControl modal={window.innerWidth < 768} />
            <BaseMapControl modal={window.innerWidth < 768} />
            <ExtraViewableControl modal={window.innerWidth < 768} />
            <PermissionWrapper permission={PERMISSIONS.Map} add>

              <AddControl modal={window.innerWidth < 768} />
            </PermissionWrapper>
            <PermissionWrapper permission={PERMISSIONS.Map} edit>
              <EditControl modal={window.innerWidth < 768} />
            </PermissionWrapper>
          </div>
        </Suspense>
      </BottomRight>
      <BottomLeft>

        <Legend />
      </BottomLeft>
    </div>
  )
}

