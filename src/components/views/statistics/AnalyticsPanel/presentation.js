// import PropTypes from 'prop-types';
import LevelSwitch from './LevelSwitch';
import './style.scss';

const AnalyticsPanel = () => {
	return (
		<div className="ptr-dark worldCereal-AnalyticsPanel">
			<div className="worldCereal-AnalyticsPanel-header">
				<LevelSwitch />
			</div>
		</div>
	);
};

AnalyticsPanel.propTypes = {};

export default AnalyticsPanel;
