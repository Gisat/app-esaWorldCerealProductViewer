import {connect, setRecomputeState} from '@gisatcz/ptr-state';
import Action from '../../../../state/Action';
import Select from '../../../../state/Select';

import Presentation from './presentation';

const mapStateToProps = (state, ownProps) => {
	setRecomputeState(state);
	return {
		data: Select.worldCereal.charts.getDataForHeatMapTable(
			ownProps.componentKey
		),
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onMount: () => {
			dispatch(
				Action.worldCereal.statistics.useDataForHeatMapTable(
					ownProps.componentKey
				)
			);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
