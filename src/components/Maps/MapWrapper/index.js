import {connect} from '@gisatcz/ptr-state';
import Action from '../../../state/Action';
import Select from '../../../state/Select';
import {disabledRemoveAllLayerForViewName} from '../../../constants/app';

import Presentation from './presentation';

const mapStateToProps = (state, ownProps) => {
	const mapSetKey = Select.maps.getActiveSetKey(state);
	const productsMetadata =
		Select.worldCereal.productMetadata.getModelsByMapKeyGroupedByParam(
			state,
			ownProps.mapKey,
			'product'
		);
	const globalProductsMetadata =
		Select.worldCereal.globalProductMetadata.getModelsByMapKeyGroupedByParam(
			state,
			ownProps.mapKey,
			'product'
		);

	const overlayLayer = Select.maps.getLayerStateByLayerKeyAndMapKey(
		state,
		ownProps.mapKey,
		'aez'
	);

	const activeView = Select.views.getActive(state);
	const view = activeView?.data?.nameInternal;
	const showRemoveAllLayers = view !== disabledRemoveAllLayerForViewName;
	return {
		activeMapKey: Select.maps.getMapSetActiveMapKey(state, mapSetKey),
		mapSetMapKeys: Select.maps.getMapSetMapKeys(state, mapSetKey),
		productsMetadata: productsMetadata || globalProductsMetadata,
		layersState: Select.maps.getLayersStateByMapKey(state, ownProps.mapKey),
		overlayLayer,
		showRemoveAllLayers,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		removeMap: mapKey => {
			dispatch(Action.maps.removeMap(mapKey));
		},
		removeAllLayers: mapKey => {
			dispatch(Action.maps.removeAllMapLayers(mapKey));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
