import Select from '../Select';
import {map as mapUtils} from '@gisatcz/ptr-utils';
import {Action as CommonAction} from '@gisatcz/ptr-state';
import productMetadataActions from './ProductMetadata/actions';
import configurationActions from './configuration/actions';
import productMetadataFilterActions from './ProductMetadataFilter/actions';
import utils from '../../utils';

/**
 * Apply given view
 * @param viewKey {string}
 */
function applyView(viewKey) {
	return (dispatch, getState) => {
		const view = Select.views.getByKey(getState(), viewKey);
		const viewName = view?.data?.nameInternal;
		dispatch(CommonAction.views.applyAndSetActive(viewKey, CommonAction)).then(
			() => {
				dispatch(CommonAction.components.set('IntroOverlay', 'open', false));
				dispatch(
					configurationActions.updateStateFromView(
						view.data.state.worldCereal.configuration
					)
				);

				if (viewName === 'detailedExploration') {
					dispatch(applyDetailedExplorationView(view));
				}
			}
		);
	};
}

/**
 * Apply specific actions for detailed exploration view
 * @param view {Object} detailed exploration view data
 */
function applyDetailedExplorationView(view) {
	return dispatch => {
		dispatch(
			productMetadataFilterActions.setActiveFilter(
				view.data.state.worldCereal.productMetadataFilter.activeFilter
			)
		);

		// TODO handle differently
		setTimeout(() => {
			dispatch(productMetadataActions.loadForMapSetView());
		}, 1000);
	};
}

/**
 * Adjust boxRange according to current zoom level
 * @param mapKey {string}
 */
function adjustInitialBoxRange(mapKey) {
	return (dispatch, getState) => {
		const currentMapView = Select.maps.getViewByMapKey(getState(), mapKey);
		const currentMapViewport = Select.maps.getViewportByMapKey(
			getState(),
			mapKey
		);

		const boxRange = mapUtils.view.getNearestZoomLevelBoxRange(
			currentMapViewport.width,
			currentMapViewport.height,
			currentMapView.boxRange
		);

		if (boxRange !== currentMapView.boxRange) {
			dispatch(updateMapView(mapKey, {boxRange}));
		}
	};
}

/**
 * @param mapKey {string}
 * @param viewUpdate {Object} Panther's mapView parameters to update
 */
function updateMapView(mapKey, viewUpdate) {
	return CommonAction.maps.updateMapAndSetView(mapKey, viewUpdate);
}

function loadProducts() {
	return (dispatch, getState) => {
		const state = getState();
		const mapSetKey = Select.maps.getActiveSetKey(state);
		const isInteractivityLimited = Select.worldCereal.isInteractivityLimited(
			state,
			mapSetKey
		);
		if (!isInteractivityLimited) {
			dispatch(productMetadataActions.loadForMapSetView());
		}
	};
}

/**
 * Update overview map
 * @returns {(function(*, *): void)|*}
 */
function updateOverviewMap() {
	return (dispatch, getState) => {
		const state = getState();
		const mapSetKey = Select.maps.getActiveSetKey(state);
		const overviewMapConfig =
			Select.worldCereal.configuration.getComponentConfiguration(
				getState(),
				'mapSetTools',
				mapSetKey,
				'overviewMap'
			);

		if (overviewMapConfig?.active) {
			const mapSetView = Select.maps.getMapSetActiveMapView(state, mapSetKey);
			const mapViewport = Select.maps.getMapSetActiveMapViewport(
				state,
				mapSetKey
			);
			const view = {...mapSetView};
			if (view.boxRange) {
				view.boxRange = view.boxRange * 4;
			}
			dispatch(CommonAction.maps.updateMapAndSetView('overview', view));
			if (mapSetView && mapViewport) {
				const feature = utils.getExtentFromMapViewAsFeature(
					mapSetView,
					mapViewport
				);
				if (feature) {
					dispatch(
						CommonAction.maps.setMapLayerOption(
							'overview',
							'extent',
							'features',
							[feature]
						)
					);
				}
			}
		}
	};
}

/**
 * Remove all layers from map with given layerKey parameters (layerKey (in contrast with key) could be common for multiple layers).
 * For given productMetadata is the layerKey same as productMetadataKey
 * @param mapKey {string}
 * @param layerKeys {Array} List of productMetadataKey uuids
 */
function removeAllLayersFromMapByLayerKeys(mapKey, layerKeys) {
	return (dispatch, getState) => {
		const mapLayers = Select.maps.getMapLayersStateByMapKey(getState(), mapKey);
		if (mapLayers && layerKeys.length) {
			let layersToRemove = [];
			mapLayers.forEach(layer => {
				if (layerKeys.indexOf(layer.layerKey) !== -1) {
					layersToRemove.push(layer.key);
				}
			});

			if (layersToRemove.length) {
				dispatch(CommonAction.maps.removeMapLayers(mapKey, layersToRemove));
			}
		}
	};
}

function setOpacityByLayerKeys(mapKey, layerKeys, opacity) {
	return (dispatch, getState) => {
		const mapLayers = Select.maps.getMapLayersStateByMapKey(getState(), mapKey);
		if (mapLayers && layerKeys.length) {
			mapLayers.forEach(layer => {
				if (layerKeys.indexOf(layer.layerKey) !== -1) {
					dispatch(
						CommonAction.maps.setMapLayerOpacity(mapKey, layer.key, opacity)
					);
				}
			});
		}
	};
}

function updateMapSetActiveMapView(mapSetKey, place) {
	return (dispatch, getState) => {
		if (place?.pantherMapView) {
			const activeMapSetMapKey = Select.maps.getMapSetActiveMapKey(
				getState(),
				mapSetKey
			);
			dispatch(
				CommonAction.maps.updateMapAndSetView(
					activeMapSetMapKey,
					place?.pantherMapView
				)
			);
		}
	};
}

export default {
	applyView,
	adjustInitialBoxRange,
	setOpacityByLayerKeys,
	removeAllLayersFromMapByLayerKeys,
	updateMapView,
	updateOverviewMap,
	updateMapSetActiveMapView,
	loadProducts,
};
