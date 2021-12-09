import backgroundLayers from './layers/backgroundLayers';

export default {
	key: '371846f9-0270-4e43-a46a-db009cd5946a',
	data: {
		state: {
			worldCereal: {
				productMetadataFilter: {
					activeFilter: {},
				},
			},
			components: {
				ProductFilter: {
					activeParameter: 'product',
					parameterOrder: ['product', 'season', 'aez'],
				},
				Maps: {
					mode: 'set',
				},
			},
			maps: {
				activeMapKey: 'ea10b274-dd71-4e58-b627-d2803ab891f7',
				activeSetKey: 'productViewer-mapSet',
				maps: {
					'ea10b274-dd71-4e58-b627-d2803ab891f7': {
						key: 'ea10b274-dd71-4e58-b627-d2803ab891f7',
					},
				},
				sets: {
					'productViewer-mapSet': {
						key: 'productViewer-mapSet',
						activeMapKey: 'ea10b274-dd71-4e58-b627-d2803ab891f7',
						maps: ['ea10b274-dd71-4e58-b627-d2803ab891f7'],
						sync: {
							center: true,
							boxRange: true,
						},
						data: {
							backgroundLayer: backgroundLayers.esri_WorldImagery,
							view: {
								boxRange: 800000,
								center: {
									lat: 47,
									lon: 1,
								},
							},
							viewLimits: {
								boxRangeRange: [1000, 10000000],
							},
						},
					},
				},
			},
		},
	},
};
