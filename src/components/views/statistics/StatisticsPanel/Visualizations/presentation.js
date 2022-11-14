import PropTypes from 'prop-types';
import ChartWrapper from '../../../../common/ChartWrapper';
import GlobalChart from './charts/GlobalChart';
import './style.scss';

const getComponent = component => {
	switch (component) {
		case 'GlobalTopTenBarChart':
		case 'GlobalTopTenBarChartShare':
		case 'GlobalSharePieChart':
		case 'GlobalCountriesBarChart':
			return <GlobalChart key={component} componentKey={component} />;
		default:
			return <ChartWrapper key={component} componentKey={component} />;
	}
};

const Visualizations = ({componentSet}) => {
	return (
		<div className="worldCereal-Visualizations ptr-dark">
			{componentSet?.components?.map(component => getComponent(component))}
		</div>
	);
};

Visualizations.propTypes = {
	componentSet: PropTypes.object,
};

export default Visualizations;
