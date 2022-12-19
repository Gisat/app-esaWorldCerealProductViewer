import {connect} from '@gisatcz/ptr-state';
import {useEffect} from 'react';
import Action from '../state/Action';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import Maps from '../components/Maps';
import Header from '../components/views/common/Header';
import GlobalProducts from '../components/views/global/GlobalProducts';
import backgroundLayers from '../data/layers/backgroundLayers';
// import {Action} from '@gisatcz/ptr-state';

const viewKey = 'fc3aac1e-ffb2-4925-ae38-c95b8e8311c7';
const title = 'Global view';

const activeSetKey = 'globalView-mapSet'; // TODO fetch from redux

const GlobalViewPage = ({
	onViewSelect,
	setMapSetBackgroundLayer,
	onViewChange,
}) => {
	useEffect(() => {
		const urlSearchParams = new URLSearchParams(window.location.search);
		const params = Object.fromEntries(urlSearchParams.entries());

		// PARAMS
		// backgroundLayer
		// boxRange
		// latitude
		// longitude
		// heading
		// tilt
		// roll
		// elevation exaggeration

		console.log('window.location', window.location);

		onViewSelect(viewKey);

		const delayForReduxAction = setTimeout(() => {
			if (params.backgroundLayer) {
				setMapSetBackgroundLayer(params.backgroundLayer);
			}
			if (params.boxRange) {
				console.log(' params.boxRange', params.boxRange);
				onViewChange({boxRange: params.boxRange});
				// Action.views.updateEdited({boxRange: params.boxRange});
			}
		}, 500);

		return () => clearTimeout(delayForReduxAction);
	}, []);

	return (
		<>
			<Helmet defaultTitle={`WorldCereal ${`| ${title}`}`} />
			<div className="worldCereal-ProductViewer">
				<Header />
				<Maps />
				<GlobalProducts />
			</div>
		</>
	);
};

GlobalViewPage.propTypes = {
	onViewSelect: PropTypes.func,
	setMapSetBackgroundLayer: PropTypes.func,
	onViewChange: PropTypes.func,
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onViewSelect: viewKey => {
			dispatch(Action.worldCereal.applyView(viewKey));
		},
		setMapSetBackgroundLayer: layerKey => {
			dispatch(
				Action.maps.setMapSetBackgroundLayer(
					activeSetKey,
					backgroundLayers[layerKey]
				)
			);
		},
		onViewChange: update => {
			dispatch(Action.worldCereal.updateMapView(ownProps.stateMapKey, update));
			dispatch(Action.worldCereal.updateOverviewMap());
		},
	};
};

export default connect(() => ({}), mapDispatchToProps)(GlobalViewPage);
