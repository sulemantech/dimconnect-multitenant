import { dropvalue } from './../signals'
import { PERMISSIONS } from '../common'
import icons from '../layout/icons'

export const privateRoutes = [{
    label: 'Dashboard',
    path: `/dashboard?ags=${dropvalue?.value}`,
    permission: PERMISSIONS.Dashboard,
    icon: <icons.DasboardIcon/>,
}, {
    label: 'Map',
    path: `/map?ags=${dropvalue?.value}`,
    permission: PERMISSIONS.Map,
    icon: <icons.MapIcon />,
}, {
    label: 'Administration',
    permission: PERMISSIONS.Administration,
    path: `/administration`,
    icon: <icons.AdministrationIcon />,
},
{
    label: 'Support Ticket Office',
    permission: PERMISSIONS.Ticket,
    path: `/support_ticket_office/inbox`,
    icon: <icons.TicketIcon />,
},

    // {
    //     label: 'Styles',
    //     path: `/styles/${dropvalue.value}`,
    //     icon: <IconPalette />
    // }
]