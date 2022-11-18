import {connect} from '@gisatcz/ptr-state';
import Select from '../../../state/Select';

import Presentation from './presentation';

const mapStateToProps = (state, ownProps) => {
	return {
		type: Select.data.components.getComponentStateByKey(
			state,
			ownProps.componentKey
		)?.type,
		title: Select.cases.getActive(state)?.data?.nameDisplay,
		subtitle: Select.components.get(state, ownProps.componentKey, 'subtitle'),
	};
};

const mapDispatchToProps = () => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
