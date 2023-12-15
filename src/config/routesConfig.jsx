import { PERMISSIONS } from '../common'
import icons from '../layout/icons'
import { dropvalue } from './../signals'

export const privateRoutes = [{
    label: 'Dashboard',
    path: `/dashboard?ags=${dropvalue?.value}`,
    permission: PERMISSIONS.Dashboard,
    icon: icons.DasboardIcon,
}, {
    label: 'Map',
    path: `/map?ags=${dropvalue?.value}`,
    permission: PERMISSIONS.Map,
    icon: icons.MapIcon,
}, {
    label: 'Administration',
    permission: PERMISSIONS.Administration,
    path: `/administration`,
    icon: icons.AdministrationIcon,
    subroutes: [{
        label: 'User Management',
        path: `/administration/user_management`,
        permission: PERMISSIONS['User Management'],
        icon: icons.UserManagementIcon,
    }, {
        label: 'Role Management',
        path: `/administration/role_management`,
        permission: PERMISSIONS['Roles Management'],
        icon: icons.RoleManagementIcon,
    },
    {
        label: 'Site Management',
        path: `/administration/site_form_management`,
        permission: PERMISSIONS['User Management'],
        icon: icons.RoleManagementIcon,
    },
    {
        label: 'Tenant Form',
        path: `/administration/tenant_form`,
        permission: PERMISSIONS['User Management'],
        icon: icons.RoleManagementIcon,
    }
]
},
{
    label: 'Market Investigation',
    // path: `/market?ags=${dropvalue?.value}`,
    path:'/market?ags=05758032#15/8.470126497169645/52.12516312433257',
    permission: PERMISSIONS.Market,
    icon: icons.MarketMapIcon,
},
{
    label: 'Support Ticket Back Office',
    permission: PERMISSIONS.Ticket,
    path: `/support_ticket_back_office/inbox`,
    icon: icons.TicketIcon,
},
{
    label: 'Support Team',
    permission: PERMISSIONS.SupportTeam,
    path: `/support_team`,
    icon: icons.supportTeamIcon,
    subroutes: [{
        label: 'FAQ',
        path: `/support_team/faq`,
        permission: PERMISSIONS.SupportTeam,
        icon: icons.FAQIcon,
    }, {
        label: 'Support Ticket',
        permission: PERMISSIONS.SupportTeam,
        path: `/support_team/support_ticket`,
        icon: icons.TicketIconBlue,
    },
    {
        label: 'Live Chat',
        permission: PERMISSIONS.SupportTeam,
        path: `/support_team/live_chat`,
        icon: icons.LiveChat,
    },
    {
        label: 'Contacts',
        permission: PERMISSIONS.SupportTeam,
        path: `/support_team/contact`,
        icon: icons.ContactIcon,

    }
    ]


},
{
    label: 'Support Chat Back Office',
    permission: PERMISSIONS['User Management'],
    path: `/support_chat_back_office`,
    icon: icons.LiveChat,
},
    // {
    //     label: 'Styles',
    //     path: `/styles/${dropvalue.value}`,
    //     icon: <IconPalette />
    // }
]
