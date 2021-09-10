import {connect} from '@gisatcz/ptr-state';
import Action from '../../state/Action';
import Select from '../../state/Select';

import Presentation from './presentation';
import {mapSetKey} from '../../constants/keys';

const mapStateToProps = (state, ownProps) => {
	return {
		productMetadata: Select.worldCereal.productMetadata.getByMapSetView(
			state,
			mapSetKey
		),
		layers: Select.maps.getMapSetActiveMapLayers(state, mapSetKey),
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		handleProductInActiveMap: metadataKey =>
			dispatch(
				Action.worldCereal.productMetadata.handleProductInActiveMap(metadataKey)
			),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
