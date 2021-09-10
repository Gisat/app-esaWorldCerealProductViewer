import {commonActions, Action as CommonAction} from '@gisatcz/ptr-state';
import {find as _find} from 'lodash';
import Select from '../../Select';
import ActionTypes from '../../../constants/ActionTypes';
import {mapSetKey} from '../../../constants/keys';

const add = commonActions.add(ActionTypes.WORLD_CEREAL.PRODUCT_METADATA);
const setActiveKeys = commonActions.setActiveKeys(
	ActionTypes.WORLD_CEREAL.PRODUCT_METADATA
);

function handleProductInActiveMap(productMetadataKey) {
	return (dispatch, getState) => {
		// TODO getActiveMapSetActiveMap selector
		const maps = Select.maps.getMapSetMaps(getState(), mapSetKey);
		const activeMapKey = Select.maps.getMapSetActiveMapKey(
			getState(),
			mapSetKey
		);
		const map = _find(maps, map => map.key === activeMapKey);

		const productMetadata = Select.worldCereal.productMetadata.getByKey(
			getState(),
			productMetadataKey
		);

		const {tiles} = productMetadata.data;

		const layerIsPresent =
			map?.data?.layers &&
			!!_find(map.data.layers, layer => layer.layerKey === productMetadataKey);
		if (layerIsPresent) {
			tiles.forEach(tile => {
				dispatch(
					CommonAction.maps.removeMapLayer(
						map.key,
						`${productMetadataKey}_${tile.tile}`
					)
				);
			});
		} else {
			const layers = [];
			tiles.forEach(tile =>
				layers.push({
					key: `${productMetadataKey}_${tile.tile}`,
					layerKey: productMetadataKey,
					type: 'cog',
					options: {
						url: tile.path,
						style: {
							rules: [
								{
									styles: [
										{
											color: '#000000',
										},
										{
											bandIndex: 0,
											values: {
												0: {color: null},
											},
										},
									],
								},
							],
						},
					},
				})
			);
			dispatch(CommonAction.maps.addMapLayers(map.key, layers));
		}
	};
}

export default {
	add,
	setActiveKeys,

	handleProductInActiveMap,
};
