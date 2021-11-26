export default {
	key: '829f8a76-9746-40f7-bb19-2bb2a09e99a2',
	data: {
		nameInternal: 'Active cropland - classification',
		definition: {
			rules: [
				{
					styles: [
						{
							color: '#2ca52a',
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
									name: 'Non-active cropland',
								},
								2: {
									color: '#2ca52a',
									name: 'Active cropland',
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
