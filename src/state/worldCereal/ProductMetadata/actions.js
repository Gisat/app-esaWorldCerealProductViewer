import {commonActions, Action as CommonAction} from '@gisatcz/ptr-state';
import {find as _find} from 'lodash';
import utils from '../../../utils';
import productMetadataModel from '../../../models/productMetadata';
import Select from '../../Select';
import ActionTypes from '../../../constants/ActionTypes';
import {mapSetKey, defaultStyleKey} from '../../../constants/app';

const setActiveKeys = commonActions.setActiveKeys(
	ActionTypes.WORLD_CEREAL.PRODUCT_METADATA
);

/**
 * Add models to store
 * @param items {Array} A collection of incoming items
 */
function add(items) {
	return dispatch => {
		const models = items.map(item => productMetadataModel(item));
		dispatch(
			commonActions.add(ActionTypes.WORLD_CEREAL.PRODUCT_METADATA)(models)
		);
	};
}

/**
 * Load product metadata based on current map set view
 */
function loadForMapSetView() {
	return (dispatch, getState) => {
		const state = getState();
		const viewAsFeature =
			Select.worldCereal.productMetadata.getMapSetActiveMapExtentAsFeature(
				state,
				mapSetKey
			);
		const config = Select.app.getCompleteLocalConfiguration(state);
		const userKey = Select.users.getActiveKey(getState());
		if (viewAsFeature && config && userKey) {
			const {geometry} = viewAsFeature;
			const {apiBackendProtocol, apiBackendHost, apiBackendPath} = config;
			const path = 'rest/project/worldCereal/product/filtered';
			const url = `${apiBackendProtocol}://${apiBackendHost}/${apiBackendPath}/${path}`;
			const method = 'POST';
			const payload = {geometry};

			utils
				.request(url, method, null, payload, userKey)
				.then(data => {
					if (data) {
						dispatch(handleLoadResponse(data));
						dispatch(checkExistingLayers());
					}
				})
				.catch(
					err => new Error(`Failed to load product metadata. Error: ${err}`)
				);
		}
	};
}

/**
 * Go through layers present in all maps and compare them with a list of active (visible) tiles. If some tile is missing, add a corresponding layer to given map.
 */
function checkExistingLayers() {
	return (dispatch, getState) => {
		const state = getState();
		const maps = Select.maps.getMapSetMaps(state, mapSetKey);
		const activeProductsKeys =
			Select.worldCereal.productMetadata.getActiveKeys(state);
		const activeTiles =
			Select.worldCereal.productMetadata.getActiveTiles(state);

		if (maps && activeProductsKeys?.length && activeTiles?.length) {
			maps.forEach(map => {
				const mapKey = map.key;

				// Get product metadata relevant for given map only
				const productMetadataList =
					Select.worldCereal.productMetadata.getModelsByMapKey(state, mapKey);
				const layersToAdd = [];
				const layers = map.data?.layers;
				if (layers?.length) {
					// Go through all available productMetadata for current map view
					activeProductsKeys.forEach(productMetadataKey => {
						const productMetadataModel = _find(productMetadataList, {
							key: productMetadataKey,
						});
						const productTiles = productMetadataModel?.data?.tiles;

						const someExistingTile = getLayerByProductMetadataKey(
							layers,
							productMetadataKey
						);
						const existingOpacity = someExistingTile?.opacity;

						// If product present (as layer) in given map
						if (productTiles) {
							// Go through all tiles present in current map view
							activeTiles.forEach(tileKey => {
								const relevantTile = getProductTileByTileKey(
									productTiles,
									tileKey
								);

								/* If for given tile is a record in productMetadata tile list
								and the layer for this tile is not present in the map at the same time,
								then add the tile (as layer) to the map and use the opacity of existing layer */
								if (relevantTile) {
									const existingLayer = getLayerByProductMetadataKeyAndTileKey(
										layers,
										productMetadataKey,
										tileKey
									);
									if (!existingLayer) {
										const layer = getCogLayerDefinition(
											state,
											productMetadataKey,
											relevantTile,
											productMetadataModel.data.product,
											existingOpacity
										);
										if (layer) {
											layersToAdd.push(layer);
										}
									}
								}
							});
						}
					});
				}

				if (layersToAdd.length) {
					dispatch(CommonAction.maps.addMapLayers(map.key, layersToAdd));
				}
			});
		}
	};
}

