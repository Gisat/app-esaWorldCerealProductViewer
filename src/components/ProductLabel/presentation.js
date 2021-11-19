import React from 'react';
import PropTypes from 'prop-types';
import ExpandableLabel, {
	ExpandableLabelBody,
	ExpandableLabelHeader,
} from '../atoms/ExpandableLabel';

import './style.scss';

const ProductLabel = ({
	productMetadata,
	productTemplate,
	productKey,
	productMetadataKeys,
	onProductRemove,
}) => {
	const productCount = productMetadataKeys?.length;
	const color = productTemplate?.data?.style?.rules?.[0]?.styles?.[0]?.color;

	return (
		<ExpandableLabel floating className="worldCereal-ProductLabel">
			<ExpandableLabelHeader>
				<ProductLabelHeader
					product={productTemplate?.data?.nameDisplay || productKey}
					productMetadata={productMetadata}
					count={productCount}
				/>
			</ExpandableLabelHeader>
			<ExpandableLabelBody height={6}></ExpandableLabelBody>
		</ExpandableLabel>
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

export default ProductLabel;
