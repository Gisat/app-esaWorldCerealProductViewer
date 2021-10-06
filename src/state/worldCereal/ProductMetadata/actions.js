import {commonActions, Action as CommonAction} from '@gisatcz/ptr-state';
import {find as _find} from 'lodash';
import utils from '../../../utils';
import productMetadataModel from '../../../models/productMetadata';
import Select from '../../Select';
import ActionTypes from '../../../constants/ActionTypes';
import {userKey, mapSetKey} from '../../../constants/app';

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
		if (viewAsFeature && config) {
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
				const products = Select.worldCereal.productMetadata.getModelsByMapKey(
					state,
					mapKey
				);
				const layersToAdd = [];
				const layers = map.data?.layers;
				if (layers?.length) {
					activeProductsKeys.forEach(productMetadataKey => {
						const product = _.find(products, {key: productMetadataKey});
						const productTiles = product?.data?.tiles;

						if (productTiles) {
							activeTiles.forEach(tileKey => {
								const relevantTile = _find(
									productTiles,
									tile => tile.tile === tileKey
								);
								if (relevantTile) {
									const existingLayer = _find(
										layers,
										layer =>
											layer.productMetadataKey === productMetadataKey &&
											layer.tileKey === tileKey
									);
									if (!existingLayer) {
										const layer = getLayerDefinition(
											state,
											productMetadataKey,
											relevantTile,
											product.data.product
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

		const {tiles} = productMetadata.data;

		const isLayerPresent =
			map?.data?.layers &&
			!!_find(
				map.data.layers,
				layer => layer.productMetadataKey === productMetadataKey
			);

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
		const activeTiles = Select.worldCereal.productMetadata.getActiveTiles(
			getState()
		);

		tiles.forEach(tile => {
			if (activeTiles.indexOf(tile.tile) > -1) {
				layers.push(
					getLayerDefinition(getState(), productMetadataKey, tile, product)
				);
			}
		});

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
		productMetadataKey,
		tileKey: tile.tile,
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
