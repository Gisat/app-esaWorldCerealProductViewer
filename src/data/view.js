import backgroundLayers from './layers/backgroundLayers';

export default {
	key: '371846f9-0270-4e43-a46a-db009cd5946a',
	data: {
		state: {
			worldCereal: {
				productMetadataFilter: {
					activeFilter: {},
				},
				configuration: {
					mapSetTools: {
						'productViewer-mapSet': {
							open: [
								'zoomControls',
								'backgroundLayersControl',
								'addMap',
								'compareMaps',
								'mapAttribution',
								'scale',
								'previewMap',
							],
							componentsByKey: {},
						},
					},
				},
			},
			components: {
				ProductFilter: {
					activeParameter: 'product',
					// parameterOrder: ['product', 'season', 'aez'], //temporary remove "aez"
					parameterOrder: ['product', 'season'],
				},
				Maps: {
					mode: 'set',
					scale: true,
					attribution: true,
					overviewMap: true,
				},
			},
			maps: {
				activeMapKey: 'ea10b274-dd71-4e58-b627-d2803ab891f7',
				activeSetKey: 'productViewer-mapSet',
				maps: {
					'ea10b274-dd71-4e58-b627-d2803ab891f7': {
						key: 'ea10b274-dd71-4e58-b627-d2803ab891f7',
					},
					overview: {
						key: 'overview',
						data: {
							backgroundLayer: backgroundLayers.esri_WorldGrayCanvas,
							view: {
								boxRange: 2000000,
								center: {
									lat: -15,
									lon: -50,
								},
							},
							viewLimits: {
								boxRangeRange: [1000000, 100000000],
							},
							layers: [
								{
									key: 'extent',
									type: 'vector',
									options: {
										style: {
											rules: [
												{
													styles: [
														{
															outlineWidth: 2,
															outlineColor: '#ff0000',
														},
													],
												},
											],
										},
									},
								},
							],
						},
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
								boxRange: 835000,
								center: {
									lat: -15,
									lon: -50,
								},
							},
							viewLimits: {
								boxRangeRange: [400, 10000000],
							},
						},
					},
				},
			},
		},
	},
};
