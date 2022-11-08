import backgroundLayers from '../layers/backgroundLayers';

export default {
	key: '95ad1c41-9027-4546-9fd4-f7210cdbf493',
	data: {
		nameDisplay: 'Statistics',
		nameInternal: 'statistics',
		description: 'based on WorldCereal products',
		state: {
			worldCereal: {
				configuration: {
					mapSetTools: {
						'statistics-mapSet': {
							open: [
								'zoomControls',
								'layerControls',
								'mapAttribution',
								'scale',
							],
							available: ['layerControls', 'zoomControls'],
							componentsByKey: {
								zoomControls: {
									icon: 'plus-thick',
									title: 'Zoom controls',
									settings: {
										horizontal: false,
									},
								},
								mapAttribution: {
									icon: 'info',
									title: 'Map Attribution',
								},
								layerControls: {
									icon: 'layers',
									title: 'Background layers control',
								},
							},
						},
					},
				},
			},
			components: {
				Maps: {
					mode: 'set',
				},
				GlobalTopTenBarChart: {
					title: 'Title',
					subtitle: 'Subtitle',
					settings: {
						indexBy: 'id',
						margin: {top: 10, right: 10, bottom: 35, left: 55},
						padding: 0.05,
						valueScale: {type: 'linear'},
						indexScale: {type: 'band', round: true},
						axisTop: null,
						axisRight: null,
						axisBottom: {
							enable: true,
							legend: 'Units',
							legendPosition: 'middle',
							legendOffset: 28,
							tickPadding: 2,
						},
						axisLeft: {
							tickSize: 0,
							tickPadding: 3,
							legend: 'Area [ha]',
							legendPosition: 'middle',
							legendOffset: -50,
						},
						groupMode: 'grouped',
						enableGridY: true,
						enableLabel: false,
						labelSkipHeight: 13,
						labelTextColor: {from: 'color', modifiers: [['darker', 3]]},
						theme: {
							fontSize: 11,
							textColor: 'var(--base40)',
							axis: {
								legend: {
									text: {
										fontSize: 12,
										fontWeight: 'bold',
									},
								},
								ticks: {
									line: {
										stroke: 'var(--base40)',
									},
								},
							},
							grid: {
								line: {
									stroke: 'var(--base20)',
								},
							},
						},
					},
				},
				GlobalSharePieChart: {
					name: 'Global: Product share',
				},
				GlobalCountriesBarChart: {
					name: 'Global: Product in countries',
				},
			},
			data: {
				components: {
					GlobalTopTenBarChart: {
						type: 'barChart',
						metadataModifiers: {},
						filterByActive: {
							application: true,
							scope: true,
							areaTreeLevel: true,
							period: true,
							case: true,
						},
						areaTreeLevelKey: 'a53a54dd-8a0b-4e28-b7aa-aa566cd2ba47',
						attributeKeys: ['4fb212bb-ff1a-46d7-8fce-e341e7f08376'],
						start: 1,
						length: 300,
					},
				},
				sets: {
					GlobalNoSelected: {
						components: ['GlobalTopTenBarChart'],
					},
					GlobalOneSelected: {
						components: ['GlobalSharePieChart'],
					},
					GlobalMultipleSelected: {
						components: ['GlobalCountriesBarChart'],
					},
				},
			},
			maps: {
				activeMapKey: 'e44839a8-b1f5-4f6f-8049-30aeb967eecf',
				activeSetKey: 'statistics-mapSet',
				maps: {
					'e44839a8-b1f5-4f6f-8049-30aeb967eecf': {
						key: 'e44839a8-b1f5-4f6f-8049-30aeb967eecf',
						data: {
							layers: [
								{
									key: 'statistics-global',
									layerKey: 'statistics-global',
									options: {
										hoverable: true,
										selectable: true,
										selected: {
											'764ff34a-2eee-4d82-8ffe-87da6ed1a3f7': {},
										},
										nameAttributeKey: '5f6a119b-addf-467e-ab1f-e07e4cdf79a6',
										attributeFilter: {
											caseKey: '577b253f-754f-421e-94a2-092f092b4947',
											periodKey: '6a7a4193-1339-4172-b54d-817c3e8cd6f7',
										},
									},
									styleKey: 'af4c5310-405f-426d-9bbd-098593ea2ac4',
									areaTreeLevelKey: 'a53a54dd-8a0b-4e28-b7aa-aa566cd2ba47',
									filterByActive: {
										application: true,
										scope: true,
										areaTreeLevel: true,
									},
									metadataModifiers: {},
								},
							],
						},
					},
				},
				sets: {
					'statistics-mapSet': {
						key: 'statistics-mapSet',
						activeMapKey: 'e44839a8-b1f5-4f6f-8049-30aeb967eecf',
						maps: ['e44839a8-b1f5-4f6f-8049-30aeb967eecf'],
						sync: {
							center: true,
							boxRange: true,
						},
						data: {
							backgroundLayer: backgroundLayers.openStreetMap_Mapnik,
							view: {
								boxRange: 12000000,
								center: {
									lat: 40,
									lon: 0,
								},
							},
							viewLimits: {
								boxRangeRange: [1000, 20000000],
							},
						},
					},
				},
			},
			areas: {
				areaTreeLevels: {
					activeKey: 'a53a54dd-8a0b-4e28-b7aa-aa566cd2ba47',
				},
			},
			cases: {
				activeKey: '577b253f-754f-421e-94a2-092f092b4947',
			},
			scopes: {
				activeKey: '10de783b-810b-4f8a-aceb-4c9e9f91d4d3',
			},
			periods: {
				activeKey: '1f5cf9d2-58cc-4463-8ef7-bcc0c4932a08',
			},
			selections: {
				activeKey: '764ff34a-2eee-4d82-8ffe-87da6ed1a3f7',
				data: [
					{
						key: '764ff34a-2eee-4d82-8ffe-87da6ed1a3f7',
						data: {
							color: '#00fffe',
							hoveredColor: '#1efbff',
						},
					},
				],
			},
		},
	},
};
