import PropTypes from 'prop-types';
import ChartWrapper from '../../../../../../common/ChartWrapper';

const GlobalChart = ({onClick, ...props}) => {
	return <ChartWrapper onChartClick={onClick} {...props} />;
};

GlobalChart.propTypes = {
	onClick: PropTypes.func,
};

export default GlobalChart;
