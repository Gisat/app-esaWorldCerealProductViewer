import {createSelector} from 'reselect';
import {find as _find, omit as _omit, includes as _includes} from 'lodash';
import {
	recomputeSelectorOptions,
	createRecomputeSelector,
	createRecomputeObserver,
	Select as CommonSelect,
} from '@gisatcz/ptr-state';
import {STATISTICSLAYERKEY, globalAreaLevelKey} from '../../../constants/app';

const getComponentSetByLevelKeyBySelectedFeaturesCountConfig =
	createRecomputeObserver(state =>
		CommonSelect.app.getConfiguration(
			state,
			'componentSetByLevelKeyBySelectedFeaturesCount'
		)
	);

const getActiveSelection = createRecomputeObserver(
	CommonSelect.selections.getActive
);

const getActiveLevelKey = createRecomputeObserver(
	CommonSelect.areas.areaTreeLevels.getActiveKey
);

const getComponentSetByKey = createRecomputeObserver(
	CommonSelect.data.components.getSetStateByKey
);

const getComponentSetKeyByActivePlaceNumberOfSelectedFeatureKeys =
	createRecomputeSelector(() => {
		const componentSetsConfig =
			getComponentSetByLevelKeyBySelectedFeaturesCountConfig();
		const activeSelection = getActiveSelection();
		const numberOfSelectedFeatures =
			activeSelection?.data?.featureKeysFilter?.keys?.length;
		const activeLevelKey = getActiveLevelKey();

		if (activeLevelKey && componentSetsConfig) {
			if (numberOfSelectedFeatures > 1) {
				return componentSetsConfig[activeLevelKey]?.['multiple-selected'];
			} else if (numberOfSelectedFeatures === 1) {
				return componentSetsConfig[activeLevelKey]?.['one-selected'];
			} else {
				return componentSetsConfig[activeLevelKey]?.['no-selected'];
			}
		} else {
			return null;
		}
	});

/**
 * Get component set state
 * @returns {Object} state of component set
 */
const getVisualizationComponentSet = createRecomputeSelector(() => {
	const componentSetKey =
		getComponentSetKeyByActivePlaceNumberOfSelectedFeatureKeys();
	return getComponentSetByKey(componentSetKey);
}, recomputeSelectorOptions);

/**
 * Get regions from attribute data
 */
const getRegions = createRecomputeSelector(componentKey => {
	const data = CommonSelect.data.components.getData(componentKey);
	const metadata =
		CommonSelect.data.components.getComponentStateByKeyObserver(componentKey);
	const nameAttributeKey = metadata?.attributeKeys[0];

	if (data && nameAttributeKey) {
		return data.map(item => {
			return {
				key: item.key,
				name: item.data[nameAttributeKey],
			};
		});
	} else {
		return null;
	}
}, recomputeSelectorOptions);

const getPeriods = createSelector(
	[
		CommonSelect.periods.getIndexed,
		state => CommonSelect.app.getConfiguration(state, 'unavailablePeriodKeys'),
	],
	(periods, unavailablePeriodKeys) => {
		if (periods) {
			return periods.filter(period =>
				unavailablePeriodKeys
					? !_includes(unavailablePeriodKeys, period.key)
					: period
			);
		} else {
			return null;
		}
	}
);

/**
 * Get selection associated wit country level
 * @returns {string}
 */
const getSelectionKeyForCountryLevel = createSelector(
	[
		CommonSelect.areas.areaTreeLevels.getAll,
		state =>
			CommonSelect.app.getConfiguration(state, 'selectionByAreaTreeLevelKey'),
	],
	(levels, selectionByLevelKey) => {
		if (levels && selectionByLevelKey) {
			const countryLevel = _find(levels, level => level.data.level === 2);
			if (countryLevel) {
				return selectionByLevelKey[countryLevel.key];
			} else {
				return null;
			}
		} else {
			return null;
		}
	}
);

/**
 * @param state,
 */
const getStatisticsLayerForActiveMap = createRecomputeSelector(mapKey => {
	const mapLayers = CommonSelect.maps.getMapLayers(mapKey);
	return mapLayers?.find(l => l?.layerKey === STATISTICSLAYERKEY);
});

/**
 * @param state,
 * @param mapKey,
 * @param layerKey,
 */
const getUpdatedLayerStateByPlaces = createSelector(
	[
		CommonSelect.maps.getActiveMapKey,
		CommonSelect.maps.getLayerStateByLayerKeyAndMapKey,
		(state, mapKey, layerKey, activePlaceKeys) => activePlaceKeys,
	],
	(mapKey, layer, activePlaceKeys) => {
		const layerSettings = {
			areaTreeLevelKey: layer.areaTreeLevelKey,
			key: layer.key,
			leyerKey: layer.leyerKey,
			filterByActive: layer.filterByActive,
			metadataModifiers: {
				..._omit(layer.metadataModifiers, 'placeKey'),
				...(activePlaceKeys?.length ? {placeKey: activePlaceKeys[0]} : {}),
			},
			options: layer.options,
			styleKey: layer.styleKey,
		};
		return layerSettings;
	}
);

/**
 * @param state,
 * @param mapKey,
 * @param layerKey,
 */
const getStyleKeyForActiveMapAndLayerKey = createSelector(
	[CommonSelect.maps.getLayerStateByLayerKeyAndMapKey],
	layer => {
		return layer?.styleKey;
	}
);
/**
 * @param state,
 * @param mapKey,
 * @param layerKey,
 */
const getTooltipTitle = createSelector(
	[
		CommonSelect.areas.areaTreeLevels.getActiveKey,
		CommonSelect.places.getAllAsObject,
		CommonSelect.app.getCompleteConfiguration,
		(state, featureName) => featureName,
	],
	(activeAreaLevelKey, placesAsObject, configuration, featureName) => {
		if (activeAreaLevelKey === globalAreaLevelKey) {
			const placeKey =
				configuration?.placeKeyByCountryFeatureKey?.[featureName];

			return placesAsObject?.[placeKey]?.data?.nameDisplay;
		}
	}
);

/**
 * @param state,
 */
const getActiveRelativeAttributeKey = createSelector(
	[CommonSelect.cases.getActiveKey, CommonSelect.app.getCompleteConfiguration],
	(activeCaseKey, configuration) => {
		const configByCaseKey = configuration?.['configByCaseKey'];
		return configByCaseKey?.[activeCaseKey]?.['relativeAttributeKey'];
	}
);

/**
 * @param state,
 */
const getActiveRelativeAttributeName = createSelector(
	[
		CommonSelect.cases.getActiveKey,
		CommonSelect.app.getCompleteConfiguration,
		CommonSelect.attributes.getAllAsObject,
	],
	(activeCaseKey, configuration, attributes) => {
		const configByCaseKey = configuration?.['configByCaseKey'];
		const relativeAttributeKey =
			configByCaseKey?.[activeCaseKey]?.['relativeAttributeKey'];
		return attributes?.[relativeAttributeKey]?.data?.nameDisplay;
	}
);

export default {
	getVisualizationComponentSet,
	getPeriods,
	getRegions,
	getSelectionKeyForCountryLevel,
	getUpdatedLayerStateByPlaces,
	getStatisticsLayerForActiveMap,
	getTooltipTitle,
	getActiveRelativeAttributeKey,
	getActiveRelativeAttributeName,
	getStyleKeyForActiveMapAndLayerKey,
};
