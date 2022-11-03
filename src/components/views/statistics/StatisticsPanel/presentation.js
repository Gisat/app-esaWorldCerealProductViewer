// import PropTypes from 'prop-types';
import Title from '../../common/Title';
import EsaLogo from '../../../atoms/EsaLogo';
import ProductSelect from './ProductSelect';
import LevelSwitch from './LevelSwitch';
import PlaceSelect from './PlaceSelect';
import './style.scss';

const StatisticsPanel = () => {
	return (
		<div className="worldCereal-StatisticsPanel">
			<div className="worldCereal-StatisticsPanel-header">
				<Title />
				<EsaLogo className="worldCereal-Header-esaLogo" />
			</div>
			<div className="worldCereal-StatisticsPanel-configurations">
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

StatisticsPanel.propTypes = {};

export default StatisticsPanel;
