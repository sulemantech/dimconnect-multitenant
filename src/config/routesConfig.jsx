<<<<<<< HEAD
import { IconDashboard, IconMap, IconTicket, IconUser } from '@tabler/icons'
=======
>>>>>>> 43d2b3b3f6a9dc694f16c8ca1c3e1493d9b082e7
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
<<<<<<< HEAD
    icon: <IconUser />,
}, 
// {
//     label: 'Styles',
//     path: `/styles/${dropvalue.value}`,
//     icon: <IconPalette />
// }
{
    label : 'Ticket',
    path : '/ticket',
    icon : <IconTicket />
}
]
=======
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
>>>>>>> 43d2b3b3f6a9dc694f16c8ca1c3e1493d9b082e7
