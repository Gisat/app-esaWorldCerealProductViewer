import {commonActions, Action as CommonAction} from '@gisatcz/ptr-state';
import {find as _find} from 'lodash';
import Select from '../../Select';
import ActionTypes from '../../../constants/ActionTypes';
import {mapSetKey} from '../../../constants/app';

const add = commonActions.add(ActionTypes.WORLD_CEREAL.PRODUCT_METADATA);

/**
 * Add/remove the product to/from active map
 * @param productMetadataKey {string} unique key of product metadata
 */
function handleProductInActiveMap(productMetadataKey) {
	return (dispatch, getState) => {
		const map = Select.maps.getMapSetActiveMap(getState(), mapSetKey);
		const productMetadata = Select.worldCereal.productMetadata.getByKey(
			getState(),
			productMetadataKey
		);

		const {tiles} = productMetadata.data;

		const isLayerPresent =
			map?.data?.layers &&
			!!_find(map.data.layers, layer => layer.layerKey === productMetadataKey);

		// Remove or add layer(s)
		if (isLayerPresent) {
			dispatch(removeLayersForTiles(productMetadataKey, tiles, map.key));
		} else {
			dispatch(
				addLayersForTiles(
					productMetadataKey,
					tiles,
					productMetadata?.data.product,
					map.key
				)
			);
		}
	};
}

/**
 * @param productMetadataKey {string} unique key of product metadata
 * @param tiles {Array} A collection of tiles
 * @param mapKey {string}
 */
function removeLayersForTiles(productMetadataKey, tiles, mapKey) {
	return (dispatch, getState) => {
		tiles.forEach(tile => {
			// TODO remove multiple layers at once?
			dispatch(
				CommonAction.maps.removeMapLayer(
					mapKey,
					getUniqueLayerKey(productMetadataKey, tile)
				)
			);
		});
	};
}

/**
 * @param productMetadataKey {string} unique key of product metadata
 * @param tiles {Array} A collection of tiles
 * @param product {string} key of product (case)
 * @param mapKey {string}
 */
function addLayersForTiles(productMetadataKey, tiles, product, mapKey) {
	return (dispatch, getState) => {
		const layers = [];
		tiles.forEach(tile =>
			layers.push(
				getLayerDefinition(getState(), productMetadataKey, tile, product)
			)
		);
		dispatch(CommonAction.maps.addMapLayers(mapKey, layers));
	};
}

// helpers ---------------------------------------------------------------------------------------
/**
 * Create unique layer key. Each product has several tiles. Each tile should be an unique map layer.
 * @param productMetadataKey {string} uuid of product metadata
 * @param tile {tile: Object, path: string}
 * @returns {string}
 */
function getUniqueLayerKey(productMetadataKey, tile) {
	return `${productMetadataKey}_${tile.tile}`;
}

/**
 * Get layer definition
 * @param state {Object}
 * @param productMetadataKey {string} uuid of product metadata
 * @param tile {tile: Object, path: string}
 * @param product {string}
 * @returns {Object} Panther.Layer
 */
function getLayerDefinition(state, productMetadataKey, tile, product) {
	return {
		key: getUniqueLayerKey(productMetadataKey, tile),
		layerKey: productMetadataKey,
		type: 'cog',
		options: {
			url: tile.path,
			style: Select.worldCereal.getStyleDefinitionByProductTemplateKey(
				state,
				product
			),
		},
	};
}

export default {
	add,
	addLayersForTiles,

	handleProductInActiveMap,
};
