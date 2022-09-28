import {connect} from '@gisatcz/ptr-state';
import Select from '../../../state/Select';
import Presentation from './presentation';
import {mapSetKey} from '../../../constants/app';

const mapStateToProps = (state, ownProps) => {
	const componentConfiguration =
		Select.worldCereal.configuration.getComponentConfiguration(
			state,
			ownProps.configurationGroupKey,
			mapSetKey,
			ownProps.component
		);
	return {
		componentConfiguration,
	};
};

const mapDispatchToProps = () => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
