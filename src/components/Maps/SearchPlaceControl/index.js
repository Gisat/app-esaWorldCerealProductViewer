import {connect} from '@gisatcz/ptr-state';
import Action from '../../../state/Action';
import Presentation from './presentation';

const mapStateToProps = () => {
	return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		setMapView: place => {
			dispatch(
				Action.worldCereal.updateMapSetActiveMapView(ownProps.mapSetKey, place)
			);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
