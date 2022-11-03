// import PropTypes from 'prop-types';
import Title from '../../common/Title';
import EsaLogo from '../../../atoms/EsaLogo';
import ProductSelect from './ProductSelect';
import LevelSwitch from './LevelSwitch';
import PlaceSelect from './PlaceSelect';
import './style.scss';

const StatisticsConfigurationPanel = () => {
	return (
		<div className="worldCereal-StatisticsConfigurationPanel">
			<div className="worldCereal-StatisticsConfigurationPanel-header">
				<Title />
				<EsaLogo className="worldCereal-Header-esaLogo" />
			</div>
			<div className="worldCereal-StatisticsConfigurationPanel-configurations">
				<div>
					<ProductSelect />
					<ProductSelect />
					<LevelSwitch />
				</div>
				<div>
					<PlaceSelect />
				</div>
			</div>
		</div>
	);
};

StatisticsConfigurationPanel.propTypes = {};

export default StatisticsConfigurationPanel;
