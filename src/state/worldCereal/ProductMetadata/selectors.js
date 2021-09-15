import {filter as _filter, uniq as _uniq} from 'lodash';
import {createSelector} from 'reselect';
import {createCachedSelector} from 're-reselect';
import intersect from '@turf/intersect';
import {commonSelectors, Select as CommonSelect} from '@gisatcz/ptr-state';
import utils from '../../../utils';

const getSubstate = state => state.worldCereal.productMetadata;

const getActiveKeys = commonSelectors.getActiveKeys(getSubstate);
const getActiveModels = commonSelectors.getActiveModels(getSubstate);
const getAll = commonSelectors.getAll(getSubstate);
const getAllAsObject = commonSelectors.getAllAsObject(getSubstate);
const getByKey = commonSelectors.getByKey(getSubstate);

/**
 * @param {Object} state
 * @param {string} mapSetKey
 * @return {Object|null} Panther map view
 */
const getByMapSetView = createSelector(
	[
		CommonSelect.maps.getMapSetActiveMapView,
		CommonSelect.maps.getMapSetActiveMapViewport,
		getAll,
	],
	(view, viewport, models) => {
		if (models && view && viewport) {
			const feature = utils.getExtentFromMapViewAsFeature(view, viewport);
			return _filter(
				models,
				model => !!intersect(model.data.geometry, feature)
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

export default {
	getSubstate,

	getActiveKeys,
	getActiveModels,

	getByKey,
	getByMapSetView,

	getKeysByMapKey,
};
