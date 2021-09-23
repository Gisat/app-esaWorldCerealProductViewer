import React from 'react';
import Modal from 'react-modal';
import {connect} from '@gisatcz/ptr-state';
import Action from '../../state/Action';
import Select from '../../state/Select';
import {mapSetKey} from '../../constants/app';
import ModalWindow from '../atoms/ModalWindow';
import MetadataInfo from '../MetadataInfo';
import RemovableLabel from '../atoms/RemovableLabel';

import './style.scss';
import {MetadataInfoTitle} from '../MetadataInfo/presentation';

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

Modal.setAppElement('#root');

const MapProductLabel = props => {
	const [modalIsOpen, setModalOpen] = React.useState(false);

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
			<>
				<RemovableLabel
					stripColor={stripColor}
					onRemove={onProductRemove}
					onClick={() => {
						setModalOpen(true);
					}}
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
				<ModalWindow
					title={<MetadataInfoTitle />}
					isOpen={modalIsOpen}
					onClose={() => setModalOpen(false)}
				>
					<MetadataInfo productMetadataKey={productMetadata.key} />
				</ModalWindow>
			</>
		);
	} else {
		return null;
	}
};

const MapProductLabelContent = ({icon, product, zone, start, end}) => {
	return (
		<>
			<div className="worldCereal-MapProductLabel-header">
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
