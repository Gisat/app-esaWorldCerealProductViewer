import {useEffect} from 'react';
import propTypes from 'prop-types';

const GlobalProducts = ({onMount}) => {
	useEffect(() => {
		if (typeof onMount === 'function') {
			onMount();
		}
	});

	return <div className={'xxxx-global-products'}>global</div>;
};

GlobalProducts.propTypes = {
	onMount: propTypes.func,
};

export default GlobalProducts;
