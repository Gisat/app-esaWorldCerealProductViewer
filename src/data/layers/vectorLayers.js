import aezGeometries from '../geometries/aez.json';

export const aez = {
	key: 'aez',
	layerKey: 'aez',
	name: 'AEZ',
	type: 'vector',
	opacity: 0.8,
	options: {
		features: aezGeometries.features,
		pickable: true,
		selectable: true,
		style: {
			rules: [
				{
					styles: [
						{
							outlineWidth: 2,
							outlineColor: '#000000',
							fill: '#ffffff',
							fillOpacity: 0.4,
						},
					],
				},
			],
		},
	},
};
