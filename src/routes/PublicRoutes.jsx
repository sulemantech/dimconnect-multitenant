import {Router} from 'preact-router';
import CustomerView from '../views/private/Customer';
import Login from '../views/public/Login';


export default () => <Router>
    
    <Login path="/login" default/>

</Router>