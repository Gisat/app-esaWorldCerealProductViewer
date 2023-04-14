import PropTypes from 'prop-types';
import {Button} from '@gisatcz/ptr-atoms';
import helpers from '../../../../../helpers';

import './style.scss';

const Product = ({product, onProductClick}) => {
	return (
		<Button
			className="worldCereal-Product"
			small
			inverted
			onClick={() => onProductClick(product)}
			primary={product.active}
		>
			{helpers.getSeasonName(product.data.season)}
		</Button>
	);
};

Product.propTypes = {
	product: PropTypes.object,
	onProductClick: PropTypes.func,
};

export default Product;
