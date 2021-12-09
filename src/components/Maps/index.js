import {connect} from '@gisatcz/ptr-state';

import Presentation from './presentation';
import Select from '../../state/Select';
import {mapSetKey} from '../../constants/app';

const mapStateToProps = (state, ownProps) => {
	return {
		viewLimits: Select.maps.getMapSetViewLimits(state, mapSetKey),
		maps: Select.maps.getMapSetMaps(state, mapSetKey),
		mode: Select.components.get(state, 'Maps', 'mode'),
		scale: Select.components.get(state, 'Maps', 'scale'),
		attribution: Select.components.get(state, 'Maps', 'attribution'),
		overviewMap: Select.components.get(state, 'Maps', 'overviewMap'),
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
