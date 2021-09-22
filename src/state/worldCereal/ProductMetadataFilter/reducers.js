import ActionTypes from '../../../constants/ActionTypes';

// TODO move activeFilter out from initial state
const INITIAL_STATE = {
	parameters: {
		aez_id: {
			key: 'aez_id',
			name: 'Zone',
			type: 'checkbox',
			orderDirection: 'asc',
		},
		product: {
			key: 'product',
			dataType: 'cases',
			name: 'Product',
			type: 'checkbox',
			orderDirection: 'asc',
		},
	},
	activeFilter: {
		aez_id: null,
		product: ['annualcropland', 'wheat'],
	},
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

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ActionTypes.WORLD_CEREAL.PRODUCT_METADATA_FILTER.ACTIVE_FILTER
			.REMOVE_VALUE:
			return removeValueFromActiveFilter(state, action.parameter, action.value);
		default:
			return state;
	}
};
