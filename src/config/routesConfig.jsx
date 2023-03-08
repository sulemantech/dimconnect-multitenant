import { IconDashboard, IconUser, IconPalette, IconMap } from '@tabler/icons'

export const privateRoutes = [{
    label: 'Dashboard',
    path: '/',
    icon: <IconDashboard />,
}, {
    label: 'Map',
    path: '/map',
    icon: <IconMap />,
}, {
    label: 'Administration',
    path: '/administration',
    icon: <IconUser />,
}, {
    label: 'Styles',
    path: '/styles',
    icon: <IconPalette />
}]