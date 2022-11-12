import {connect} from '@gisatcz/ptr-state';
import Select from '../../../../state/Select';

import Presentation from './presentation';

const mapStateToProps = state => {
	return {
		view: Select.views.getActive(state),
		tourGuideIsOpen: Select.components.get(state, 'tourGuide', 'isOpen'),
	};
};

const mapDispatchToProps = () => {};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
