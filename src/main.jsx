import { render } from 'preact';
import "preact/debug";
import { App } from './app';
import './index.css';
import './i18n'
render(<App />, document.getElementById('app'))
