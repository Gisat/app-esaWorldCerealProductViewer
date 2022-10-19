import {connect} from '@gisatcz/ptr-state';
import {SimpleLayersControl} from '@gisatcz/ptr-maps';
import Select from '../../../state/Select';
import Action from '../../../state/Action';
import backgroundLayers from '../../../data/layers/backgroundLayers';

const mapStateToProps = (state, ownProps) => {
	const mapSet = Select.maps.getMapSetByKey(state, ownProps.mapSetKey);

	return {
		activeLayerTemplateKey: mapSet?.data?.backgroundLayer?.key,
		layerTemplates: Object.values(backgroundLayers).map(layer => {
			return {
				key: layer.key,
				data: {
					nameDisplay: layer.name,
					thumbnail: layer.thumbnail || layer.key,
				},
			};
		}),
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onSelect: layerKey => {
			dispatch(
				Action.maps.setMapSetBackgroundLayer(
					ownProps.mapSetKey,
					backgroundLayers[layerKey]
				)
			);
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SimpleLayersControl);
