import {connect} from '@gisatcz/ptr-state';
import Action from '../../../../state/Action';
// import Select from '../../../../state/Select';

import Presentation from './presentation';

const mapStateToProps = () => {
	return {};
};

const mapDispatchToProps = () => {
	return dispatch => {
		return {
			onMount: () => {
				dispatch(Action.worldCereal.globalProductMetadata.load());
			},
		};
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
