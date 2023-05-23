import { Router } from 'preact-router';
import {lazy,Suspense} from 'preact/compat';
import { Skeleton } from '@mantine/core';

const Navbar = lazy(() => import('../layout/Navbar').catch((e) => console.log(e)));
const Dashboard = lazy(() => import('../views/private/Admin/Dashboard'));
const Administration = lazy(() => import('../views/private/Admin/Administration'));
const PageWrapper = lazy(() => import('../layout/PageWrapper'));
const Styles = lazy(() => import('../views/private/Admin/Styles'));
const Map = lazy(() => import('../views/private/Admin/Map'));

const UserManagement = lazy(() => import('../views/private/Admin/Administration/UserManagement'));
const PermissionsManagement = lazy(() => import('../views/private/Admin/Administration/PermissionsManagement'));

import { UserType } from '../signals';

const TypeRoutes = {
    'admin': [
        <Dashboard path="/:ags" />,
        <Map path="/map/:ags" />,
        <Administration path="/administration" />,
        <UserManagement path="/administration/users" />,
        <PermissionsManagement path="/administration/r&p" />,
        <Styles path="/styles" />,
        <Ticket path="/ticket" />
    ],
}


export default () => <div className='flex absolute top-0 left-0 bottom-0 bg-neutral-200 right-0 overflow-hidden'>
    <Navbar />
    <PageWrapper>
   
    <Router hashHistory >
        {TypeRoutes[
            UserType.value
        ]?.map((route) => route)}
    </Router>
   
    </PageWrapper>
</div>