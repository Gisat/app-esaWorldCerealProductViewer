import {connect} from '@gisatcz/ptr-state';
import Action from '../../state/Action';
import Presentation from './presentation';
import Select from '../../state/Select';

const mapStateToProps = state => {
	return {
		activeView: Select.views.getActive(state),
		introOverlayIsOpen: Select.components.get(state, 'IntroOverlay', 'open'),
		activeLayers: Select.maps.getActiveMap(state),
		activeFilters:
			Select.worldCereal.productMetadataFilter.getActiveFilter(state),
	};
};

const mapDispatchToProps = dispatch => {
	return {
		openIntroOverlay: open => {
			dispatch(Action.components.set('IntroOverlay', 'open', open));
		},
		redirectToDetailedView: () => {
			dispatch(
				Action.worldCereal.applyView('371846f9-0270-4e43-a46a-db009cd5946a')
			);
		},
		redirectToGlobalView: () => {
			dispatch(
				Action.worldCereal.applyView('fc3aac1e-ffb2-4925-ae38-c95b8e8311c7')
			);
		},
		activateDefaultLayer: () => {
			dispatch(
				Action.worldCereal.productMetadata.handleProductInActiveMap(
					'b8ae22a1-5444-52db-bcd3-096faf2315cc',
					'f7e2d7d4-55af-5077-99dc-d72ce9b748e2'
				)
			);
		},
		controlTourGuide: isOpen => {
			dispatch(Action.components.set('tourGuide', 'isOpen', isOpen));
		},
		expandProductLabel: expand => {
			dispatch(
				Action.components.set('tourGuide', 'productLabel', {expanded: expand})
			);
		},
		expandFilterWindow: expand => {
			dispatch(
				Action.components.set('tourGuide', 'filterWindow', {expanded: expand})
			);
		},
		removeAllFilters: () => {
			dispatch(
				Action.worldCereal.productMetadataFilter.removeAllValuesFromActiveFilter()
			);
		},
		addDefaultFillter: () => {
			dispatch(
				Action.worldCereal.productMetadataFilter.addValueToActiveFilter(
					'product',
					'annualcropland'
				)
			);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
