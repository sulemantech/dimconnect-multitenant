import {Router} from 'preact-router';
import Login from '../views/public/Login';


export default () => <Router>
    
    <Login path="/login" default/>

</Router>