// import PropTypes from 'prop-types';
import {ButtonSwitch, ButtonSwitchOption} from '@gisatcz/ptr-atoms';
import './style.scss';
import StatisticsConfigurationItem from '../StatisticsConfigurationItem';

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
				<ButtonSwitchOption key="2" value="country">
					Country
				</ButtonSwitchOption>
			</ButtonSwitch>
		</StatisticsConfigurationItem>
	);
};

LevelSwitch.propTypes = {};

export default LevelSwitch;
