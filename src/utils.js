import {map as mapUtils} from '@gisatcz/ptr-utils';
import {mapConstants} from '@gisatcz/ptr-core';

/**
 * Get visible map extent from Panther map view and viewport. For maps in EPSG 3857 (WebMercator) projection only.
 * @param view {Object} Panther map view
 * @param viewport {height: number, width: number}
 * @returns {{minLon: number, maxLat: number, minLat: number, maxLon: number}}
 */
function getExtentFromMapView(view, viewport) {
	return mapUtils.view.getBoundingBoxFromViewForEpsg3857(
		view.center,
		view.boxRange,
		viewport.width / viewport.height,
		mapConstants.averageLatitude
	);
}

/**
 * @param extent {{minLon: number, maxLat: number, minLat: number, maxLon: number}}
 * @returns {GeoJSON.Feature}
 */
function getFeatureFromExtent(extent) {
	return {
		type: 'Feature',
		properties: {},
		geometry: {
			type: 'Polygon',
			coordinates: [
				[
					[extent.minLon, extent.minLat],
					[extent.minLon, extent.maxLat],
					[extent.maxLon, extent.maxLat],
					[extent.maxLon, extent.minLat],
					[extent.minLon, extent.minLat],
				],
			],
		},
	};
}

/**
 * Get visible map extent from Panther map view and viewport as GeoJSON feature. For maps in EPSG 3857 (WebMercator) projection only.
 * @param view {Object} Panther map view
 * @param viewport {height: number, width: number}
 * @returns {GeoJSON.Feature}
 */
function getExtentFromMapViewAsFeature(view, viewport) {
	return getFeatureFromExtent(getExtentFromMapView(view, viewport));
}

export default {
	getExtentFromMapViewAsFeature,
};
