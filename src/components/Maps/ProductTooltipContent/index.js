import {connect} from '@gisatcz/ptr-state';
import Select from '../../../state/Select';

import Presentation from './presentation';

const mapStateToProps = (state, ownProps) => {
	const productMetadata = Select.worldCereal.productMetadata.getByKey(
		state,
		ownProps.productKey
	);
	const productTemplate = Select.worldCereal.getProductTemplateByKey(
		state,
		productMetadata?.data?.product
	);
	return {
		productMetadata,
		productTemplate,
	};
};

const mapDispatchToProps = () => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
