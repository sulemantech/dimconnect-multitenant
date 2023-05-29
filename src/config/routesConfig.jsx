import { IconDashboard, IconMap, IconUser } from '@tabler/icons'
import { dropvalue } from './../signals'
import { PERMISSIONS } from '../common'

export const privateRoutes = [{
    label: 'Dashboard',
    path: `/${dropvalue?.value}`,
    permission: PERMISSIONS.Dashboard,
    icon: <IconDashboard />,
}, {
    label: 'Map',
    path: `/map/${dropvalue?.value}`,
    permission: PERMISSIONS.Map,
    icon: <IconMap />,
}, {
    label: 'Administration',
    permission: PERMISSIONS.Administration,
    path: `/administration`,
    icon: <IconUser />,
},
    // {
    //     label: 'Styles',
    //     path: `/styles/${dropvalue.value}`,
    //     icon: <IconPalette />
    // }
]