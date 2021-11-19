import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Icon} from '@gisatcz/ptr-atoms';
import ExpandableLabel, {
	ExpandableLabelBody,
	ExpandableLabelHeader,
} from '../atoms/ExpandableLabel';
import ModalWindow from '../atoms/ModalWindow';
import {MetadataInfoTitle} from '../MetadataInfo/presentation';
import MetadataInfo from '../MetadataInfo';

import './style.scss';

Modal.setAppElement('#root');

const ProductLabel = ({
	productMetadata,
	productTemplate,
	productKey,
	productMetadataKeys,
	onProductRemove,
}) => {
	const [modalIsOpen, setModalOpen] = React.useState(false);
	const productCount = productMetadataKeys?.length;
	const color = productTemplate?.data?.style?.rules?.[0]?.styles?.[0]?.color;

	return (
		<>
			<ExpandableLabel floating className="worldCereal-ProductLabel">
				<ExpandableLabelHeader>
					<ProductLabelHeader
						product={productTemplate?.data?.nameDisplay || productKey}
						productMetadata={productMetadata}
						count={productCount}
					/>
				</ExpandableLabelHeader>
				<ExpandableLabelBody height={6}>
					<div className="worldCereal-ProductLabelBody">
						<ProductLabelBodyItem title="Set opacity">
							<Icon icon="minus-thick" />
						</ProductLabelBodyItem>
						<ProductLabelBodyItem
							onClick={() => setModalOpen(true)}
							title="Show metadata"
						>
							<Icon icon="info" />
						</ProductLabelBodyItem>
						<ProductLabelBodyItem
							onClick={onProductRemove}
							title="Remove layer"
							dangerous
						>
							<Icon icon="close" />
						</ProductLabelBodyItem>
					</div>
				</ExpandableLabelBody>
			</ExpandableLabel>
			<ModalWindow
				title={<MetadataInfoTitle />}
				isOpen={modalIsOpen}
				onClose={() => setModalOpen(false)}
				className="worldCereal-Modal"
			>
				<MetadataInfo productMetadata={productMetadata} />
			</ModalWindow>
		</>
	);
};

ProductLabel.propTypes = {
	productMetadata: PropTypes.array,
	productTemplate: PropTypes.object,
	productMetadataKeys: PropTypes.array,
	productKey: PropTypes.string,
	onProductRemove: PropTypes.func,
};

const ProductLabelHeader = ({count, product, productMetadata}) => {
	if (count === 1) {
		const {sos, eos, aez} = productMetadata[0].data;
		return (
			<SingleProductLabelHeader
				product={product}
				zone={aez}
				start={sos}
				end={eos}
			/>
		);
	} else {
		return <MultipleProductLabelHeader product={product} count={count} />;
	}
};

const SingleProductLabelHeader = ({product, zone, start, end}) => {
	return (
		<div className="worldCereal-ProductLabelHeader">
			<div className="worldCereal-ProductLabelHeader-title">
				<span className="worldCereal-ProductLabelHeader-product">
					{product}
				</span>
				<span className="worldCereal-ProductLabelHeader-zone">
					(zone {zone})
				</span>
			</div>
			<div className="worldCereal-ProductLabelHeader-period">
				{start} / {end}
			</div>
		</div>
	);
};

const MultipleProductLabelHeader = ({product, count}) => {
	return (
		<div className="worldCereal-ProductLabelHeader">
			<div className="worldCereal-ProductLabelHeader-title">
				<span className="worldCereal-ProductLabelHeader-product">
					{product}
				</span>
			</div>
			<div className="worldCereal-ProductLabelHeader-productsCount">
				<em>{count}</em> products
			</div>
		</div>
	);
};

const ProductLabelBodyItem = ({title, dangerous, onClick, children}) => {
	const classes = classnames('worldCereal-ProductLabelBodyItem', {
		'is-hoverable': !!onClick,
		'is-dangerous': dangerous,
	});

	return (
		<div className={classes} onClick={onClick}>
			<div className="worldCereal-ProductLabelBodyItem-title">{title}</div>
			<div className="worldCereal-ProductLabelBodyItem-tool">{children}</div>
		</div>
	);
};

export default ProductLabel;
