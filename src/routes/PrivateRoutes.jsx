import { Router } from 'preact-router';
import Navbar from '../layout/Navbar';
import Dashboard from '../views/private/Dashboard';
import Administration from '../views/private/Administration';
import PageWrapper from '../layout/PageWrapper';


const UserType = {
    'type1': [
        <Dashboard path="/" />,
        <Administration path="/administration" />
    ],
}


export default () => <div className='flex absolute top-0 left-0 bottom-0 right-0 overflow-hidden'>
    <Navbar />
    <PageWrapper>
    <Router>
        {UserType['type1'].map((route) => route)}
    </Router>
    </PageWrapper>
</div>