// App specific actions
import Select from '../Select';
import {getRouter} from '../../router';
import {getValueAsArray} from './utils';
import {xor as _xor} from 'lodash';
//TODO separate to router logic
const updateAppUrl = (name, update) => {
	return (dispatch, getState) => {
		//selector get url for route [name, update]
		const url = Select.router.getUrlForPath(getState(), name, update);
		const router = getRouter();
		router.nav(url);
	};
};

/**
 * Add queryValue to url under queryKey if queryKey is not in url yet.
 * If queryValue under queryKey is in url, the queryValue ir removed.
 * If queryKey is in url with different values, new queryValue is just add.
 * @param {string} queryKey
 * @param {string} queryValue
 * @returns
 */
const toggleQueryString = (queryKey, queryValue) => {
	return (dispatch, getState) => {
		const routerState = Select.router.getCurrent(getState());
		const queryStrings = routerState?.params?.parsedQueryString || {};

		//default update is about remove queryKey from url
		const update = {[queryKey]: null};
		if (Object.hasOwn(queryStrings, queryKey)) {
			const queryValues =
				routerState?.params?.parsedQueryString?.[queryKey] || [];
			const queryValuesAsArray = getValueAsArray(queryValues);
			const updatedQueryValues = _xor(queryValuesAsArray, [queryValue]);
			if (updatedQueryValues.length > 0) {
				update[queryKey] = updatedQueryValues;
			}
		} else {
			update[queryKey] = [queryValue];
		}

		dispatch(updateAppUrl(undefined, update));
	};
};

export default {
	updateAppUrl,
	toggleQueryString,
};
