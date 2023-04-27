import { IconDashboard, IconUser, IconPalette, IconMap } from '@tabler/icons'
import { dropvalue } from '../layout/Header'

export const privateRoutes = [{
    label: 'Dashboard',
    path: `/${dropvalue.value}`,
    icon: <IconDashboard />,
}, {
    label: 'Map',
    path: `/map/${dropvalue.value}`,
    icon: <IconMap />,
}, {
    label: 'Administration',
    path: `/administration`,
    icon: <IconUser />,
}, 
// {
//     label: 'Styles',
//     path: `/styles/${dropvalue.value}`,
//     icon: <IconPalette />
// }
]