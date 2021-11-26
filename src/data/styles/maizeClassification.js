export default {
	key: 'e8b73cf7-0cb5-4e68-92a0-7f3106422c13',
	data: {
		nameInternal: 'Maize - classification',
		definition: {
			rules: [
				{
					styles: [
						{
							color: '#e0cd00',
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
									name: 'Other crop',
								},
								2: {
									color: '#e0cd00',
									name: 'Maize',
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
