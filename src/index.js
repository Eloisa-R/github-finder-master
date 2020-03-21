import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
