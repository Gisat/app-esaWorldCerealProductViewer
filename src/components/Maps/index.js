import {connect} from '@gisatcz/ptr-state';

import Presentation from './presentation';
import Select from '../../state/Select';
import {mapSetKey} from '../../constants/app';

const mapStateToProps = state => {
	return {
		viewLimits: Select.maps.getMapSetViewLimits(state, mapSetKey),
		maps: Select.maps.getMapSetMaps(state, mapSetKey),
		mode: Select.components.get(state, 'Map', 'mode'),
	};
};

const mapDispatchToProps = () => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