/**
 * @param data {products: Array, tiles: Array} products: A collection of products metadata. tiles: List of S2 tiles for given mapView.
 **/
function handleLoadResponse(data) {
	return (dispatch, getState) => {
		const {products, tiles} = data;

		let models = [];
		let keys = [];
		products.forEach(product => {
			if (product.data) {
				models.push(product);
			}

			keys.push(product.key);
		});

		if (models.length) {
			dispatch(add(models));
		}

		dispatch(setActiveKeys(keys));

		if (tiles?.length) {
			dispatch(actionSetActiveTiles(tiles));
		}
	};
}

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

		const {tiles, merged} = productMetadata.data;

		const isLayerPresent =
			map?.data?.layers &&
			!!_find(
				map.data.layers,
				layer => layer.productMetadataKey === productMetadataKey
			);

		// Remove or add layer(s)
		if (isLayerPresent) {
			dispatch(removeProductOutlineLayer(map.key, productMetadataKey));
			if (tiles) {
				dispatch(removeLayersForTiles(productMetadataKey, tiles, map.key));
			} else if (merged) {
				dispatch(removeLayerForMerged(productMetadataKey, merged, map.key));
			}
		} else {
			dispatch(addProductOutlineLayer(map.key, productMetadata));

			if (tiles) {
				dispatch(
					addLayersForTiles(
						productMetadataKey,
						tiles,
						productMetadata?.data.product,
						map.key
					)
				);
			} else if (merged) {
				dispatch(
					addLayerForMerged(
						productMetadataKey,
						merged,
						productMetadata?.data.product,
						map.key
					)
				);
			}
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
			const layerKey = getUniqueCogLayerKey(productMetadataKey, tile);
			const existingLayer = Select.maps.getMapLayerStateByMapKeyAndLayerKey(
				getState(),
				mapKey,
				layerKey
			);
			if (existingLayer) {
				// TODO remove multiple layers at once?
				dispatch(CommonAction.maps.removeMapLayer(mapKey, layerKey));
			}
		});
	};
}

/**
 * @param productMetadataKey {string} unique key of product metadata
 * @param merged {Object}
 * @param mapKey {string}
 */
function removeLayerForMerged(productMetadataKey, merged, mapKey) {
	return (dispatch, getState) => {
		const layerKey = getUniqueCogLayerKey(productMetadataKey);
		const existingLayer = Select.maps.getMapLayerStateByMapKeyAndLayerKey(
			getState(),
			mapKey,
			layerKey
		);
		if (existingLayer) {
			dispatch(CommonAction.maps.removeMapLayer(mapKey, layerKey));
		}
	};
}

/**
 * @param mapKey {string}
 * @param productMetadataKey {string} unique key of product metadata
 */
function removeProductOutlineLayer(mapKey, productMetadataKey) {
	return (dispatch, getState) => {
		dispatch(CommonAction.maps.removeMapLayer(mapKey, productMetadataKey));
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
		const activeTiles = Select.worldCereal.productMetadata.getActiveTiles(
			getState()
		);

		tiles.forEach(tile => {
			if (activeTiles.indexOf(tile.tile) > -1) {
				layers.push(
					getCogLayerDefinition(getState(), productMetadataKey, tile, product)
				);
			}
		});

		dispatch(CommonAction.maps.addMapLayers(mapKey, layers));
	};
}

/**
 * @param productMetadataKey {string} unique key of product metadata
 * @param merged {Object}
 * @param product {string} key of product (case)
 * @param mapKey {string}
 */
function addLayerForMerged(productMetadataKey, merged, product, mapKey) {
	return (dispatch, getState) => {
		const layer = getCogLayerDefinition(
			getState(),
			productMetadataKey,
			null,
			product,
			null,
			merged
		);
		dispatch(CommonAction.maps.addMapLayers(mapKey, [layer]));
	};
}

/**
 * @param mapKey {string}
 * @param productMetadata {Object}
 */
