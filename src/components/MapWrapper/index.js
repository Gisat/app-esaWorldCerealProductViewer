import {connect} from '@gisatcz/ptr-state';
import Action from '../../state/Action';
import Select from '../../state/Select';

import Presentation from './presentation';
import {mapSetKey} from '../../constants/app';

const mapStateToProps = (state, ownProps) => {
	return {
		activeMapKey: Select.maps.getMapSetActiveMapKey(state, mapSetKey),
		mapSetMapKeys: Select.maps.getMapSetMapKeys(state, mapSetKey),
		productMetadataKeys: Select.worldCereal.productMetadata.getKeysByMapKey(
			state,
			ownProps.mapKey
		),
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		removeMap: mapKey => {
			dispatch(Action.maps.removeMap(mapKey));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
