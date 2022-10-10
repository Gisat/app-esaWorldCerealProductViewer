import {connect} from '@gisatcz/ptr-state';
import Action from '../../state/Action';
import Select from '../../state/Select';

const mapStateToProps = (state, ownProps) => {
	if (ownProps.stateMapSetKey) {
		const activeMapKey = Select.maps.getMapSetActiveMapKey(
			state,
			ownProps.stateMapSetKey
		);
		return {
			activeMapKey,
			activeMapView: Select.maps.getMapSetActiveMapView(
				state,
				ownProps.stateMapSetKey
			),
			maps: Select.maps.getMapSetMapKeys(state, ownProps.stateMapSetKey),
			view: Select.maps.getMapSetView(state, ownProps.stateMapSetKey),
			activeMapViewport: Select.maps.getViewportByMapKey(state, activeMapKey),
			viewLimits: Select.maps.getMapSetViewLimits(
				state,
				ownProps.stateMapSetKey
			),
		};
	} else {
		return {
			backgroundLayer: null,
			layers: null,
		};
	}
};

const mapDispatchToPropsFactory = () => {
	return (dispatch, ownProps) => {
		if (ownProps.stateMapSetKey) {
			return {
				onMount: () => {
					dispatch(Action.maps.mapSetUseRegister(ownProps.stateMapSetKey));
				},
				onUnmount: () => {
					dispatch(Action.maps.mapSetUseClear(ownProps.stateMapSetKey));
				},
				onZoomEnd: () => {
					dispatch(Action.worldCereal.loadProducts());
				},
				onPanEnd: () => {
					dispatch(Action.worldCereal.loadProducts());
				},
				updateView: (update, mapKey) => {
					dispatch(Action.worldCereal.updateMapView(mapKey, update));
					dispatch(Action.worldCereal.updateOverviewMap());
				},
				resetHeading: () => {},
				onMapRemove: mapKey => {
					dispatch(
						Action.maps.removeMapFromSet(ownProps.stateMapSetKey, mapKey)
					);
				},
			};
		} else {
			return {
				onMount: () => {},

				onUnmount: () => {},

				refreshUse: () => {},
			};
		}
	};
};

export default connect(mapStateToProps, mapDispatchToPropsFactory);
