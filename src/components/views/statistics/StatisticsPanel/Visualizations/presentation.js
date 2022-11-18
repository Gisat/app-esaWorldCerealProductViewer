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

const Visualizations = ({componentSet, noDataForCurrentSettings}) => {
	return (
		<div className="worldCereal-Visualizations ptr-dark">
			{noDataForCurrentSettings ? (
				<div className="worldCereal-Visualizations-noDataInfo">
					No data for selected period! Please choose another one.
				</div>
			) : (
				componentSet?.components?.map(component => getComponent(component))
			)}
		</div>
	);
};

Visualizations.propTypes = {
	componentSet: PropTypes.object,
	noDataForCurrentSettings: PropTypes.bool,
};

export default Visualizations;
