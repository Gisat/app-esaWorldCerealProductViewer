import backgroundLayers from './layers/backgroundLayers';

export default {
	key: '371846f9-0270-4e43-a46a-db009cd5946a',
	data: {
		state: {
			worldCereal: {},
			maps: {
				activeMapKey: 'productViewer-map-1',
				activeSetKey: 'productViewer-mapSet',
				maps: {
					'productViewer-map-1': {
						key: 'productViewer-map-1',
						data: {
							layers: [
								{
									key: 'extent',
									type: 'vector',
									options: {
										features: [],
									},
								},
							],
						},
					},
					'productViewer-map-2': {
						key: 'productViewer-map-2',
						data: {
							layers: [
								{
									key: 'extent',
									type: 'vector',
									options: {
										features: [],
									},
								},
							],
						},
					},
					'productViewer-map-3': {
						key: 'productViewer-map-3',
						data: {
							layers: [
								{
									key: 'extent',
									type: 'vector',
									options: {
										features: [],
									},
								},
							],
						},
					},
					'productViewer-map-4': {
						key: 'productViewer-map-4',
						data: {
							layers: [
								{
									key: 'extent',
									type: 'vector',
									options: {
										features: [],
									},
								},
							],
						},
					},
				},
				sets: {
					'productViewer-mapSet': {
						key: 'productViewer-mapSet',
						activeMapKey: 'productViewer-map-1',
						maps: [
							'productViewer-map-1',
							'productViewer-map-2',
							'productViewer-map-3',
							'productViewer-map-4',
						],
						sync: {
							center: true,
							boxRange: true,
						},
						data: {
							backgroundLayer: backgroundLayers.esri_WorldGrayCanvas,
							view: {
								boxRange: 400000,
								center: {
									lat: -33,
									lon: -59,
								},
							},
							viewLimits: {
								boxRangeRange: [10000, 10000000],
							},
						},
					},
				},
			},
		},
	},
};
