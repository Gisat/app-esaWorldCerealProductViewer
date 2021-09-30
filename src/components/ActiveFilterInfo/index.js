import {connect} from '@gisatcz/ptr-state';
import Action from '../../state/Action';
import Select from '../../state/Select';
import {mapSetKey} from '../../constants/app';

import Presentation from './presentation';

const mapStateToProps = (state, ownProps) => {
	return {
		activeFilterParameters:
			Select.worldCereal.productMetadataFilter.getActiveFilterWithFilterParameters(
				state
			),
		availableProductMetadata:
			Select.worldCereal.getProductMetadataByMapSetViewAndActiveFilter(
				state,
				mapSetKey
			),
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onValueRemove: (parameter, value) => {
			dispatch(
				Action.worldCereal.productMetadataFilter.removeValueFromActiveFilter(
					parameter,
					value
				)
			);
		},
		onAllValuesRemove: parameter => {
			dispatch(
				Action.worldCereal.productMetadataFilter.removeAllParameterValuesFromActiveFilter(
					parameter
				)
			);
		},
		onClearAll: () => {
			dispatch(
				Action.worldCereal.productMetadataFilter.removeAllValuesFromActiveFilter()
			);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
