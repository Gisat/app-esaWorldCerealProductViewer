import {connect} from '@gisatcz/ptr-state';
import Action from '../../state/Action';
import Select from '../../state/Select';

import Presentation from './presentation';

const mapStateToProps = state => {
	const mapSetKey = Select.maps.getActiveSetKey(state);
	const layers = Select.worldCereal.timeline.getTimelineLayers(state);
	const activeMapKey = Select.maps.getMapSetActiveMapKey(state, mapSetKey);
	return {
		layers,
		activeMapKey,
		isInteractivityLimited: Select.worldCereal.isInteractivityLimited(
			state,
			mapSetKey
		),
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onLayerClick: (timelineLayerPeriodItem, timelineLayer) =>
			dispatch(
				Action.worldCereal.productMetadata.handleProductInActiveMap(
					timelineLayer?.layerState?.key,
					timelineLayer?.layerState?.spatialDataSourceKey
				)
			),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
