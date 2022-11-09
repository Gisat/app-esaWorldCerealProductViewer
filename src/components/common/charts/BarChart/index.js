import {connect, setRecomputeState} from '@gisatcz/ptr-state';
import Action from '../../../../state/Action';
import Select from '../../../../state/Select';

import Presentation from './presentation';

const mapStateToProps = (state, ownProps) => {
	setRecomputeState(state);
	const activeSelection = Select.selections.getActive(state);

	return {
		data: Select.worldCereal.charts.getDataForNivoBarChart(
			ownProps.componentKey
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
		onMount: () => dispatch(Action.data.components.use(ownProps.componentKey)),
		onClick: keys => {
			dispatch(Action.selections.setActiveSelectionFeatureKeysFilterKeys(keys));

			// TODO handle this specific action out of this component
			dispatch(
				Action.worldCereal.statistics.setActivePlaceKeysByActiveSelectionFeatureKeys()
			);
		},
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
