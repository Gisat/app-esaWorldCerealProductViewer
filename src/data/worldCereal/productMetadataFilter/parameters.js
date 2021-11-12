export default {
	aez: {
		key: 'aez',
		name: 'Zone',
		type: 'checkbox',
		orderDirection: 'asc',
		disabled: true,
		options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
	},
	product: {
		key: 'product',
		dataType: 'cases',
		name: 'Product',
		type: 'checkbox',
		orderDirection: 'asc',
		options: [
			'annualcropland',
			'wheat',
			'maize',
			'activecropland',
			'activeirrigation',
			// ???
			'cereals',
			'springcereals',
			'wintercereals',
			'springwheat',
			'winterwheat',
			'irrigation-v1',
			'irrigation-v2',
		],
	},
	season: {
		key: 'season',
		name: 'Season',
		type: 'checkbox',
		orderDirection: 'asc',
		options: ['annual', 'summer1', 'summer2', 'winter'],
	},
};
