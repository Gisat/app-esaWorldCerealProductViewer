import {connect} from '@gisatcz/ptr-state';
import Select from '../../state/Select';

import Presentation from './presentation';

const mapStateToProps = state => {
	const activeScreen = Select.router.getHomepageScreen(state);

	return {
		open: Select.components.get(state, 'IntroOverlay', 'open'),
		activeScreen,
	};
};

const mapDispatchToProps = () => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
