import {connect} from '@gisatcz/ptr-state';
import Action from '../../state/Action';
import Select from '../../state/Select';
import {mapSetKey} from '../../constants/app';

import Presentation from './presentation';

const mapStateToProps = state => {
	const layers = Select.worldCereal.timeline.getTimelineLayers(state);
	const activeMapKey = Select.maps.getMapSetActiveMapKey(state, mapSetKey);
	return {
		layers,
		activeMapKey,
		isInteractivityLimited: Select.worldCereal.isInteractivityLimited(state),
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
