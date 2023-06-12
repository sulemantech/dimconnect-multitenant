import { dropvalue } from './../signals'
import { PERMISSIONS } from '../common'
import icons from '../layout/icons'

export const privateRoutes = [{
    label: 'Dashboard',
    path: `/${dropvalue?.value}`,
    permission: PERMISSIONS.Dashboard,
    icon: <icons.DasboardIcon/>,
}, {
    label: 'Map',
    path: `/map/${dropvalue?.value}`,
    permission: PERMISSIONS.Map,
    icon: <icons.MapIcon />,
}, {
    label: 'Administration',
    permission: PERMISSIONS.Administration,
    path: `/administration`,
    icon: <icons.AdministrationIcon />,
},
    // {
    //     label: 'Styles',
    //     path: `/styles/${dropvalue.value}`,
    //     icon: <IconPalette />
    // }
]