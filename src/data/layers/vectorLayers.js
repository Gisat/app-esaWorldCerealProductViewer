import aezGeometries from '../geometries/aez.json';

export const aez = {
	key: 'aez',
	layerKey: 'aez',
	name: 'Agro-ecological zones (AEZ)',
	type: 'vector',
	opacity: 1,
	options: {
		features: aezGeometries.features,
		selectable: true,
		style: {
			rules: [
				{
					styles: [
						{
							outlineWidth: 2,
							outlineColor: '#000000',
							fill: '#ffffff',
							fillOpacity: 1,
						},
					],
				},
			],
		},
	},
};
