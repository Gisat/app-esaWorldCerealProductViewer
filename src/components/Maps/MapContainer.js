import {connect, setRecomputeState as setState} from '@gisatcz/ptr-state';
import Action from '../../state/Action';
import Select from '../../state/Select';

const mapStateToProps = (state, ownProps) => {
	setState(state);

	return {
		backgroundLayer: Select.maps.getMapBackgroundLayer(ownProps.stateMapKey),
		layers: Select.maps.getMapLayers(ownProps.stateMapKey),
		viewport: Select.maps.getViewportByMapKey(state, ownProps.stateMapKey),
		view: Select.maps.getViewByMapKey(state, ownProps.stateMapKey),
		viewLimits: Select.maps.getViewLimitsByMapKey(state, ownProps.stateMapKey),
		mapKey: ownProps.stateMapKey,
	};
};

const mapDispatchToPropsFactory = () => {
	return (dispatch, ownProps) => {
		return {
			onMount: (mapWidth, mapHeight) => {
				dispatch(
					Action.maps.setMapViewport(ownProps.stateMapKey, mapWidth, mapHeight)
				);
				dispatch(Action.maps.use(ownProps.stateMapKey, null, null));
			},

			onResize: (mapWidth, mapHeight) => {
				dispatch(
					Action.maps.setMapViewport(ownProps.stateMapKey, mapWidth, mapHeight)
				);
				dispatch(
					Action.worldCereal.adjustInitialBoxRange(ownProps.stateMapKey)
				);
				dispatch(Action.maps.use(ownProps.stateMapKey, null, null));
				dispatch(Action.worldCereal.updateOverviewMap());
			},

			onUnmount: () => {
				dispatch(Action.maps.mapUseClear(ownProps.stateMapKey));
			},

			refreshUse: () => {},
			onZoomEnd: () => {
				dispatch(Action.worldCereal.loadProducts());
			},
			onPanEnd: () => {
				dispatch(Action.worldCereal.loadProducts());
			},
			onViewChange: update => {
				dispatch(
					Action.worldCereal.updateMapView(ownProps.stateMapKey, update)
				);
				dispatch(Action.worldCereal.updateOverviewMap());
			},

			onPropViewChange: (update, mapWidth, mapHeight) => {
				dispatch(
					Action.maps.setMapViewport(ownProps.stateMapKey, mapWidth, mapHeight)
				);
				dispatch(Action.maps.use(ownProps.stateMapKey, undefined, undefined));
			},

			onClick: () => {
				dispatch(Action.maps.setMapSetActiveMapKey(ownProps.stateMapKey));
			},
			onLayerClick: (mapKey, layerKey, selectedFeatureKeys) => {
				dispatch(
					Action.maps.setLayerSelectedFeatureKeys(
						ownProps.stateMapKey,
						layerKey,
						selectedFeatureKeys
					)
				);
			},
		};
	};
};

export default connect(mapStateToProps, mapDispatchToPropsFactory);
