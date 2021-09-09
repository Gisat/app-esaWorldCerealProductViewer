import backgroundLayers from './layers/backgroundLayers';

export default {
	key: '371846f9-0270-4e43-a46a-db009cd5946a',
	data: {
		state: {
			worldCereal: {},
			maps: {
				activeMapKey: 'productViewer-map-1',
				activeSetKey: 'productViewer-set',
				maps: {
					'productViewer-map-1': {
						key: 'productViewer-map-1',
						data: {},
					},
				},
				sets: {
					'productViewer-set': {
						key: 'productViewer-set',
						activeMapKey: 'productViewer-map-1',
						maps: ['productViewer-map-1'],
						sync: {
							center: true,
							boxRange: true,
						},
						data: {
							backgroundLayer: backgroundLayers.imagery,
							view: {
								boxRange: 400000,
								center: {
									lat: -33,
									lon: -59,
								},
							},
							viewLimits: {
								boxRangeRange: [10000, 8000000],
							},
						},
					},
				},
			},
		},
	},
};
