import ActionTypes from '../../../constants/ActionTypes';

/**
 * Remove given value from filter
 * @param parameter {string}
 * @param value {string}
 */
const actionRemoveValueFromActiveFilter = (parameter, value) => {
	return {
		type: ActionTypes.WORLD_CEREAL.PRODUCT_METADATA_FILTER.ACTIVE_FILTER
			.REMOVE_VALUE,
		parameter,
		value,
	};
};

export default {
	removeValueFromActiveFilter: actionRemoveValueFromActiveFilter,
};
