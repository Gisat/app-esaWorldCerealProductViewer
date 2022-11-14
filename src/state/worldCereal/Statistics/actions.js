import {Action as CommonAction} from '@gisatcz/ptr-state';
import {forIn as _forIn} from 'lodash';
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
		const activeSelectionKey = Select.selections.getActiveKey(getState());

		let layerSettings = null;
		if (areaTreeLevelKey === globalAreaLevelKey) {
			layerSettings =
				Select.worldCereal.statistics.getUpdatedLayerStateByPlaces(
					getState(),
					mapKey,
					STATISTICSLAYERKEY,
					[]
				);
		} else {
			const activePlaceKey = Select.places.getActiveKeys(getState());
			layerSettings =
				Select.worldCereal.statistics.getUpdatedLayerStateByPlaces(
					getState(),
					mapKey,
					STATISTICSLAYERKEY,
					activePlaceKey
				);
		}

		layerSettings = {
			...layerSettings,
			areaTreeLevelKey,
			key: layerSettings.key,
			leyerKey: layerSettings.leyerKey,
			filterByActive: layerSettings.filterByActive,
			metadataModifiers: layerSettings.metadataModifiers,
			options: {...layerSettings.options, selected: {[activeSelectionKey]: {}}},
			styleKey: layerSettings.styleKey,
		};
		dispatch(Action.maps.removeMapLayer(mapKey, STATISTICSLAYERKEY));
		dispatch(Action.maps.addMapLayers(mapKey, [layerSettings]));
	};
}

/**
 * Set statistics layer areaTreeLevelKey
 */
function setMapLayerActivePlaceKey(activePlaceKeys) {
	return (dispatch, getState) => {
		const mapKey = Select.maps.getActiveMapKey(getState());

		const layerSettings =
			Select.worldCereal.statistics.getUpdatedLayerStateByPlaces(
				getState(),
				mapKey,
				STATISTICSLAYERKEY,
				activePlaceKeys
			);
		dispatch(Action.maps.removeMapLayer(mapKey, STATISTICSLAYERKEY));
		dispatch(Action.maps.addMapLayers(mapKey, [layerSettings]));
	};
}

/**
 * Set active place by featureKeys on global areaLevel
 */
function onLayerClick() {
	return (dispatch, getState) => {
		const activeAreaTreeLevelKey = Select.areas.areaTreeLevels.getActiveKey(
			getState()
		);
		if (activeAreaTreeLevelKey === globalAreaLevelKey) {
			dispatch(
				Action.worldCereal.statistics.setActivePlaceKeysByActiveSelectionFeatureKeys()
			);
		}
	};
}

/**
 * Set active place by featureKeys on global areaLevel
 */
function recalculateStatisticLayerStyle(statisticLayer) {
	return (dispatch, getState) => {
		console.log('xxx', statisticLayer, dispatch, getState);
	};
}

export default {
	setActiveSelectionFeatureKeysByActivePlaceKeys,
	setActivePlaceKeysByActiveSelectionFeatureKeys,
	setActiveSelectionForActiveAreaTreeLevel,
	setMapLayerActiveStyleKeyByCaseKey,
	setMapLayerActiveAreaTreeLevelKey,
	setMapLayerActivePlaceKey,
	onLayerClick,
	recalculateStatisticLayerStyle,
};
