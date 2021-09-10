import {filter as _filter} from 'lodash';
import {createSelector} from 'reselect';
import intersect from '@turf/intersect';
import {commonSelectors, Select as CommonSelect} from '@gisatcz/ptr-state';
import {map as mapUtils} from '@gisatcz/ptr-utils';
import {mapConstants} from '@gisatcz/ptr-core';

const getSubstate = state => state.worldCereal.productMetadata;

const getActiveKeys = commonSelectors.getActiveKeys(getSubstate);
const getActiveModels = commonSelectors.getActiveModels(getSubstate);
const getAll = commonSelectors.getAll(getSubstate);
const getByKey = commonSelectors.getByKey(getSubstate);

const getByMapSetView = createSelector(
	[
		CommonSelect.maps.getMapSetActiveMapView,
		CommonSelect.maps.getMapSetActiveMapViewport,
		getAll,
	],
	(view, viewport, models) => {
		if (models && view && viewport) {
			const feature = getExtentFromViewAsGeoJsonFeature(view, viewport);
			return _filter(
				models,
				model => !!intersect(model.data.geometry, feature)
			);
		} else {
			return null;
		}
	}
);

// helpers
function getExtentFromViewAsGeoJsonFeature(view, viewport) {
	const extent = mapUtils.view.getBoundingBoxFromViewForEpsg3857(
		view.center,
		view.boxRange,
		viewport.width / viewport.height,
		mapConstants.averageLatitude
	);

	const extentAsArray = [
		[extent.minLon, extent.minLat],
		[extent.maxLon, extent.maxLat],
	];

	return getFeatureFromExtent(extentAsArray);
}

function getFeatureFromExtent(extent) {
	const nodes = 5;
	const coordsInner = new Array(nodes).fill(null);
	const coordsInnerFill = coordsInner.map((v, i) => {
		switch (i) {
			case 0:
				return [extent[0][0], extent[0][1]];
			case 1:
				return [extent[0][0], extent[1][1]];
			case 2:
				return [extent[1][0], extent[1][1]];
			case 3:
				return [extent[1][0], extent[0][1]];
			case 4:
				return [extent[0][0], extent[0][1]];
		}
	});

	return {
		type: 'Feature',
		properties: {},
		geometry: {
			type: 'Polygon',
			coordinates: [coordsInnerFill],
		},
	};
}

export default {
	getSubstate,

	getActiveKeys,
	getActiveModels,

	getByKey,
	getByMapSetView,
};
