import {connect} from '@gisatcz/ptr-state';
import Select from '../../../../state/Select';
// import Action from '../../../../state/Action';

import Presentation from './presentation';

const mapStateToProps = state => {
	const mapSetKey = Select.maps.getActiveSetKey(state);

	return {
		disabledDueBoxRange:
			Select.maps.getMapSetView(state, mapSetKey)?.boxRange > 1000000,
	};
};

const mapDispatchToProps = () => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
