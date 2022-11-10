import {
	Select as CommonSelect,
	createRecomputeSelector,
	createRecomputeObserver,
	recomputeSelectorOptions,
	commonSelectors,
	commonHelpers,
} from '@gisatcz/ptr-state';
import {createCachedSelector} from 're-reselect';
import {
	without as _without,
	orderBy as _orderBy,
	compact as _compact,
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

const getAvailableAttributeKeys = createRecomputeSelector(chartComponentKey => {
	const componentState =
		CommonSelect.data.components.getComponentStateByKeyObserver(
			chartComponentKey
		);

	if (componentState) {
		const activeKeys = commonSelectors.getAllActiveKeysObserver();
		let fullFilter = commonHelpers.mergeFilters(
			activeKeys,
			componentState.filterByActive,
			componentState.filter
		);
		const relations = CommonSelect.data.attributeRelations.getIndexed({
			...fullFilter,
			layerTemplateKey: componentState.layerTemplateKey,
		});
		if (relations?.length) {
			return relations.map(relation => relation.data.attributeKey);
		} else {
			return null;
		}
	} else {
		return null;
	}
}, recomputeSelectorOptions);

const getDataForNivoBarChart = createRecomputeSelector(componentKey => {
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
							return {...item.data, id: item.key};
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
}, recomputeSelectorOptions);

export default {
	getChartMetadata,
	getAvailableAttributeKeys,
	getDataForNivoBarChart,
};
