import React from 'react';
import ReactDOM from 'react-dom';
import ErrorBoundary from './components/error-boundary'
import {Provider} from 'react-redux'
import App from './App';
import store from './store'

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    (
        <ErrorBoundary>
            <Provider store={store}>
                <App/>
            </Provider>
        </ErrorBoundary>
    ), 
    document.getElementById('root')
);


serviceWorker.unregister();
// serviceWorker.register();
