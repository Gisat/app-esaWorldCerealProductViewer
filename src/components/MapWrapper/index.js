import {connect} from '@gisatcz/ptr-state';
import Select from '../../state/Select';

import Presentation from './presentation';
import {mapSetKey} from '../../constants/keys';

const mapStateToProps = (state, ownProps) => {
	return {
		activeMapKey: Select.maps.getMapSetActiveMapKey(state, mapSetKey),
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
