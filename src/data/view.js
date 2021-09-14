import backgroundLayers from './layers/backgroundLayers';
import annualCroplandClassification from './styles/annualCroplandClassification';

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
								// {
								// 	key: '2455c3a9e1ffbfc72dcd1b0c3ff1ccf2-207',
								// 	layerKey: '2455c3a9e1ffbfc72dcd1b0c3ff1ccf2-207',
								// 	type: 'cog',
								// 	options: {
								// 		url: 'https://modis-vi-nasa.s3-us-west-2.amazonaws.com/MOD13A1.006/2018.01.01.tif',
								// 		style: annualCroplandClassification.data.definition,
								// 	},
								// },
							],
						},
					},
					'productViewer-map-2': {
						key: 'productViewer-map-2',
						data: {
							layers: [],
						},
					},
					'productViewer-map-3': {
						key: 'productViewer-map-3',
						data: {
							layers: [],
						},
					},
					'productViewer-map-4': {
						key: 'productViewer-map-4',
						data: {
							layers: [],
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
								boxRangeRange: [5000, 10000000],
							},
						},
					},
				},
			},
		},
	},
};
