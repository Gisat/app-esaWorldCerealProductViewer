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

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		default:
			return state;
	}
};
