import {
	recomputeSelectorOptions,
	createRecomputeSelector,
	createRecomputeObserver,
	Select as CommonSelect,
} from '@gisatcz/ptr-state';

const getComponentsBySelectedFeaturesCountConfig = createRecomputeObserver(
	state =>
		CommonSelect.app.getConfiguration(
			state,
			'componentsBySelectedFeaturesCount'
		)
);

const getActiveSelection = createRecomputeObserver(
	CommonSelect.selections.getActive
);

const getComponentKeysByNumberOfSelectedFeatureKeys = createRecomputeSelector(
	() => {
		const componentKeysConfig = getComponentsBySelectedFeaturesCountConfig();
		const activeSelection = getActiveSelection();
		const numberOfSelectedFeatures =
			activeSelection?.data?.featureKeysFilter?.keys?.length;

		if (componentKeysConfig) {
			if (numberOfSelectedFeatures > 1) {
				return componentKeysConfig['multiple-selected'];
			} else if (numberOfSelectedFeatures === 1) {
				return componentKeysConfig['one-selected'];
			} else {
				return componentKeysConfig['no-selected'];
			}
		} else {
			return null;
		}
	}
);

const getVisualizationComponents = createRecomputeSelector(() => {
	const componentKeys = getComponentKeysByNumberOfSelectedFeatureKeys();
	if (componentKeys?.length) {
		return componentKeys?.map(componentKey =>
			CommonSelect.components.getByComponentKey_recompute(componentKey)
		);
	} else {
		return null;
	}
}, recomputeSelectorOptions);

export default {
	getVisualizationComponents,
};
