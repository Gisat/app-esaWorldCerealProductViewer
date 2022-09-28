import {connect} from '@gisatcz/ptr-state';
import Presentation from './presentation';
import Action from '../../state/Action';
import Select from '../../state/Select';

const mapStateToProps = state => {
	return {
		open:
			Select.components.get(state, 'IntroOverlay', 'open') === false
				? false
				: true,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		closeOverlay: () => {
			dispatch(Action.components.set('IntroOverlay', 'open', false));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
