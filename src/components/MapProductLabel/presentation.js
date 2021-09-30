import React from 'react';
import Modal from 'react-modal';
import RemovableLabel from '../atoms/RemovableLabel';
import ModalWindow from '../atoms/ModalWindow';
import {MetadataInfoTitle} from '../MetadataInfo/presentation';
import MetadataInfo from '../MetadataInfo';

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
		const {product, sos, eos, aez} = productMetadata.data;
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
						product={productTemplate?.data?.nameDisplay || product}
						zone={aez}
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

const MapProductLabelContent = ({product, zone, start, end}) => {
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

export default MapProductLabel;
