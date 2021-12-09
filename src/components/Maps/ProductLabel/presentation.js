import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {find as _find, forIn as _forIn} from 'lodash';
import {Icon} from '@gisatcz/ptr-atoms';
import ExpandableLabel, {
	ExpandableLabelBody,
	ExpandableLabelHeader,
} from '../../atoms/ExpandableLabel';
import ModalWindow from '../../atoms/ModalWindow';
import {MetadataInfoTitle} from './MetadataInfo/presentation';
import MetadataInfo from './MetadataInfo';
import OpacitySlider from '../../atoms/OpacitySlider';

import './style.scss';

Modal.setAppElement('#root');

const ProductLabel = ({
	layersOpacity,
	productMetadata,
	productTemplate,
	productKey,
	productMetadataKeys,
	onProductRemove,
	onOpacityChange,
	zIndex,
}) => {
	const [modalIsOpen, setModalOpen] = React.useState(false);
	const productCount = productMetadataKeys?.length;
	const styles = productTemplate?.data?.style?.rules?.[0]?.styles;
	const styleForLegend = _find(styles, style => style.legend);
	const color = styles?.[0]?.color;

	return (
		<>
			<ExpandableLabel
				floating
				className="worldCereal-ProductLabel"
				zIndex={zIndex}
			>
				<ExpandableLabelHeader>
					<ProductLabelHeader
						product={productTemplate?.data?.nameDisplay || productKey}
						productMetadata={productMetadata}
						count={productCount}
						color={color}
					/>
				</ExpandableLabelHeader>
				<ExpandableLabelBody height={styleForLegend ? 9.5 : 6}>
					<div className="worldCereal-ProductLabelBody">
						<div>
							<ProductLabelBodyItem title="Set opacity">
								<OpacitySlider
									value={layersOpacity}
									onChange={onOpacityChange}
								/>
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
								// dangerous
							>
								<Icon icon="close" />
							</ProductLabelBodyItem>
						</div>
						<ProductLabelLegend style={styleForLegend} />
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

const ProductLabelHeader = ({count, product, productMetadata, color}) => {
	if (count === 1) {
		const {sos, eos, aez} = productMetadata[0].data;
		return (
			<SingleProductLabelHeader
				product={product}
				zone={aez}
				start={sos}
				end={eos}
				color={color}
			/>
		);
	} else {
		return (
			<MultipleProductLabelHeader
				product={product}
				count={count}
				color={color}
			/>
		);
	}
};

const SingleProductLabelHeader = ({product, zone, start, end, color}) => {
	return (
		<div className="worldCereal-ProductLabelHeader">
			<div
				className="worldCereal-ProductLabelHeader-color"
				style={{background: color}}
			/>
			<div className="worldCereal-ProductLabelHeader-body">
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
		</div>
	);
};

const MultipleProductLabelHeader = ({product, count, color}) => {
	return (
		<div className="worldCereal-ProductLabelHeader">
			<div
				className="worldCereal-ProductLabelHeader-color"
				style={{background: color}}
			/>
			<div className="worldCereal-ProductLabelHeader-body">
				<div className="worldCereal-ProductLabelHeader-title">
					<span className="worldCereal-ProductLabelHeader-product">
						{product}
					</span>
				</div>
				<div className="worldCereal-ProductLabelHeader-productsCount">
					<em>{count}</em> products
				</div>
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

const ProductLabelLegend = ({style}) => {
	// TODO for cogs values only
	if (style) {
		let legendItems = [];
		_forIn(style.values, (options, value) => {
			if (options.name) {
				legendItems.push(options);
			}
		});

		return (
			<div className="worldCereal-ProductLabelLegend">
				{legendItems.map((item, i) => {
					return (
						<ProductLabelLegendItem
							key={i}
							color={item.color}
							name={item.name}
						/>
					);
				})}
			</div>
		);
	} else {
		return null;
	}
};

const ProductLabelLegendItem = ({color, name}) => {
	return (
		<div className="worldCereal-ProductLabelLegendItem">
			<div style={{background: color}} />
			<span>{name}</span>
		</div>
	);
};

export default ProductLabel;
