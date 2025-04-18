import {
	Select as CommonSelect,
	createRecomputeSelector,
	createRecomputeObserver,
	recomputeSelectorOptions,
} from '@gisatcz/ptr-state';
import {createCachedSelector} from 're-reselect';
import {
	without as _without,
	orderBy as _orderBy,
	compact as _compact,
	forIn as _forIn,
	isEmpty as _isEmpty,
} from 'lodash';

const getChartMetadata = createCachedSelector(
	[
		CommonSelect.data.components.getComponentStateByKey,
		CommonSelect.components.getByComponentKey,
	],
	(dataComponentMetadata, componentMetadata) => {
		if (componentMetadata && dataComponentMetadata) {
			const valueAttributeKeys = _without(
				dataComponentMetadata.attributeKeys,
				componentMetadata.nameAttributeKey
			);

			return {
				...componentMetadata,
				...dataComponentMetadata,
				valueAttributeKeys,
			};
		} else {
			return componentMetadata || dataComponentMetadata || null;
		}
	}
)((state, componentKey) => componentKey);

const getChartMetadataObserver = createRecomputeObserver(getChartMetadata);

const getChartTitle = createCachedSelector(
	[
		(state, componentKey) =>
			CommonSelect.components.get(state, componentKey, 'title'),
		(state, componentKey, title) => title,
	],
	(componentTitle, givenTitle) => {
		return `${componentTitle}${givenTitle || ''}`;
	}
)((state, componentKey) => componentKey);

const getChartSubtitle = createCachedSelector(
	[
		(state, componentKey) =>
			CommonSelect.components.get(state, componentKey, 'subtitle'),
		(state, componentKey, subtitle) => subtitle || null,
	],
	(componentSubtitle, givenSubtitle) => {
		return `${componentSubtitle}${givenSubtitle || ''}`;
	}
)((state, componentKey) => componentKey);

const getDataForNivoBarChart = createRecomputeSelector(
	(componentKey = 'chart') => {
		const data = CommonSelect.data.components.getDataForCartesianChart({
			stateComponentKey: componentKey,
		});
		const metadata = getChartMetadataObserver(componentKey);

		if (metadata && data) {
			const {attributeOrder, options, settings} = metadata;
			const {data: chartData} = data;

			if (chartData) {
				let adjustedData =
					chartData &&
					_compact(
						chartData.map(item => {
							if (item) {
								return {
									...item.data,
									id: item.name,
									name: item.name,
									key: item.key,
								};
							} else {
								return null;
							}
						})
					);

				// sort data
				if (attributeOrder) {
					const [attributeForOrdering, orderDirection] = attributeOrder[0]; // TODO order just by one attribute
					adjustedData = _orderBy(
						adjustedData,
						item => {
							return item?.[attributeForOrdering];
						},
						orderDirection
					);
				}

				// trim data
				if (options?.limit) {
					adjustedData = adjustedData.slice(0, options?.limit);
				}

				// flip data
				if (settings?.layout === 'horizontal') {
					adjustedData.reverse();
				}

				return adjustedData;
			} else {
				return null;
			}
		} else {
			return null;
		}
	},
	recomputeSelectorOptions
);

const getDataForNivoDonutChart = createRecomputeSelector(
	(componentKey = 'chart') => {
		const data = CommonSelect.data.components.getDataForCartesianChart({
			stateComponentKey: componentKey,
		});
		const metadata = getChartMetadataObserver(componentKey);

		if (metadata && data) {
			const {options} = metadata;
			const {data: chartData} = data;

			if (chartData?.length) {
				const {key, data: attributes} = chartData[0];
				const fragments = [];
				let total = 0;
				_forIn(attributes, value => {
					total += value;
					fragments.push({
						key,
						value,
						color: 'var(--accent70)',
					});
				});

				if (options?.valuesAsPercentage) {
					fragments.push({
						key: 'rest',
						value: 100 - total,
						color: 'rgba(var(--base50rgb), .5)',
					});
				}

				return fragments;
			} else {
				return null;
			}
		} else {
			return null;
		}
	},
	recomputeSelectorOptions
);
const getPeriodsAsObjectObserver = createRecomputeObserver(
	CommonSelect.periods.getAllAsObject
);

const getDataForHeatMapTable = createRecomputeSelector(
	(componentKey = 'chart', config) => {
		const componentState =
			CommonSelect.data.components.getComponentStateByKeyObserver(componentKey);
		if (componentState) {
			const dataForTable = {};
			const periods = getPeriodsAsObjectObserver();
			componentState?.components.forEach(stateComponentKey => {
				const subcomponentState =
					CommonSelect.data.components.getComponentStateByKeyObserver(
						stateComponentKey
					);

				const periodKey = subcomponentState?.metadataModifiers?.periodKey;
				const periodName = periods?.[periodKey]?.data?.nameDisplay;
				const data = CommonSelect.data.components.getDataForCartesianChart({
					stateComponentKey,
				});

				const attributes = data?.data?.[0]?.data;
				if (attributes) {
					_forIn(attributes, (value, attributeKey) => {
						const rec = {
							x: periodName,
							y: value / 100,
						};

						// add record for attribute (and create attribute item, if it doesn't exist
						if (dataForTable[attributeKey]) {
							dataForTable[attributeKey].data.push(rec);
						} else {
							dataForTable[attributeKey] = {
								id: attributeKey,
								data: [rec],
							};
						}
					});
				}
			});

			if (!_isEmpty(dataForTable)) {
				let data = Object.values(dataForTable);
				if (config?.nameByAttributeKey) {
					data = data.map(item => {
						const name = config?.nameByAttributeKey?.[item.id] || item.id;
						return {
							...item,
							id: name,
						};
					});
				}

				if (config?.order) {
					return _orderBy(data, config.order[0], config.order[1]);
				}

				return data;
			} else {
				return [];
			}
		} else {
			return [];
		}
	},
	recomputeSelectorOptions
);

export default {
	getChartMetadata,
	getChartTitle,
	getChartSubtitle,
	getDataForNivoBarChart,
	getDataForNivoDonutChart,
	getDataForHeatMapTable,
};
