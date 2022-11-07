import PropTypes from 'prop-types';
import './style.scss';

const Visualizations = ({componentSet}) => {
	return (
		<div className="worldCereal-Visualizations ptr-dark">
			{componentSet?.components?.map(component => component)}
		</div>
	);
};

Visualizations.propTypes = {
	componentSet: PropTypes.object,
};

export default Visualizations;
