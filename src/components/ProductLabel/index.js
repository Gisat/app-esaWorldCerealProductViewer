import React from 'react';
import {connect} from '@gisatcz/ptr-state';
import Select from '../../state/Select';
import {mapSetKey} from '../../constants/app';

import Presentation from './presentation';

import './style.scss';

const mapStateToProps = (state, ownProps) => {
	return {
		productTemplate: Select.worldCereal.getProductTemplateByKey(
			state,
			ownProps.productKey
		),
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
