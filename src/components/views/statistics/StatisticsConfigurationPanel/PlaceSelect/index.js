import {connect} from '@gisatcz/ptr-state';
// import {utils} from '@gisatcz/ptr-utils';
import Action from '../../../../../state/Action';
import Select from '../../../../../state/Select';
import Presentation from './presentation';

const mapStateToProps = state => {
	return {
		activePlaceKeys: Select.places.getActiveKeys(state),
		places: [
			{key: 'a', data: {nameDisplay: 'Austria'}},
			{key: 'b', data: {nameDisplay: 'Burkina Faso'}},
			{key: 'c', data: {nameDisplay: 'Czech Republic'}},
			{key: 'd', data: {nameDisplay: 'Denmark'}},
			{key: 'i', data: {nameDisplay: 'Italy'}},
			{key: 'j', data: {nameDisplay: 'Japan'}},
			{key: 'l', data: {nameDisplay: 'Laos'}},
			{
				key: 'u',
				data: {
					nameDisplay: 'United Kingdom of Great Britain and North Ireland',
				},
			},
		],
	};
};

const mapDispatchToPropsFactory = dispatch => {
	// const componentId = `PlaceSelect_${utils.uuid()}`;
	return () => {
		return {
			onActivePlacesChange: activePlaceKeys => {
				dispatch(Action.places.setActiveKeys(activePlaceKeys));
			},
			onMount: () => {
				// TODO use - filter by scopeKey
			},
			onUnmount: () => {
				// TODO clear use
			},
		};
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToPropsFactory
)(Presentation);
