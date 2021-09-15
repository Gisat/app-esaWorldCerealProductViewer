import {connect} from '@gisatcz/ptr-state';
import Action from '../../state/Action';
import Select from '../../state/Select';

import Presentation from './presentation';
import {mapSetKey} from '../../constants/app';

const mapStateToProps = (state, ownProps) => {
	return {
		productMetadata: Select.worldCereal.productMetadata.getByMapSetView(
			state,
			mapSetKey
		),
		activeLayers: Select.maps.getMapSetActiveMapLayers(state, mapSetKey),
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		handleProductInActiveMap: data =>
			dispatch(
				Action.worldCereal.productMetadata.handleProductInActiveMap(
					data.layerTemplateKey
				)
			),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
