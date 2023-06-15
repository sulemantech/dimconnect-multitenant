import { dropvalue } from './../signals'
import { PERMISSIONS } from '../common'
import icons from '../layout/icons'

export const privateRoutes = [{
    label: 'Dashboard',
    path: `/dashboard?ags=${dropvalue?.value}`,
    permission: PERMISSIONS.Dashboard,
    icon: <icons.DasboardIcon />,
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
{
    label: 'Support Team',
    permission: PERMISSIONS.Ticket,
    path: `/support_team`,
    icon: <icons.supportTeamIcon />,
    subroutes: [{
        label: 'FAQ',
        path: `/support_team/faq`,
        permission: PERMISSIONS.Ticket,
        icon: <icons.FAQIcon />,
    }, {
        label: 'Support Ticket',
        permission: PERMISSIONS.Ticket,
        path: `/support_team/support_ticket`,
        icon: <icons.TicketIconBlue />,
    }, {
        label: 'Contacts',
        permission: PERMISSIONS.Ticket,
        path: `/support_team/contacts`,
        icon: <icons.ContactIcon />,

    }
    ]


},
    // {
    //     label: 'Styles',
    //     path: `/styles/${dropvalue.value}`,
    //     icon: <IconPalette />
    // }
]