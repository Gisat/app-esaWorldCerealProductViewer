import {commonActions, Action as CommonAction} from '@gisatcz/ptr-state';
import {find as _find} from 'lodash';
import Select from '../../Select';
import ActionTypes from '../../../constants/ActionTypes';
import {mapSetKey} from '../../../constants/keys';
import annualCroplandClassification from '../../../data/styles/annualCroplandClassification';

const add = commonActions.add(ActionTypes.WORLD_CEREAL.PRODUCT_METADATA);
const setActiveKeys = commonActions.setActiveKeys(
	ActionTypes.WORLD_CEREAL.PRODUCT_METADATA
);

function handleProductInActiveMap(productMetadataKey) {
	return (dispatch, getState) => {
		const map = Select.maps.getMapSetActiveMap(getState(), mapSetKey);
		const productMetadata = Select.worldCereal.productMetadata.getByKey(
			getState(),
			productMetadataKey
		);

		const {tiles} = productMetadata.data;

		const layerIsPresent =
			map?.data?.layers &&
			!!_find(map.data.layers, layer => layer.layerKey === productMetadataKey);

		// Remove or add layer(s)
		if (layerIsPresent) {
			tiles.forEach(tile => {
				// TODO remove multiple layers at once?
				dispatch(
					CommonAction.maps.removeMapLayer(
						map.key,
						getUniqueLayerKey(productMetadataKey, tile)
					)
				);
			});
		} else {
			const layers = [];
			tiles.forEach(tile =>
				layers.push(getLayerDefinition(productMetadataKey, tile))
			);
			dispatch(CommonAction.maps.addMapLayers(map.key, layers));
		}
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
 * @param productMetadataKey {string} uuid of product metadata
 * @param tile {tile: Object, path: string}
 * @returns {Object} Panther.Layer
 */
function getLayerDefinition(productMetadataKey, tile) {
	return {
		key: getUniqueLayerKey(productMetadataKey, tile),
		layerKey: productMetadataKey,
		type: 'cog',
		options: {
			url: tile.path,
			style: annualCroplandClassification.data.definition,
		},
	};
}

export default {
	add,
	setActiveKeys,

	handleProductInActiveMap,
};
