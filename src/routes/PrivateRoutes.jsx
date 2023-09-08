import { LoadingOverlay } from '@mantine/core';
import { Router } from 'preact-router';
import { lazy, Suspense } from 'preact/compat';

const Navbar = lazy(() => import('../layout/Navbar').catch((e) => console.log(e)));
const Dashboard = lazy(() => import('../views/private/Admin/Dashboard'));
const Administration = lazy(() => import('../views/private/Admin/Administration'));
const PageWrapper = lazy(() => import('../layout/PageWrapper'));
const Styles = lazy(() => import('../views/private/Admin/Styles'));
const Map = lazy(() => import('../views/private/Admin/Map'));

const UserManagement = lazy(() => import('../views/private/Admin/Administration/UserManagement'));
const PermissionsManagement = lazy(() => import('../views/private/Admin/Administration/PermissionsManagement'));

// const Ticket = lazy(() => import('../views/private/Ticket'));

import RegionListValidator from '../providers/RegionListValidator';
import { UserType } from '../signals';
import Ticket from '../views/private/Admin/Ticket';
import ContactPage from '../views/private/Customer/Support Team/ContactPage';
import CreateTicket from '../views/private/Customer/Support Team/CreateTicket';
import EditOrCheckStatusTicket from '../views/private/Customer/Support Team/EditOrCheckStatusTicket';
import FAQ from '../views/private/Customer/Support Team/FAQ';
import FAQCategory from '../views/private/Customer/Support Team/FAQCategory';
import LiveChat from '../views/private/Customer/Support Team/LiveChat';
import MyTickets from '../views/private/Customer/Support Team/MyTickets';
import SupportTeam from '../views/private/Customer/Support Team/SupportTeam';
import LiveChatSupport from '../views/private/Admin/support-chat/LiveChat';
import MarketInvestigationMap from '../views/private/Admin/Map/MarketInvestigationMap';


//add more routes here
export default () => <div className='flex absolute top-0 left-0 bottom-0 bg-slate-100 right-0 overflow-hidden'>
    <Navbar />
    <RegionListValidator />
    <PageWrapper>
        <Suspense fallback={<LoadingOverlay visible />}>
            <Router hashHistory >
                <Dashboard path="/dashboard" default />
                <LiveChatSupport path="/support_chat_back_office" />
                <Map path="/map" />
                <MarketInvestigationMap path="/market" />
                <Administration path="/administration" />
                <UserManagement path="/administration/user_management" />
                <PermissionsManagement path="/administration/role_management" />
                <Ticket path="/support_ticket_back_office/inbox" />
                <Styles path="/styles" />
                <FAQ path="/support_team/faq" />
                <FAQCategory path="/support_team/faq/:id" />
                <CreateTicket path="/support_team/support_ticket" />
                <EditOrCheckStatusTicket path="/support_team/support_ticket/:edit_or_check_ticket_status" />
                <SupportTeam path="/support_team" />
                <MyTickets path="/support_team/my_tickets" />
                <EditOrCheckStatusTicket path="/support_team/my_tickets/:edit_or_check_ticket_status" />
                <LiveChat path="/support_team/live_chat" />
                <ContactPage path="/support_team/contact" />
            </Router>
        </Suspense>
    </PageWrapper>
</div>