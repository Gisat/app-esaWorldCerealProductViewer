import {useEffect} from 'react';
import PropTypes from 'prop-types';
import LegendColumn from './LegendColumn';
import YearColumn from './YearColumn';

import './style.scss';
import GlobalProductsColumn from './GlobalProductsColumn';
import GlobalProductsCell from './GlobalProductsCell';

const GlobalProducts = ({onMount, years, products, onProductClick}) => {
	useEffect(() => {
		if (typeof onMount === 'function') {
			onMount();
		}
	}, []);

	return (
		<div className={'worldCereal-GlobalProducts'}>
			<LegendColumn products={products} />
			{years.map(year => (
				<YearColumn
					key={year}
					year={year}
					products={products}
					onProductClick={onProductClick}
				/>
			))}

			{/* TODO solve better*/}
			<GlobalProductsColumn className="worldCereal-GlobalProductsColumn-placeholder">
				<GlobalProductsCell />
				<GlobalProductsCell />
				<GlobalProductsCell />
				<GlobalProductsCell />
				<GlobalProductsCell />
				<GlobalProductsCell />
			</GlobalProductsColumn>
		</div>
	);
};

GlobalProducts.propTypes = {
	onMount: PropTypes.func,
	years: PropTypes.array,
	products: PropTypes.array,
	onProductClick: PropTypes.func,
};

export default GlobalProducts;
