import {
	commonSelectors,
	commonHelpers,
	Action as CommonAction,
} from '@gisatcz/ptr-state';
import Select from '../../Select';

function useAvailableAttributes(chartComponentKey) {
	return (dispatch, getState) => {
		const componentState = Select.data.components.getComponentStateByKey(
			getState(),
			chartComponentKey
		);

		// TODO use instead of ensure
		if (componentState) {
			const activeKeys = commonSelectors.getAllActiveKeys(getState());
			let fullFilter = commonHelpers.mergeFilters(
				activeKeys,
				componentState.filterByActive,
				componentState.filter
			);
			if (fullFilter) {
				dispatch(
					CommonAction.data.attributeRelations.ensureIndexed(
						{...fullFilter, layerTemplateKey: componentState.layerTemplateKey},
						null,
						1,
						100
					)
				);
			}
		}
	};
}

function onAttributeChange(chartComponentKey, attributeKeys) {
	return (dispatch, getState) => {
		const componentState = Select.data.components.getComponentStateByKey(
			getState(),
			chartComponentKey
		);
		const nameAttributeKey = Select.components.get(
			getState(),
			chartComponentKey,
			'nameAttributeKey'
		);

		if (componentState) {
			dispatch(
				CommonAction.data.components.updateComponent(chartComponentKey, {
					attributeKeys: [...attributeKeys, nameAttributeKey],
				})
			);
			dispatch(CommonAction.data.components.use(chartComponentKey));
		}
	};
}

function onSelectedFeaturesChange(chartComponentKey, featureKeys) {
	return (dispatch, getState) => {
		const componentState = Select.data.components.getComponentStateByKey(
			getState(),
			chartComponentKey
		);

		const useIfNeeded = (compState, compKey) => {
			const prevFeatureKeys = compState?.featureKeys;
			if (JSON.stringify(featureKeys) !== JSON.stringify(prevFeatureKeys)) {
				dispatch(
					CommonAction.data.components.setFeatureKeys(compKey, featureKeys)
				);
				dispatch(CommonAction.data.components.use(compKey));
			}
		};

		if (componentState?.components) {
			componentState.components.forEach(componentKey => {
				const compState = Select.data.components.getComponentStateByKey(
					getState(),
					componentKey
				);
				useIfNeeded(compState, componentKey);
			});
		} else if (componentState) {
			useIfNeeded(componentState, chartComponentKey);
		}
	};
}

export default {
	onAttributeChange,
	onSelectedFeaturesChange,
	useAvailableAttributes,
};
