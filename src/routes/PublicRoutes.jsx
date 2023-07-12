import { Router } from 'preact-router';

import Login from '../views/public/Login';
import WebView from '../views/public/WebView';


export default () => <Router>

    <Login path="/login" default />
    <WebView path="/webview" />

</Router>