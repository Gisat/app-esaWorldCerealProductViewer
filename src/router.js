import {create as createRouter} from '@gisatcz/ptr-router';

// base styles need to be imported before all components
import '@gisatcz/ptr-core/lib/styles/reset.css';
import '@gisatcz/ptr-core/lib/styles/base.scss';
import './styles/index.scss';

let router;

export function createRoutes() {
	return {
		'': {
			name: 'home',
		},
		'/exploration': {
			name: 'exploration',
			handler: () => {},
		},
	};
}

const initRouter = (absPath, currentUrl, Store, isPreloaded, navHandler) => {
	router = createRouter({
		rootUrl: absPath,
		currentUrl,
		routes: createRoutes(),
		navHandler,
		store: Store,
	});

	return router;
};

const getRouter = () => router;

export {getRouter, initRouter};
