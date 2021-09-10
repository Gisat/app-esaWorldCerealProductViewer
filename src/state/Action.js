import {Action as CommonAction} from '@gisatcz/ptr-state';
import {map as mapUtils} from '@gisatcz/ptr-utils';
import Select from './Select';
import config from '../config';
import {appKey} from '../constants/keys';

import productMetadataActions from './worldCereal/ProductMetadata/actions';

// TODO load view from BE
import view from '../data/view';
import productMetadata from '../data/mock_productMetadata';

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

		productMetadata.forEach(metadata => {
			const feature = metadata.data.geometry;
		});

		// add metadata aoi for testing

		// setTimeout(() => {
		// 	const features = productMetadata.map(metadata => {
		// 		return {
		// 			geometry: metadata.data.geometry,
		// 			type: 'Feature',
		// 		};
		// 	});
		// 	dispatch(
		// 		CommonAction.maps.addMapLayerToIndex('productViewer-map-1', {
		// 			key: 'layer-test',
		// 			type: 'vector',
		// 			options: {features},
		// 		})
		// 	);
		// }, 50);
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

		// TODO get product metadata for current view
	};
}

function updateMapView(mapKey, viewUpdate) {
	return (dispatch, getState) => {
		dispatch(CommonAction.maps.updateMapAndSetView(mapKey, viewUpdate));

		// TODO get product metadata for current view
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
