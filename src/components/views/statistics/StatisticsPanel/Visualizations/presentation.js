import PropTypes from 'prop-types';
import ChartWrapper from '../../../../common/ChartWrapper';
import './style.scss';

const Visualizations = ({componentSet}) => {
	return (
		<div className="worldCereal-Visualizations ptr-dark">
			{componentSet?.components?.map(component => (
				<ChartWrapper key={component} componentKey={component} />
			))}
			{componentSet?.components?.map(component => (
				<ChartWrapper key={component} componentKey={component} />
			))}
		</div>
	);
};

Visualizations.propTypes = {
	componentSet: PropTypes.object,
};

export default Visualizations;
