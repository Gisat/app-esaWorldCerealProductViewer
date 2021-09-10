import {filter as _filter} from 'lodash';
import {createSelector} from 'reselect';
import intersect from '@turf/intersect';
import {commonSelectors, Select as CommonSelect} from '@gisatcz/ptr-state';
import utils from '../../../utils';

const getSubstate = state => state.worldCereal.productMetadata;

const getActiveKeys = commonSelectors.getActiveKeys(getSubstate);
const getActiveModels = commonSelectors.getActiveModels(getSubstate);
const getAll = commonSelectors.getAll(getSubstate);
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

export default {
	getSubstate,

	getActiveKeys,
	getActiveModels,

	getByKey,
	getByMapSetView,
};
