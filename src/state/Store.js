import {
	createStore,
	combineReducers,
	applyMiddleware,
	compose,
	thunk,
	reduxBatch,
	logger,
	activeMetadataActions,
	baseStores,
} from '@gisatcz/ptr-state';
import {createBrowserHistory, createMemoryHistory} from 'history';
import {initRouter} from '../app';
import {createAsyncMiddleware, isServer} from '@gisatcz/ptr-core';

export const history = isServer
	? createMemoryHistory()
	: createBrowserHistory();

function createMiddleware(requestCounter, withoutLogger) {
	const enhancedThunk = thunk.withExtraArgument(activeMetadataActions);

	const middlewares = [
		createAsyncMiddleware(requestCounter),
		enhancedThunk,
		process.env.NODE_ENV === 'development' &&
			!isServer &&
			!withoutLogger &&
			logger,
	];

	return applyMiddleware(...middlewares.filter(v => v !== false));
}

function createReducer() {
	return combineReducers({...baseStores});
}

const composeEnhancers =
	(typeof window !== 'undefined' &&
		window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?.({})) ||
	compose;

function createEnhancer(requestCounter) {
	return composeEnhancers(
		reduxBatch,
		createMiddleware(requestCounter),
		reduxBatch,
		createMiddleware(requestCounter, true),
		reduxBatch
	);
}

/**
 * Returns object with keys `store`, `readyP`.
 * - `readyP` - Promise that resolves once the app is initialized (helpful with SSR).
 * - `store` - Redux store.
 */
function createAppStore(options) {
	const isPreloaded = !isServer && window.__PRELOADED_STATE__ != null;
	const initialState = isPreloaded ? window.__PRELOADED_STATE__ : {};
	if (isPreloaded) {
		delete window.__PRELOADED_STATE__;
	}

	const store = createStore(createReducer(), initialState);

	const absPath =
		options?.absPath ??
		window.location.protocol +
			'//' +
			window.location.host +
			process.env.PUBLIC_URL;

	initRouter(store, {
		absPath,
		isPreloaded,
		currentUrl: options?.currentUrl,
		navHandler: options?.navHandler,
	});

	return {
		store: store,
	};
}

export default createAppStore;
