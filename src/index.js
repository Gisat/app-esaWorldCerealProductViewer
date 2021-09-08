import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from '@gisatcz/ptr-state';
import {isServer} from '@gisatcz/ptr-core';

import createStore from './state/Store';
import {App} from './app';

const {store} = createStore();

const ConnectedApp = () => (
	<Provider store={store}>
		<App />
	</Provider>
);

function renderApp() {
	const rootEl = document.getElementById('root');
	const render =
		isServer || rootEl.hasChildNodes() ? ReactDOM.hydrate : ReactDOM.render;
	render(<ConnectedApp />, rootEl);
}

renderApp();
