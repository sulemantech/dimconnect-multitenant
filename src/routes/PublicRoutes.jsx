import {Router} from 'preact-router';
import CustomerView from '../views/public/CustomerView';
import Login from '../views/public/Login';


export default () => <Router>
    <CustomerView path="/" default />
    <Login path="/login" />

</Router>