import ActionTypes from '../../../constants/ActionTypes';

/**
 * Add given value to filter
 * @param parameter {string}
 * @param value {string}
 */
const actionAddValueToActiveFilter = (parameter, value) => {
	return {
		type: ActionTypes.WORLD_CEREAL.PRODUCT_METADATA_FILTER.ACTIVE_FILTER
			.ADD_VALUE,
		parameter,
		value,
	};
};

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
	addValueToActiveFilter: actionAddValueToActiveFilter,
	removeValueFromActiveFilter: actionRemoveValueFromActiveFilter,
};
