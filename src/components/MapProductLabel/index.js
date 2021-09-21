import React from 'react';
import {connect} from '@gisatcz/ptr-state';
import {Icon} from '@gisatcz/ptr-atoms';
import Action from '../../state/Action';
import Select from '../../state/Select';
import {mapSetKey} from '../../constants/app';

import RemovableLabel from '../atoms/RemovableLabel';
import './style.scss';

const mapStateToProps = (state, ownProps) => {
	return {
		isProductInVisibleArea:
			Select.worldCereal.productMetadata.isModelInMapExtent(
				state,
				ownProps.productMetadataKey,
				mapSetKey
			),
		productMetadata: Select.worldCereal.productMetadata.getByKey(
			state,
			ownProps.productMetadataKey
		),
		productTemplate: Select.worldCereal.getProductTemplateByProductMetadataKey(
			state,
			ownProps.productMetadataKey
		),
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onProductRemove: () => {
			dispatch(
				Action.worldCereal.removeAllLayersFromMapByLayerKey(
					ownProps.mapKey,
					ownProps.productMetadataKey
				)
			);
		},
	};
};

const MapProductLabel = props => {
	const {
		isProductInVisibleArea,
		productMetadata,
		productTemplate,
		onProductRemove,
	} = props;
	if (productMetadata) {
		const {product, sos, eos, aez_id} = productMetadata.data;
		const stripColor =
			productTemplate?.data?.style?.rules?.[0]?.styles?.[0]?.color;

		return (
			<RemovableLabel
				stripColor={stripColor}
				onRemove={onProductRemove}
				active={isProductInVisibleArea}
				floating
			>
				<MapProductLabelContent
					icon={productTemplate?.data?.icon}
					product={productTemplate?.data?.nameDisplay || product}
					zone={aez_id}
					start={sos}
					end={eos}
				/>
			</RemovableLabel>
		);
	} else {
		return null;
	}
};

const MapProductLabelContent = ({icon, product, zone, start, end}) => {
	return (
		<>
			<div className="worldCereal-MapProductLabel-header">
				{icon ? <Icon icon={icon} /> : null}
				<div>
					<span className="worldCereal-MapProductLabel-product">{product}</span>
					<span className="worldCereal-MapProductLabel-zone">
						(zone {zone})
					</span>
				</div>
			</div>
			<div className="worldCereal-MapProductLabel-period">
				{start} / {end}
			</div>
		</>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(MapProductLabel);
