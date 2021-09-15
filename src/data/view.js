import backgroundLayers from './layers/backgroundLayers';
import annualCroplandClassification from './styles/annualCroplandClassification';

export default {
	key: '371846f9-0270-4e43-a46a-db009cd5946a',
	data: {
		state: {
			worldCereal: {},
			maps: {
				activeMapKey: 'ea10b274-dd71-4e58-b627-d2803ab891f7',
				activeSetKey: 'productViewer-mapSet',
				maps: {
					'ea10b274-dd71-4e58-b627-d2803ab891f7': {
						key: 'ea10b274-dd71-4e58-b627-d2803ab891f7',
						// data: {
						// 	layers: [
						// {
						// 	key: '1',
						// 	layerKey: '1',
						// 	type: 'cog',
						// 	options: {
						// 		url: 'https://landsat-pds.s3.amazonaws.com/c1/L8/050/200/LC08_L1GT_050200_20200413_20200413_01_RT/LC08_L1GT_050200_20200413_20200413_01_RT_B1.TIF',
						// 		style: annualCroplandClassification.data.definition,
						// 	},
						// },
						// {
						// 	key: '2',
						// 	layerKey: '2',
						// 	type: 'cog',
						// 	options: {
						// 		url: 'https://landsat-pds.s3.amazonaws.com/c1/L8/050/200/LC08_L1GT_050200_20200413_20200413_01_RT/LC08_L1GT_050200_20200413_20200413_01_RT_B10.TIF',
						// 		style: annualCroplandClassification.data.definition,
						// 	},
						// },
						// {
						// 	key: '3',
						// 	layerKey: '3',
						// 	type: 'cog',
						// 	options: {
						// 		url: 'https://landsat-pds.s3.amazonaws.com/c1/L8/050/200/LC08_L1GT_050200_20200413_20200413_01_RT/LC08_L1GT_050200_20200413_20200413_01_RT_B11.TIF',
						// 		style: annualCroplandClassification.data.definition,
						// 	},
						// },
						// {
						// 	key: '4',
						// 	layerKey: '4',
						// 	type: 'cog',
						// 	options: {
						// 		url: 'https://landsat-pds.s3.amazonaws.com/c1/L8/050/200/LC08_L1GT_050200_20200413_20200413_01_RT/LC08_L1GT_050200_20200413_20200413_01_RT_B2.TIF',
						// 		style: annualCroplandClassification.data.definition,
						// 	},
						// },
						// {
						// 	key: '5',
						// 	layerKey: '5',
						// 	type: 'cog',
						// 	options: {
						// 		url: 'https://landsat-pds.s3.amazonaws.com/c1/L8/050/001/LC08_L1GT_050001_20170811_20170811_01_RT/LC08_L1GT_050001_20170811_20170811_01_RT_B10.TIF',
						// 		style: annualCroplandClassification.data.definition,
						// 	},
						// },
						// {
						// 	key: '6',
						// 	layerKey: '6',
						// 	type: 'cog',
						// 	options: {
						// 		url: 'https://landsat-pds.s3.amazonaws.com/c1/L8/050/001/LC08_L1GT_050001_20170811_20170811_01_RT/LC08_L1GT_050001_20170811_20170811_01_RT_B11.TIF',
						// 		style: annualCroplandClassification.data.definition,
						// 	},
						// },
						// {
						// 	key: '7',
						// 	layerKey: '7',
						// 	type: 'cog',
						// 	options: {
						// 		url: 'https://landsat-pds.s3.amazonaws.com/c1/L8/050/001/LC08_L1GT_050001_20170811_20170811_01_RT/LC08_L1GT_050001_20170811_20170811_01_RT_B2.TIF',
						// 		style: annualCroplandClassification.data.definition,
						// 	},
						// },
						// {
						// 	key: '8',
						// 	layerKey: '8',
						// 	type: 'cog',
						// 	options: {
						// 		url: 'https://landsat-pds.s3.amazonaws.com/c1/L8/050/001/LC08_L1GT_050001_20170811_20170811_01_RT/LC08_L1GT_050001_20170811_20170811_01_RT_B3.TIF',
						// 		style: annualCroplandClassification.data.definition,
						// 	},
						// },
						// {
						// 	key: '9',
						// 	layerKey: '9',
						// 	type: 'cog',
						// 	options: {
						// 		url: 'https://landsat-pds.s3.amazonaws.com/c1/L8/050/001/LC08_L1GT_050001_20170811_20170811_01_RT/LC08_L1GT_050001_20170811_20170811_01_RT_B4.TIF',
						// 		style: annualCroplandClassification.data.definition,
						// 	},
						// },
						// {
						// 	key: '10',
						// 	layerKey: '10',
						// 	type: 'cog',
						// 	options: {
						// 		url: 'https://landsat-pds.s3.amazonaws.com/c1/L8/050/001/LC08_L1GT_050001_20170811_20170811_01_RT/LC08_L1GT_050001_20170811_20170811_01_RT_B5.TIF',
						// 		style: annualCroplandClassification.data.definition,
						// 	},
						// },
						// 	],
						// },
					},
					'494b969a-3f03-4b88-b776-39079687309b': {
						key: '494b969a-3f03-4b88-b776-39079687309b',
					},
				},
				sets: {
					'productViewer-mapSet': {
						key: 'productViewer-mapSet',
						activeMapKey: 'ea10b274-dd71-4e58-b627-d2803ab891f7',
						maps: [
							'ea10b274-dd71-4e58-b627-d2803ab891f7',
							'494b969a-3f03-4b88-b776-39079687309b',
						],
						sync: {
							center: true,
							boxRange: true,
						},
						data: {
							backgroundLayer: backgroundLayers.esri_WorldImagery,
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
