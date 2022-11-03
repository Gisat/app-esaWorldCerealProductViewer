import {connect} from '@gisatcz/ptr-state';
// import {utils} from '@gisatcz/ptr-utils';
import Action from '../../../../../state/Action';
import Select from '../../../../../state/Select';
import Presentation from './presentation';

const mapStateToProps = state => {
	return {
		activeCaseKey: Select.cases.getActiveKey(state),
		cases: Select.cases.getAll(state), // TODO get filtered
	};
};

const mapDispatchToPropsFactory = dispatch => {
	// const componentId = `CaseSelect_${utils.uuid()}`;
	return () => {
		return {
			onActiveCaseChange: activeCaseKey => {
				dispatch(Action.cases.setActiveKey(activeCaseKey));
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
