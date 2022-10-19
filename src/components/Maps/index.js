import {connect} from '@gisatcz/ptr-state';

import Presentation from './presentation';
import Select from '../../state/Select';

const mapStateToProps = state => {
	const mapSetKey = Select.maps.getActiveSetKey(state);

	return {
		mapSetKey,
		viewLimits: Select.maps.getMapSetViewLimits(state, mapSetKey),
		maps: Select.maps.getMapSetMaps(state, mapSetKey),
		mode: Select.components.get(state, 'Maps', 'mode'),
	};
};

const mapDispatchToProps = () => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
