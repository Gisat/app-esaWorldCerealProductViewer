// import PropTypes from 'prop-types';
import Title from '../../common/Title';
import EsaLogo from '../../../atoms/EsaLogo';
import ProductSelect from './ProductSelect';
import LevelSwitch from './LevelSwitch';
import './style.scss';

const StatisticsConfigurationPanel = () => {
	return (
		<div className="worldCereal-StatisticsConfigurationPanel">
			<div className="worldCereal-StatisticsConfigurationPanel-header">
				<Title />
			</div>
			<div className="worldCereal-StatisticsConfigurationPanel-body">
				<ProductSelect />
				<ProductSelect />
				<LevelSwitch />
			</div>
			<div className="worldCereal-StatisticsConfigurationPanel-footer">
				<EsaLogo className="worldCereal-Header-esaLogo" />
			</div>
		</div>
	);
};

StatisticsConfigurationPanel.propTypes = {};

export default StatisticsConfigurationPanel;
