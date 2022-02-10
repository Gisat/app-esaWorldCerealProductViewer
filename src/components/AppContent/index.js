import {connect} from '@gisatcz/ptr-state';

import Presentation from './presentation';
import Select from '../../state/Select';
import {mapSetKey} from '../../constants/app';

const mapStateToProps = state => {
	return {
		viewLimits: Select.maps.getMapSetViewLimits(state, mapSetKey),
	};
};

const mapDispatchToProps = () => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
