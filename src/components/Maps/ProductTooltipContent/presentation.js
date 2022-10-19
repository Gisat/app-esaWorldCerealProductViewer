import PropTypes from 'prop-types';
import './style.scss';
// import {zones} from '../../enumerations';

const SingleProductLabelHeader = ({
	product,
	zone,
	start,
	end,
	color,
	children,
}) => {
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
				<div className="worldCereal-ProductLabelHeader-value">{children}</div>
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
	children: PropTypes.node,
};

const ProductTooltipContent = ({
	productTemplate,
	response,
	productMetadata,
	color,
}) => {
	return (
		<>
			<SingleProductLabelHeader
				product={productTemplate?.data?.nameDisplay}
				zone={productMetadata?.data?.aez}
				start={productMetadata?.data?.sos}
				end={productMetadata?.data?.eos}
				color={productTemplate?.data?.color}
			>
				<>
					<span
						className="dot"
						style={{
							backgroundColor: `rgba(${color})`,
						}}
					></span>
					value: {response.value_list}
				</>
			</SingleProductLabelHeader>
		</>
	);
};

ProductTooltipContent.propTypes = {
	response: PropTypes.object,
	mapKey: PropTypes.string,
	layerKey: PropTypes.string,
	productTemplate: PropTypes.object,
	productMetadata: PropTypes.object,
	color: PropTypes.string,
};

export default ProductTooltipContent;
