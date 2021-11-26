import {connect} from '@gisatcz/ptr-state';

import Presentation from './presentation';
import Select from '../../state/Select';
import {mapSetKey} from '../../constants/app';

const mapStateToProps = (state, ownProps) => {
	return {
		viewLimits: Select.maps.getMapSetViewLimits(state, mapSetKey),
		mapsInUse: Select.maps.getAllMapsInUse(state),
		mapCompareMode: Select.app.getLocalConfiguration(state, 'mapCompareMode'),
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
