import {stateManagement} from '@gisatcz/ptr-utils';
import ActionTypes from '../../../constants/ActionTypes';

// TODO move activeFilter out from initial state
const INITIAL_STATE = {
	parameters: {
		aez_id: {
			key: 'aez_id',
			name: 'Zone',
			type: 'checkbox',
			orderDirection: 'asc',
			options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
		},
		product: {
			key: 'product',
			// dataType: 'cases',
			name: 'Product',
			type: 'checkbox',
			orderDirection: 'asc',
			options: ['annualcropland', 'wheat', 'maize', 'irrigation'],
		},
		season: {
			key: 'season',
			name: 'Season',
			type: 'checkbox',
			orderDirection: 'asc',
			options: ['summer1', 'summer2', 'winter'],
		},
	},
};

const addValueToActiveFilter = (state, parameter, value) => {
	const newValues = stateManagement.addItem(
		state.activeFilter[parameter] || [],
		value
	);

	return {
		...state,
		activeFilter: {
			...state.activeFilter,
			[parameter]: newValues,
		},
	};
};

const removeValueFromActiveFilter = (state, parameter, value) => {
	const valueIndex = state.activeFilter[parameter].indexOf(value);

	if (valueIndex > -1) {
		const newValues = state.activeFilter[parameter].filter(
			(val, index) => index !== valueIndex
		);

		return {
			...state,
			activeFilter: {
				...state.activeFilter,
				[parameter]: newValues.length ? newValues : null,
			},
		};
	} else {
		return state;
	}
};

const setActiveFilter = (state, activeFilter) => {
	return {
		...state,
		activeFilter,
	};
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ActionTypes.WORLD_CEREAL.PRODUCT_METADATA_FILTER.ACTIVE_FILTER
			.ADD_VALUE:
			return addValueToActiveFilter(state, action.parameter, action.value);
		case ActionTypes.WORLD_CEREAL.PRODUCT_METADATA_FILTER.ACTIVE_FILTER
			.REMOVE_VALUE:
			return removeValueFromActiveFilter(state, action.parameter, action.value);
		case ActionTypes.WORLD_CEREAL.PRODUCT_METADATA_FILTER.ACTIVE_FILTER.SET:
			return setActiveFilter(state, action.activeFilter);
		default:
			return state;
	}
};
