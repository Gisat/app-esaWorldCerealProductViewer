export default {
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
};
