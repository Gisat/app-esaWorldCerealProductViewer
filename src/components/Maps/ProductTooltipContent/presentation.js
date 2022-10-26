import PropTypes from 'prop-types';
import {ProductLabelLegendItem} from '../ProductLabel/presentation';

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
			{color ? (
				<div
					className="worldCereal-ProductLabelHeader-color"
					style={{background: color}}
				/>
			) : null}
			<div className="worldCereal-ProductLabelHeader-body">
				<div className="worldCereal-ProductLabelHeader-title">
					<span className="worldCereal-ProductLabelHeader-product">
						{product}
					</span>
					{zone ? (
						<span className="worldCereal-ProductLabelHeader-zone">
							(zone {zone})
						</span>
					) : null}
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
	productMetadata,
	color,
	value,
}) => {
	return (
		<>
			<SingleProductLabelHeader
				product={productTemplate?.data?.nameDisplay}
				zone={productMetadata?.data?.aez}
				start={productMetadata?.data?.sos}
				end={productMetadata?.data?.eos}
			>
				<>
					<ProductLabelLegendItem color={`rgba(${color})`} name={value} />
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
	value: PropTypes.string,
};

export default ProductTooltipContent;
