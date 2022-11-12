import {connect} from '@gisatcz/ptr-state';
import Action from '../../../../../../../state/Action';

import presentation from './presentation';

const mapStateToProps = () => {
	return {};
};

const mapDispatchToProps = dispatch => {
	return {
		onClick: () => {
			dispatch(
				Action.worldCereal.statistics.setActivePlaceKeysByActiveSelectionFeatureKeys()
			);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(presentation);
