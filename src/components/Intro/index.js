import {connect} from '@gisatcz/ptr-state';
import Presentation from './presentation';
// import Action from '../../state/Action';
// import Select from '../../state/Select';

const mapStateToProps = () => {
	return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onViewSelect: () => {
			ownProps.closeOverlay();
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
