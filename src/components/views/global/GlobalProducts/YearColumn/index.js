import PropTypes from 'prop-types';
import GlobalProductsCell from '../GlobalProductsCell';
import GlobalProductsColumn from '../GlobalProductsColumn';
import Product from '../Product';

import './style.scss';

//sort products by end of season
const sortByEos = (a, b) => {
	const nameA = a.data.eos;
	const nameB = b.data.eos;
	if (nameA < nameB) {
		return -1;
	}
	if (nameA > nameB) {
		return 1;
	}

	// names must be equal
	return 0;
};

const YearColumn = ({year, products, onProductClick}) => {
	return (
		<GlobalProductsColumn className="worldCereal-YearColumn">
			<GlobalProductsCell className="worldCereal-YearHeader">
				{year}
			</GlobalProductsCell>
			{products.map(product => {
				return (
					<GlobalProductsCell
						className="worldCereal-YearCell"
						key={`${product.product}_${year}`}
					>
						{product.products?.[year]
							? product.products?.[year]
									.sort(sortByEos)
									.map(p => (
										<Product
											key={p.key}
											product={p}
											onProductClick={onProductClick}
										/>
									))
							: null}
					</GlobalProductsCell>
				);
			})}
		</GlobalProductsColumn>
	);
};

YearColumn.propTypes = {
	products: PropTypes.array,
	year: PropTypes.string,
	onProductClick: PropTypes.func,
};

export default YearColumn;
