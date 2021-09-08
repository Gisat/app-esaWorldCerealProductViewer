import React from 'react';
import Helmet from 'react-helmet';

import {connects} from '@gisatcz/ptr-state';
import {create as createRouter} from '@gisatcz/ptr-router';
import {AppContainer} from '@gisatcz/ptr-components';

import {init as initCore} from './core';
import {appKey} from './constants/keys';

// base styles need to be imported before all components
import '@gisatcz/ptr-core/lib/styles/reset.css';
import '@gisatcz/ptr-core/lib/styles/base.scss';
import './styles/index.scss';

import ReviewApp from './components/App';

const path = process.env.PUBLIC_URL;

function createRoutes(Store, isPreloaded) {
	return {
	};
}

function init(Store, {absPath, isPreloaded, currentUrl, navHandler}) {
	/**
	 * Creates router instance that can be used to manipulate urls.
	 *
	 * App handler updates store with current page and it's up to views to react to the change.
	 * In case of url change, redux selector possibly retrieves different data and passes them
	 * into some the component.
	 *
	 */
	const router = createRouter({
		rootUrl: absPath,
		currentUrl,
		routes: createRoutes(Store, isPreloaded),
		navHandler,
	});

	initCore({router});

	if (isPreloaded) {
		return;
	}
}

const ConnectedAppContainer = connects.AppContainer(AppContainer);

const AppComponent = () => {
	return (
		<>
			<Helmet defaultTitle="WorldCereal | Product Viewer" />
			<ConnectedAppContainer appKey={appKey}>
				<ReviewApp />
			</ConnectedAppContainer>
		</>
	);
};

export {AppComponent as App, init};
