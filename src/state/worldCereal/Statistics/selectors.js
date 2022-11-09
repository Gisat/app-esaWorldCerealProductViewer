import {createSelector} from 'reselect';
import {find as _find} from 'lodash';
import {
	recomputeSelectorOptions,
	createRecomputeSelector,
	createRecomputeObserver,
	Select as CommonSelect,
} from '@gisatcz/ptr-state';

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

export default {
	getVisualizationComponentSet,
	getRegions,
	getSelectionKeyForCountryLevel,
};
