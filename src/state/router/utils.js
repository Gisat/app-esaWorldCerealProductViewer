import {isArray as _isArray} from 'lodash';
import queryString from 'query-string';

export const getParsedQueryString = urlQueryString => {
	if (!urlQueryString) {
		return {};
	}
	const parsed = queryString.parse(urlQueryString, {arrayFormat: 'comma'});
	return parsed || {};
};

export const getValueAsArray = value => {
	return _isArray(value) ? value : [value];
};
