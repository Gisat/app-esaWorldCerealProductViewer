import {connect} from '@gisatcz/ptr-state';
import Presentation from './presentation';
import Select from '../../../../state/Select';

const mapStateToProps = state => {
	return {
		activeAreaTreeLevel: Select.areas.areaTreeLevels.getActive(state),
	};
};

const mapDispatchToProps = () => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
