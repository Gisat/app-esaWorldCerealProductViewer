// import PropTypes from 'prop-types';
import './style.scss';
import ProductSelect from './ProductSelect';

const StatisticsHeaderContent = () => {
	return (
		<div className="worldCereal-StatisticsHeaderContent">
			<ProductSelect />
			<ProductSelect />
		</div>
	);
};

StatisticsHeaderContent.propTypes = {};

export default StatisticsHeaderContent;
