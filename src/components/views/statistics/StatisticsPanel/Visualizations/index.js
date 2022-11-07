import {connect, setRecomputeState} from '@gisatcz/ptr-state';
import Select from '../../../../../state/Select';
import Presentation from './presentation';

const mapStateToProps = state => {
	setRecomputeState(state);

	return {
		components: Select.worldCereal.statistics.getVisualizationComponents(state),
	};
};

const mapDispatchToProps = () => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
