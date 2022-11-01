import {connect} from '@gisatcz/ptr-state';
import Action from '../../../../state/Action';
import Select from '../../../../state/Select';

import Presentation from './presentation';

const mapStateToProps = state => {
	const activeMapSetKey = Select.maps.getActiveSetKey(state);
	const mapKey = Select.maps.getMapSetActiveMapKey(state, activeMapSetKey);
	return {
		years: Select.worldCereal.globalProductMetadata.getYears(state),
		products: Select.worldCereal.globalProductMetadata.getAll(state, mapKey),
	};
};

const mapDispatchToProps = () => {
	return dispatch => {
		return {
			onMount: () => {
				dispatch(Action.worldCereal.globalProductMetadata.load());
			},
			onProductClick: product => {
				dispatch(
					Action.worldCereal.globalProductMetadata.addProductToMap(product)
				);
			},
		};
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
