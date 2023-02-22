import {connect} from '@gisatcz/ptr-state';
import Select from '../../../state/Select';
import Action from '../../../state/Action';
import Presentation from './presentation';

const mapStateToProps = (state, ownProps) => {
	return {
		currentBoxRange: Select.maps.getMapSetActiveMapView(
			state,
			ownProps.mapSetKey
		)?.boxRange,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onBoxRangeChange: boxRange => {
			dispatch(Action.maps.updateSetView(ownProps.mapSetKey, {boxRange}));
			dispatch(Action.worldCereal.updateOverviewMap());
			dispatch(Action.worldCereal.loadProducts());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
