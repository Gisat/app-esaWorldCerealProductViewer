import {Action as CommonAction} from '@gisatcz/ptr-state';
import {forIn as _forIn, omit as _omit} from 'lodash';
import Action from '../../Action';
import Select from '../../Select';
import {STATISTICSLAYERKEY, globalAreaLevelKey} from '../../../constants/app';

function clearCountryLevelSelection() {
	return (dispatch, getState) => {
		const selectionKey =
			Select.worldCereal.statistics.getSelectionKeyForCountryLevel(getState());
		if (selectionKey) {
			dispatch(CommonAction.selections.clearFeatureKeysFilter(selectionKey));
		}
	};
}

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

			dispatch(clearCountryLevelSelection());
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

			dispatch(clearCountryLevelSelection());
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

/**
 * Set statistics layer areaTreeLevelKey
 */
function setMapLayerActiveAreaTreeLevelKey(areaTreeLevelKey) {
	return (dispatch, getState) => {
		const mapKey = Select.maps.getActiveMapKey(getState());
		const layer = Select.maps.getLayerStateByLayerKeyAndMapKey(
			getState(),
			mapKey,
			STATISTICSLAYERKEY
		);

		const layerSettings = {
			areaTreeLevelKey,
			key: layer.key,
			leyerKey: layer.leyerKey,
			filterByActive: layer.filterByActive,
			metadataModifiers: layer.metadataModifiers,
			options: layer.options,
			styleKey: layer.styleKey,
		};
		dispatch(Action.maps.removeMapLayer(mapKey, STATISTICSLAYERKEY));
		dispatch(Action.maps.addMapLayers(mapKey, [layerSettings]));

		if (areaTreeLevelKey === globalAreaLevelKey) {
			dispatch(setMapLayerActivePlaceKey([]));
		} else {
			const activePlaceKey = Select.places.getActiveKeys(getState());
			dispatch(setMapLayerActivePlaceKey(activePlaceKey));
		}
	};
}

/**
 * Set statistics layer areaTreeLevelKey
 */
function setMapLayerActivePlaceKey(activePlaceKeys) {
	return (dispatch, getState) => {
		const mapKey = Select.maps.getActiveMapKey(getState());
		const layer = Select.maps.getLayerStateByLayerKeyAndMapKey(
			getState(),
			mapKey,
			STATISTICSLAYERKEY
		);

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
		dispatch(Action.maps.removeMapLayer(mapKey, STATISTICSLAYERKEY));
		dispatch(Action.maps.addMapLayers(mapKey, [layerSettings]));
	};
}

export default {
	setActiveSelectionFeatureKeysByActivePlaceKeys,
	setActivePlaceKeysByActiveSelectionFeatureKeys,
	setActiveSelectionForActiveAreaTreeLevel,
	setMapLayerActiveStyleKeyByCaseKey,
	setMapLayerActiveAreaTreeLevelKey,
	setMapLayerActivePlaceKey,
};
