import {Select as CommonSelect} from '@gisatcz/ptr-state';
import {createSelector} from 'reselect';
import {createCachedSelector} from 're-reselect';
import {forIn as _forIn} from 'lodash';

const getActiveFilter = state =>
	state.worldCereal.productMetadataFilter.activeFilter;
const getFilterParametersAsObject = state =>
	state.worldCereal.productMetadataFilter.parameters;

/**
 * Get all parameters for filtering as array
 * @param {Object} state
 * @return {Array} A collection of parameters for filtering
 */
const getFilterParameters = createSelector(
	[getFilterParametersAsObject],
	parameters => {
		return parameters && Object.values(parameters);
	}
);

/**
 * Get active filter extended with parameters
 * @param {Object} state
 * @return {Array} A collection of parameters for filtering
 */
const getActiveFilterWithFilterParameters = createSelector(
	[
		getActiveFilter,
		getFilterParametersAsObject,
		CommonSelect.cases.getAllAsObject,
	],
	(activeFilter, params, cases) => {
		if (activeFilter && params) {
			let data = [];
			_forIn(activeFilter, (values, key) => {
				if (values) {
					const parameter = params[key];
					const dataType = parameter.dataType;
					let finalValues;

					if (dataType === 'cases') {
						finalValues = values.map(value => cases[value] || value);
					}

					data.push({
						parameter,
						values: finalValues || values,
					});
				}
			});

			return data.length ? data : null;
		} else {
			return null;
		}
	}
);

/**
 * True, if given value is present in active filter
 * @param {Object} state
 * @param {string} parameter
 * @param {string} value
 * @return {boolean}
 */
const isValueInActiveFilter = createCachedSelector(
	[
		getActiveFilter,
		(state, parameter) => parameter,
		(state, parameter, value) => value,
	],
	(activeFilter, parameter, value) => {
		if (activeFilter && parameter && value) {
			const parameterOptions = activeFilter[parameter];
			return !!(parameterOptions && parameterOptions.indexOf(value) > -1);
		} else {
			return false;
		}
	}
)((state, parameter, value) => `${parameter}_${value}`);

export default {
	getActiveFilter,
	getActiveFilterWithFilterParameters,

	getFilterParameters,

	isValueInActiveFilter,
};
