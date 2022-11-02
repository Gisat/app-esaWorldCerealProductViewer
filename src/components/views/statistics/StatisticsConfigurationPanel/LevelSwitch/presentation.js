// import PropTypes from 'prop-types';
import {ButtonSwitch, ButtonSwitchOption} from '@gisatcz/ptr-atoms';
import StatisticsConfigurationItem from '../StatisticsConfigurationItem';
import './style.scss';

const LevelSwitch = () => {
	return (
		<StatisticsConfigurationItem label="Level">
			<ButtonSwitch
				className="ptr-dark worldCereal-LevelSwitch worldCereal-ButtonSwitch"
				onClick={() => {}}
			>
				<ButtonSwitchOption key="1" value="global" active>
					Global
				</ButtonSwitchOption>
				<ButtonSwitchOption key="2" value="country" disabled>
					Country
				</ButtonSwitchOption>
			</ButtonSwitch>
		</StatisticsConfigurationItem>
	);
};

LevelSwitch.propTypes = {};

export default LevelSwitch;
