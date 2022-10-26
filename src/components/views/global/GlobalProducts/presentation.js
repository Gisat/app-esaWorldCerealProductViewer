import {useEffect} from 'react';
import propTypes from 'prop-types';
import {Button} from '@gisatcz/ptr-atoms';
import './style.scss';

const getShortSeason = season => {
	switch (season) {
		case 'summer1':
			return 'S1';
		case 'summer2':
			return 'S2';
		case 'winter':
			return 'W';
		case 'annual':
			return 'A';
	}
};

const LegendColumn = ({products}) => {
	return (
		<div>
			<div className={'worldCereal-GlobalProducts-header'}></div>
			{products.map(p => (
				<div key={p.product}>{p.nameDisplay}</div>
			))}
		</div>
	);
};

LegendColumn.propTypes = {
	products: propTypes.array,
};

const Product = ({product, onProductClick}) => {
	return (
		<Button
			className={'worldCereal-GlobalProducts-cell'}
			ghost
			small
			onClick={() => onProductClick(product)}
			primary={product.active}
		>
			{getShortSeason(product.data.season)}
		</Button>
	);
};

Product.propTypes = {
	product: propTypes.object,
	onProductClick: propTypes.func,
};

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
		<div>
			<div className={'worldCereal-GlobalProducts-header'}>{year}</div>
			{products.map(product => {
				return (
					<div key={`${product.product}_${year}`}>
						{product.products?.[year] ? (
							product.products?.[year]
								.sort(sortByEos)
								.map(p => (
									<Product
										key={p.key}
										product={p}
										onProductClick={onProductClick}
									/>
								))
						) : (
							<div className={'worldCereal-GlobalProducts-cell'}></div>
						)}
					</div>
				);
			})}
		</div>
	);
};

YearColumn.propTypes = {
	products: propTypes.array,
	year: propTypes.string,
	onProductClick: propTypes.func,
};

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
		</div>
	);
};

GlobalProducts.propTypes = {
	onMount: propTypes.func,
	years: propTypes.array,
	products: propTypes.array,
	onProductClick: propTypes.func,
};

export default GlobalProducts;
