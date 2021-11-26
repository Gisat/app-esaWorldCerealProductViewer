export default {
	key: '67950ddf-bfd3-4c0b-8b92-ef0580a67455',
	data: {
		nameInternal: 'Cereals - classification',
		definition: {
			rules: [
				{
					styles: [
						{
							color: '#ae3aba',
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
									color: '#ae3aba',
									name: 'Cereals',
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
