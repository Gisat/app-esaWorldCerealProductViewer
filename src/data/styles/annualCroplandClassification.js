export default {
	key: '92519f8a-59b4-4b09-b076-1df38b7cab50',
	data: {
		nameInternal: 'Annual cropland - classification',
		definition: {
			rules: [
				{
					styles: [
						{
							color: '#e41a1c',
						},
						{
							bandIndex: 0,
							legend: true,
							values: {
								0: {
									color: null,
								},
								2: {
									color: '#e41a1c',
									name: 'Annual cropland',
								},
							},
						},
						{
							bandIndex: 0,
							valueClasses: [
								{
									interval: [0, 1],
									intervalBounds: [false, true],
									color: null,
								},
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
