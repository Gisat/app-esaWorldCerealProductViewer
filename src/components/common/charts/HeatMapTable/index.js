import {connect, setRecomputeState} from '@gisatcz/ptr-state';
import Action from '../../../../state/Action';
import Select from '../../../../state/Select';

import Presentation from './presentation';

const mapStateToProps = (state, ownProps) => {
	setRecomputeState(state);
	const activeSelection = Select.selections.getActive(state);
	const nameByAttributeKey =
		Select.worldCereal.statistics.getCaseNameByRelativeAttributeKeyMapping(
			state
		);

	return {
		data: Select.worldCereal.charts.getDataForHeatMapTable(
			ownProps.componentKey,
			{
				nameByAttributeKey,
				order: ['id', 'asc'],
			}
		),
		metadata: Select.worldCereal.charts.getChartMetadata(
			state,
			ownProps.componentKey
		),
		selectedFeatureKeys: activeSelection?.data?.featureKeysFilter?.keys,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onUnmount: () =>
			dispatch(
				Action.worldCereal.statistics.clearUseForHeatMapTable(
					ownProps.componentKey
				)
			),
		onSelectedFeaturesChange: keys => {
			dispatch(
				Action.worldCereal.charts.onSelectedFeaturesChange(
					ownProps.componentKey,
					keys
				)
			);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
