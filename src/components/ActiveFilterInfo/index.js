import {connect} from '@gisatcz/ptr-state';
import Select from '../../state/Select';
import {mapSetKey} from '../../constants/app';

import Presentation from './presentation';

const mapStateToProps = (state, ownProps) => {
	return {
		availableProductMetadata:
			Select.worldCereal.getProductMetadataByMapSetViewAndFilter(
				state,
				mapSetKey
			),
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
