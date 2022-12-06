import {createSelector} from 'reselect';
import {omit as _omit, isEmpty as _isEmpty} from 'lodash';
import {getParsedQueryString, getValueAsArray} from './utils';
import routerConstants from './constants';

import {getRouter} from '../../router';
import {screens, defaultHomeScreen} from '../../constants/app';

const getSubstate = state => state.router;

const getCurrent = createSelector([getSubstate], substate => {
	if (substate?.params?.queryString) {
		return {
			...substate,
			params: {
				...substate?.params,
				parsedQueryString: getParsedQueryString(substate.params.queryString),
			},
		};
	} else {
		return substate;
	}
});

const getHistory = createSelector([getSubstate], substate => {
	return substate.history;
});

const getLatestHistoryPathRecord = createSelector(
	[getHistory, (state, name) => name],
	(history, name) => {
		return history.find(i => i.name === name);
	}
);

const getUrlForPath = createSelector(
	[
		getCurrent,
		getLatestHistoryPathRecord,
		(state, name) => name,
		(state, name, update) => update,
		(state, name, update, ignoreQueryString) => ignoreQueryString,
		(state, name, update, ignoreQueryString, paramsFilter) => paramsFilter,
		(state, name, update, ignoreQueryString, paramsFilter, recoverParams) =>
			recoverParams,
		(
			state,
			name,
			update,
			ignoreQueryString,
			paramsFilter,
			recoverParams,
			recoverParamsFilter
		) => recoverParamsFilter,
	],
	(
		routerState,
		latestHistoryPathRecord,
		name,
		update,
		ignoreQueryString = false,
		paramsFilter,
		recoverParams,
		recoverParamsFilter
	) => {
		const historyParams = {
			...(recoverParams
				? {
						...latestHistoryPathRecord?.params?.path,
						...getParsedQueryString(
							latestHistoryPathRecord?.params?.queryString
						),
				  }
				: {}),
		};

		if (recoverParams && recoverParamsFilter?.length > 0) {
			// clear properties params with null or undefined value
			for (const property of Object.keys(historyParams)) {
				if (recoverParamsFilter.includes(property)) {
					delete historyParams[property];
				}
			}
		}

		let newParams = {
			...routerState?.params?.path,
			...(ignoreQueryString ? {} : routerState?.params?.parsedQueryString),
			...update,
		};

		// clear properties params with null or undefined value
		for (const property of Object.keys(newParams)) {
			if (!newParams[property] && newParams[property] !== false) {
				delete newParams[property];
			}
		}

		// apply params filter
		// params filter is not applyed on params from history
		if (!_isEmpty(paramsFilter)) {
			newParams = _omit(newParams, paramsFilter);
		}

		// add params from history
		newParams = {
			...newParams,
			...historyParams,
		};

		const router = getRouter();

		//use current path name if is nor defined
		const urlName = name || routerState.name;
		const url = router.pathFor(urlName, newParams);
		return url;
	}
);

//
// Custom UTEP url selectors
//
const getDarkModeActive = createSelector([getCurrent], routerState => {
	const isDark =
		routerState?.params?.parsedQueryString?.[routerConstants.darkMode] ===
		'true';
	return isDark;
});

const getQueryValuesByKey = createSelector(
	[getCurrent, (state, key) => key],
	(routerState, key) => {
		return routerState?.params?.parsedQueryString?.[key];
	}
);

const getTags = createSelector([getCurrent], routerState => {
	const tags =
		routerState?.params?.parsedQueryString?.[routerConstants.tags] || [];
	return getValueAsArray(tags);
});

const getHomepageScreen = createSelector([getCurrent], routerState => {
	const name = routerState?.name;
	const validScreens = Object.keys(screens);

	if (validScreens.includes(name)) {
		return name;
	} else {
		return defaultHomeScreen;
	}
});

export default {
	getCurrent,
	getDarkModeActive,
	getUrlForPath,
	getHomepageScreen,
	getQueryValuesByKey,
	getTags,
};
