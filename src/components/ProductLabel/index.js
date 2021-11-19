import React from 'react';
import {connect} from '@gisatcz/ptr-state';
import Select from '../../state/Select';
import {mapSetKey} from '../../constants/app';

import Presentation from './presentation';

import './style.scss';
import Action from '../../state/Action';

const mapStateToProps = (state, ownProps) => {
	return {
		productTemplate: Select.worldCereal.getProductTemplateByKey(
			state,
			ownProps.productKey
		),
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onProductRemove: () => {
			dispatch(
				Action.worldCereal.removeAllLayersFromMapByLayerKeys(
					ownProps.mapKey,
					ownProps.productMetadataKeys
				)
			);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
