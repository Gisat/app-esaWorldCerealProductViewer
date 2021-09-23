import React from 'react';
import Modal from 'react-modal';
import {Button} from '@gisatcz/ptr-atoms';
import {connect} from '@gisatcz/ptr-state';
import Action from '../../state/Action';
import Select from '../../state/Select';
import {mapSetKey} from '../../constants/app';

import RemovableLabel from '../atoms/RemovableLabel';
import './style.scss';
import ModalWindow from '../atoms/ModalWindow';

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
					title={<>Product metadata</>}
					isOpen={modalIsOpen}
					onClose={() => setModalOpen(false)}
				>
					<>
						Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Quisque
						tincidunt scelerisque libero. Et harum quidem rerum facilis est et
						expedita distinctio. Proin pede metus, vulputate nec, fermentum
						fringilla, vehicula vitae, justo. Temporibus autem quibusdam et aut
						officiis debitis aut rerum necessitatibus saepe eveniet ut et
						voluptates repudiandae sint et molestiae non recusandae. Integer
						vulputate sem a nibh rutrum consequat. Pellentesque arcu. Praesent
						in mauris eu tortor porttitor accumsan. Nulla est. Phasellus
						faucibus molestie nisl. Mauris dolor felis, sagittis at, luctus sed,
						aliquam non, tellus. Duis pulvinar.
					</>
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
