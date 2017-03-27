import React from 'react';
import ReactDOM from 'react-dom';
import ConnectFirebase from 'component/ConnectFirebase';
import App from 'component/App';
import './index.css';

const FirebaseApp = ConnectFirebase(App);

ReactDOM.render(<FirebaseApp />, document.getElementById('root'));
