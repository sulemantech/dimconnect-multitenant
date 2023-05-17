import { Router } from 'preact-router';
import Navbar from '../layout/Navbar';
import Dashboard from '../views/private/Dashboard';
import Administration from '../views/private/Administration';
import PageWrapper from '../layout/PageWrapper';
import Styles from '../views/private/Styles';
import Map from '../views/private/Map';
import Ticket from '../views/private/Ticket';


const UserType = {
    'type1': [
        <Dashboard path="/" />,
        <Map path="/map" />,
        <Administration path="/administration" />,
        <Styles path="/styles" />,
        <Ticket path="/ticket" />
    ],
}


export default () => <div className='flex absolute top-0 left-0 bottom-0 bg-neutral-200 right-0 overflow-hidden'>
    <Navbar />
    <PageWrapper>
    <Router>
        {UserType['type1'].map((route) => route)}
    </Router>
    </PageWrapper>
</div>