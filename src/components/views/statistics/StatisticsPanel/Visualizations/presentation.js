import PropTypes from 'prop-types';
import './style.scss';

const Visualizations = ({components}) => {
	return (
		<div className="worldCereal-Visualizations ptr-dark">
			{components?.map(component => component?.name)}
		</div>
	);
};

Visualizations.propTypes = {
	components: PropTypes.array,
};

export default Visualizations;
