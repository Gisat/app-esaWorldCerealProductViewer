import {filter as _filter, uniq as _uniq} from 'lodash';
import {createSelector} from 'reselect';
import {createCachedSelector} from 're-reselect';
import intersect from '@turf/intersect';
import {commonSelectors, Select as CommonSelect} from '@gisatcz/ptr-state';
import utils from '../../../utils';

const getSubstate = state => state.worldCereal.productMetadata;

const getAll = commonSelectors.getAll(getSubstate);
const getByKey = commonSelectors.getByKey(getSubstate);
const getAllAsObject = commonSelectors.getAllAsObject(getSubstate);

// helpers ----------------------------------------------

/**
 * Return active map view as polygon feature
 * @param {Object} state
 * @return {GeoJSON.Feature|null}
 */
const getMapSetActiveMapExtentAsFeature = createSelector(
	[
		CommonSelect.maps.getMapSetActiveMapView,
		CommonSelect.maps.getMapSetActiveMapViewport,
	],
	(view, viewport) => {
		if (view && viewport) {
			return utils.getExtentFromMapViewAsFeature(view, viewport);
		} else {
			return null;
		}
	}
);

// selectors ---------------------------------------------

/**
 * @param {Object} state
 * @param {string} mapSetKey
 * @return {Object|null} Panther map view
 */
const getByMapSetView = createSelector(
	[getMapSetActiveMapExtentAsFeature, getAll],
	(mapExtentAsFeature, models) => {
		if (mapExtentAsFeature && models) {
			return _filter(
				models,
				model => !!intersect(model.data.geometry, mapExtentAsFeature)
			);
		} else {
			return null;
		}
	}
);

/**
 * @param {Object} state
 * @param {string} mapKey
 * @return {Array|null} Keys of product metadata present in given map
 */
const getKeysByMapKey = createCachedSelector(
	[CommonSelect.maps.getMapLayersStateByMapKey],
	mapLayers => {
		if (mapLayers?.length) {
			return _uniq(mapLayers.map(layer => layer.layerKey));
		} else {
			return null;
		}
	}
)((state, mapKey) => mapKey);

/**
 * @param {Object} state
 * @param {string} productMetadataKey
 * @return {boolean} true if given product is in current map extent
 */
const isModelInMapExtent = createCachedSelector(
	[
		(state, productMetadataKey, mapSetKey) =>
			getMapSetActiveMapExtentAsFeature(state, mapSetKey),
		getByKey,
	],
	(mapExtentAsFeature, model) => {
		if (mapExtentAsFeature && model) {
			return !!intersect(model.data.geometry, mapExtentAsFeature);
		} else {
			return false;
		}
	}
)((state, productMetadataKey) => productMetadataKey);

export default {
	getSubstate,

	getByKey,
	getByMapSetView,

	getAllAsObject,

	getKeysByMapKey,

	isModelInMapExtent,
};
