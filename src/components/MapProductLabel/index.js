import {connect} from '@gisatcz/ptr-state';
import Action from '../../state/Action';
import Select from '../../state/Select';

import Presentation from './presentation';

const mapStateToProps = (state, ownProps) => {
	return {
		productMetadata: Select.worldCereal.productMetadata.getByKey(
			state,
			ownProps.productMetadataKey
		),
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
