import {Action as CommonAction} from '@gisatcz/ptr-state';
import {forIn as _forIn} from 'lodash';
import Action from '../../Action';
import Select from '../../Select';
import {STATISTICSLAYERKEY} from '../../../constants/app';

/**
 * Set active place keys by active selection feature keys. The linking should be stored in app configuration.
 */
function setActivePlaceKeysByActiveSelectionFeatureKeys() {
	return (dispatch, getState) => {
		const placeKeyByFeatureKey = Select.app.getConfiguration(
			getState(),
			'placeKeyByCountryFeatureKey'
		);
		const featureKeys = Select.selections.getActive(getState())?.data
			?.featureKeysFilter?.keys;

		if (placeKeyByFeatureKey && featureKeys) {
			const placeKeys = featureKeys.map(
				featureKey => placeKeyByFeatureKey[featureKey]
			);
			dispatch(
				CommonAction.places.setActiveKeys(placeKeys.length ? placeKeys : null)
			);
		}
	};
}

/**
 * Set selected feature keys in active selection by place keys. The linking should be stored in app configuration.
 */
function setActiveSelectionFeatureKeysByActivePlaceKeys() {
	return (dispatch, getState) => {
		const placeKeyByFeatureKey = Select.app.getConfiguration(
			getState(),
			'placeKeyByCountryFeatureKey'
		);

		const placeKeys = Select.places.getActiveKeys(getState());

		if (placeKeyByFeatureKey) {
			const featureKeys = [];
			placeKeys?.forEach(placeKey => {
				_forIn(placeKeyByFeatureKey, (value, featureKey) => {
					if (placeKey === value) {
						featureKeys.push(featureKey);
					}
				});
			});

			dispatch(
				CommonAction.selections.setActiveSelectionFeatureKeysFilterKeys(
					featureKeys
				)
			);
		}
	};
}

/**
 * Set selected feature keys in active selection by place keys. The linking should be stored in app configuration.
 */
function setActiveSelectionForActiveAreaTreeLevel() {
	return (dispatch, getState) => {
		const selectionConfig = Select.app.getConfiguration(
			getState(),
			'selectionByAreaTreeLevelKey'
		);
		const activeAreaTreeLevelKey = Select.areas.areaTreeLevels.getActiveKey(
			getState()
		);
		const selectionKey = selectionConfig?.[activeAreaTreeLevelKey];

		if (selectionKey) {
			dispatch(CommonAction.selections.setActiveKey(selectionKey));
		}
	};
}

/**
 * Set statistics layer styleKey based on active caseKey
 */
function setMapLayerActiveStyleKeyByCaseKey(caseKey) {
	return (dispatch, getState) => {
		const configByCaseKey = Select.app.getConfiguration(
			getState(),
			'configByCaseKey'
		);

		const caseConfiguration = configByCaseKey?.[caseKey];
		const styleKey = caseConfiguration?.styleKey;

		if (styleKey) {
			const mapKey = Select.maps.getActiveMapKey(getState());
			dispatch(
				Action.maps.setMapLayerStyleKey(mapKey, STATISTICSLAYERKEY, styleKey)
			);
		}
	};
}

export default {
	setActiveSelectionFeatureKeysByActivePlaceKeys,
	setActivePlaceKeysByActiveSelectionFeatureKeys,
	setActiveSelectionForActiveAreaTreeLevel,
	setMapLayerActiveStyleKeyByCaseKey,
};
