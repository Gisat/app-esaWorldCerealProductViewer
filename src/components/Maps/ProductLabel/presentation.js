import {useState} from 'react';
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
	const [modalIsOpen, setModalOpen] = useState(false);
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
	layersOpacity: PropTypes.number,
	onOpacityChange: PropTypes.func,
	zIndex: PropTypes.number,
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

ProductLabelHeader.propTypes = {
	color: PropTypes.string,
	count: PropTypes.number,
	product: PropTypes.string,
	productMetadata: PropTypes.array,
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

SingleProductLabelHeader.propTypes = {
	color: PropTypes.string,
	end: PropTypes.string,
	product: PropTypes.string,
	start: PropTypes.string,
	zone: PropTypes.number,
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

MultipleProductLabelHeader.propTypes = {
	color: PropTypes.string,
	count: PropTypes.string,
	product: PropTypes.object,
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

ProductLabelBodyItem.propTypes = {
	children: PropTypes.node,
	dangerous: PropTypes.bool,
	onClick: PropTypes.func,
	title: PropTypes.string,
};

const ProductLabelLegend = ({style}) => {
	// for cogs values only
	if (style) {
		let legendItems = [];
		_forIn(style.values, options => {
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

ProductLabelLegend.propTypes = {
	style: PropTypes.shape({
		values: PropTypes.object,
	}),
};

const ProductLabelLegendItem = ({color, name}) => {
	return (
		<div className="worldCereal-ProductLabelLegendItem">
			<div style={{background: color}} />
			<span>{name}</span>
		</div>
	);
};

ProductLabelLegendItem.propTypes = {
	color: PropTypes.string,
	name: PropTypes.string,
};

export default ProductLabel;
