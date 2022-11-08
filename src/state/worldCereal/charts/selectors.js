import {
	Select as CommonSelect,
	createRecomputeSelector,
	createRecomputeObserver,
	recomputeSelectorOptions,
	commonSelectors,
	commonHelpers,
} from '@gisatcz/ptr-state';
import {createCachedSelector} from 're-reselect';
import {without as _without, orderBy as _orderBy} from 'lodash';

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
		const {valueAttributeKeys} = metadata;
		const {data: chartData} = data;
		if (chartData) {
			const finalData =
				chartData &&
				chartData.map(item => {
					return {...item.data, id: item.key};
				});

			// TODO return just first 10 areas for now
			return _orderBy(
				finalData,
				item => {
					return item[valueAttributeKeys[0]]; // TODO take value attribute key for now
				},
				'desc'
			).slice(0, 10);
		} else {
			return null;
		}
	} else {
		return null;
	}
}, recomputeSelectorOptions);

const getDataForNivoScatterChart = createRecomputeSelector(componentKey => {
	const data = CommonSelect.data.components.getDataForCartesianChart({
		stateComponentKey: componentKey,
	});
	const metadata = getChartMetadataObserver(componentKey);

	if (metadata && data) {
		const {valueAttributeKeys} = metadata;
		const {data: chartData} = data;
		if (chartData?.length && valueAttributeKeys?.length === 2) {
			const attributeKeysMapping = {
				x: valueAttributeKeys[0],
				y: valueAttributeKeys[1],
			};

			const finalData =
				chartData &&
				chartData.map(item => {
					const itemData = {
						...item.data,
						x: item?.data?.[attributeKeysMapping.x],
						y: item?.data?.[attributeKeysMapping.y],
					};

					return {data: [itemData], id: item.key};
				});

			return finalData;
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
	getDataForNivoScatterChart,
};