function addProductOutlineLayer(mapKey, productMetadata) {
	return (dispatch, getState) => {
		const outlineLayer = getProductOutlineLayerDefinition(
			getState(),
			productMetadata
		);
		dispatch(CommonAction.maps.addMapLayerToIndex(mapKey, outlineLayer));
	};
}

// helpers ---------------------------------------------------------------------------------------
/**
 * Create unique layer key. Each product has several tiles. Each tile should be an unique map layer.
 * @param productMetadataKey {string} uuid of product metadata
 * @param tile {tile: Object, path: string}
 * @returns {string}
 */
function getUniqueCogLayerKey(productMetadataKey, tile) {
	if (tile) {
		return `${productMetadataKey}_${tile.tile}`;
	} else {
		return `${productMetadataKey}_merged`;
	}
}

/**
 * Get COG layer definition
 * @param state {Object}
 * @param productMetadataKey {string} uuid of product metadata
 * @param tile {tile: Object, path: string}
 * @param product {string}
 * @param opacity {number}
 * @param merged {id: string, product: string, stac: string}
 * @returns {Object} Panther.Layer
 */
function getCogLayerDefinition(
	state,
	productMetadataKey,
	tile,
	product,
	opacity,
	merged
) {
	return {
		key: getUniqueCogLayerKey(productMetadataKey, tile),
		layerKey: productMetadataKey,
		productMetadataKey,
		tileKey: tile?.tile,
		type: 'cog',
		opacity: opacity && opacity >= 0 ? opacity : 1,
		options: {
			url: tile ? tile.product : merged.product,
			style: Select.worldCereal.getStyleDefinitionByProductTemplateKey(
				state,
				product
			),
		},
	};
}

/**
 * Get product outline layer definition
 * @param state {Object}
 * @param productMetadata {Object}
 * @returns {Object} Panther.Layer
 */
function getProductOutlineLayerDefinition(state, productMetadata) {
	const {key, data} = productMetadata;
	const {geometry} = data;
	const outline = {
		type: 'Feature',
		geometry,
	};

	const cogStyle = Select.worldCereal.getStyleDefinitionByProductTemplateKey(
		state,
		productMetadata.data.product
	);

	return {
		key,
		layerKey: key,
		productMetadataKey: key,
		type: 'vector',
		options: {
			renderingTechnique: 'canvas',
			style: {
				rules: [
					{
						styles: [
							{
								fill: null,
								outlineOpacity: 1,
								outlineWidth: 1,
								outlineColor: cogStyle?.rules?.[0]?.styles?.[0].color,
							},
						],
					},
				],
			},
			features: [outline],
		},
	};
}

/**
 * Find a tile in the list of product tiles
 * @param productTiles {Array} A collection of product tiles
 * @param tileKey {string} S2 tile code
 * @returns {Object || null} Selected tile
 */
function getProductTileByTileKey(productTiles, tileKey) {
	return _find(productTiles, tile => tile.tile === tileKey) || null;
}

/**
 * @param layers {Array} A collection of map layers definitions
 * @param productMetadataKey {string}
 * @param tileKey {string} S2 tile code
 * @returns {Object || null} Selected tile
 */
function getLayerByProductMetadataKeyAndTileKey(
	layers,
	productMetadataKey,
	tileKey
) {
	return _find(
		layers,
		layer =>
			layer.productMetadataKey === productMetadataKey &&
			layer.tileKey === tileKey
	);
}

/**
 * @param layers {Array} A collection of map layers definitions
 * @param productMetadataKey {string}
 * @returns {Object || null} Selected tile
 */
function getLayerByProductMetadataKey(layers, productMetadataKey) {
	return _find(
		layers,
		layer => layer.productMetadataKey === productMetadataKey
	);
}

// Creators --------------------------------------------------------------------------------------
/**
 * Set active tiles
 * @param tiles {Array} List of tiles
 */
const actionSetActiveTiles = tiles => {
	return {
		type: ActionTypes.WORLD_CEREAL.PRODUCT_METADATA.SET_ACTIVE_TILES,
		tiles,
	};
};

export default {
	add,
	addLayersForTiles,
	loadForMapSetView,

	handleProductInActiveMap,
};
