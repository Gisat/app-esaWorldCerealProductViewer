import {connect} from '@gisatcz/ptr-state';
// import {utils} from '@gisatcz/ptr-utils';
// import Action from '../../../../../state/Action';
// import Select from '../../../../../state/Select';
import Presentation from './presentation';

const mapStateToProps = () => {
	return {};
};

const mapDispatchToPropsFactory = () => {
	// const componentId = `RegionSelect_${utils.uuid()}`;
	return () => {
		return {};
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToPropsFactory
)(Presentation);
