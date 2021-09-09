import {Action as CommonAction} from '@gisatcz/ptr-state';
import {map as mapUtils} from '@gisatcz/ptr-utils';
import {mapConstants} from '@gisatcz/ptr-core';
import Select from './Select';
import config from '../config';
import {appKey} from '../constants/keys';

import productMetadataActions from './worldCereal/ProductMetadata/actions';

// TODO load view from BE
import view from '../data/view';
import productMetadata from '../data/mock_productMetadata';

const getFeatureFromExtent = extent => {
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
};

function init(path) {
	return (dispatch, getState) => {
		dispatch(CommonAction.app.setBaseUrl(path));
		dispatch(CommonAction.app.updateLocalConfiguration(config));
		dispatch(CommonAction.app.setKey(appKey));
		// dispatch(CommonAction.app.loadConfiguration());

		// add & apply view
		dispatch(CommonAction.views.add(view));
		dispatch(CommonAction.views.applyAndSetActive(view.key, CommonAction));

		// add mock data
		dispatch(productMetadataActions.add(productMetadata));
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
			dispatch(CommonAction.maps.updateMapAndSetView(mapKey, {boxRange}));
		}

		dispatch(showExtent(mapKey));
	};
}

function updateMapView(mapKey, viewUpdate) {
	return (dispatch, getState) => {
		dispatch(CommonAction.maps.updateMapAndSetView(mapKey, viewUpdate));
		dispatch(showExtent(mapKey));
	};
}

function showExtent(mapKey) {
	return (dispatch, getState) => {
		const currentMapView = Select.maps.getViewByMapKey(getState(), mapKey);
		const currentMapViewport = Select.maps.getViewportByMapKey(
			getState(),
			mapKey
		);

		const extent = mapUtils.view.getBoundingBoxFromViewForEpsg3857(
			currentMapView.center,
			currentMapView.boxRange,
			currentMapViewport.width / currentMapViewport.height,
			mapConstants.averageLatitude
		);

		const extentAsArray = [
			[extent.minLon, extent.minLat],
			[extent.maxLon, extent.maxLat],
		];

		const feature = getFeatureFromExtent(extentAsArray);

		dispatch(
			CommonAction.maps.setMapLayerOption(mapKey, 'extent', 'features', [
				feature,
			])
		);
	};
}

export default {
	...CommonAction,
	init,
	worldCereal: {
		productMetadata: productMetadataActions,

		adjustInitialBoxRange,
		updateMapView,
	},
};
