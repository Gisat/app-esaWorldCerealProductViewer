export default {
	key: 'fb76c73c-0e54-4f7c-b331-66110d13856f',
	data: {
		nameInternal: 'Active irrigation - classification',
		definition: {
			rules: [
				{
					styles: [
						{
							color: '#0065ea',
						},
						{
							bandIndex: 0,
							legend: true,
							values: {
								0: {
									color: null,
								},
								1: {
									color: '#a8a8a8',
									name: 'Non-irrigated',
								},
								2: {
									color: '#0065ea',
									name: 'Irrigated',
								},
							},
						},
						{
							bandIndex: 0,
							valueClasses: [
								{
									interval: [3, 255],
									intervalBounds: [true, true],
									color: null,
								},
							],
						},
					],
				},
			],
		},
	},
};
