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

export default {
	getVisualizationComponentSet,
};
