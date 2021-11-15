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
							valueClasses: [
								{
									interval: [0, 99],
									intervalBounds: [true, true],
									color: null,
								},
								{
									interval: [101, 255],
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
