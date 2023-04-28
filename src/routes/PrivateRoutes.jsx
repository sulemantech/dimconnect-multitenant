import { Router } from 'preact-router';
import Navbar from '../layout/Navbar';
import Dashboard from '../views/private/Admin/Dashboard';
import Administration from '../views/private/Admin/Administration';
import PageWrapper from '../layout/PageWrapper';
import Styles from '../views/private/Admin/Styles';
import Map from '../views/private/Admin/Map';
import { signal } from '@preact/signals';
import UserManagement from '../views/private/Admin/Administration/UserManagement';
import PermissionsManagement from '../views/private/Admin/Administration/PermissionsManagement';

export const UserType = signal('admin')

const TypeRoutes = {
    'admin': [
        <Dashboard path="/:ags" />,
        <Map path="/map/:ags" />,
        <Administration path="/administration" />,
        <UserManagement path="/administration/users" />,
        <PermissionsManagement path="/administration/r&p" />,
        <Styles path="/styles" />
    ],
}


export default () => <div className='flex absolute top-0 left-0 bottom-0 bg-neutral-200 right-0 overflow-hidden'>
    <Navbar />
    <PageWrapper>
    <Router hashHistory>
        {TypeRoutes[
            UserType.value
        ]?.map((route) => route)}
    </Router>
    </PageWrapper>
</div>