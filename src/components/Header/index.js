import {connect} from '@gisatcz/ptr-state';
import {utils} from '@gisatcz/ptr-utils';
import Action from '../../state/Action';
import Select from '../../state/Select';
import {mapSetKey} from '../../constants/app';

import Presentation from './presentation';

const mapStateToProps = (state, ownProps) => {
	return {
		mapSetMapKeys: Select.maps.getMapSetMapKeys(state, mapSetKey),
		showStatusInfo: Select.worldCereal.isInteractivityLimited(state),
		mapsMode: Select.components.get(state, 'Maps', 'mode'),
		mapsInUse: Select.maps.getAllMapsInUse(state),
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		addMap: () => {
			const mapKey = utils.uuid();
			dispatch(Action.maps.addMap({key: mapKey}));
			dispatch(Action.maps.addMapToSet(mapKey, mapSetKey));
		},
		setMapsMode: mode => {
			dispatch(Action.components.set('Maps', 'mode', mode));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
