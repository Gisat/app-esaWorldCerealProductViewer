import {Select as CommonSelect} from '@gisatcz/ptr-state';
import {createSelector} from 'reselect';
import {forIn as _forIn} from 'lodash';

const getActiveFilter = state =>
	state.worldCereal.productMetadataFilter.activeFilter;
const getFilterParametersAsObject = state =>
	state.worldCereal.productMetadataFilter.parameters;

const getFilterParameters = createSelector(
	[getFilterParametersAsObject],
	parameters => {
		return parameters && Object.values(parameters);
	}
);

const getActiveFilterParameters = createSelector(
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

export default {
	getActiveFilter,
	getActiveFilterParameters,

	getFilterParameters,
};
