import { Router } from 'preact-router';
import {lazy,Suspense} from 'preact/compat';
import { LoadingOverlay } from '@mantine/core';

const Navbar = lazy(() => import('../layout/Navbar').catch((e) => console.log(e)));
const Dashboard = lazy(() => import('../views/private/Admin/Dashboard'));
const Administration = lazy(() => import('../views/private/Admin/Administration'));
const PageWrapper = lazy(() => import('../layout/PageWrapper'));
const Styles = lazy(() => import('../views/private/Admin/Styles'));
const Map = lazy(() => import('../views/private/Admin/Map'));

const UserManagement = lazy(() => import('../views/private/Admin/Administration/UserManagement'));
const PermissionsManagement = lazy(() => import('../views/private/Admin/Administration/PermissionsManagement'));

// const Ticket = lazy(() => import('../views/private/Ticket'));

import { UserType } from '../signals';
import Ticket from '../views/private/Admin/Ticket';
import FAQ from '../views/private/Customer/Support Team/FAQ';
import CreateTicket from '../views/private/Customer/Support Team/CreateTicket';
import FAQCategory from '../views/private/Customer/Support Team/FAQCategory';
import EditOrCheckStatusTicket from '../views/private/Customer/Support Team/EditOrCheckStatusTicket';
import RegionListValidator from '../providers/RegionListValidator';

const TypeRoutes = {
    'admin': [
        <Dashboard path="/dashboard" default/>,
        <Map path="/map" />,
        <Administration path="/administration" />,
        <UserManagement path="/administration/users" />,
        <PermissionsManagement path="/administration/r&p" />,
        <Ticket path="/support_ticket_back_office/inbox" />,
        <Styles path="/styles" />,
        <FAQ path="/support_team/faq" />,
        <FAQCategory path="/support_team/faq/:id" />,
        <CreateTicket path="/support_team/support_ticket" />,
        <EditOrCheckStatusTicket path="/support_team/support_ticket/:edit_or_check_ticket_status" />,
    ],
}


export default () => <div className='flex absolute top-0 left-0 bottom-0 bg-neutral-200 right-0 overflow-hidden'>
    <Navbar />
    <RegionListValidator />
    <PageWrapper>
    <Suspense fallback={<LoadingOverlay visible/>}>
    <Router hashHistory >
        {TypeRoutes[
            UserType.value
        ]?.map((route) => route)}
    </Router>
    </Suspense>
    </PageWrapper>
</div>