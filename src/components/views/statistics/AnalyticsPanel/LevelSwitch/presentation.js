// import PropTypes from 'prop-types';
import {ButtonSwitch, ButtonSwitchOption} from '@gisatcz/ptr-atoms';
import './style.scss';

const LevelSwitch = () => {
	return (
		<ButtonSwitch
			className="worldCereal-LevelSwitch worldCereal-ButtonSwitch"
			onClick={() => {}}
		>
			<ButtonSwitchOption key="1" value="global" active>
				Global level
			</ButtonSwitchOption>
			<ButtonSwitchOption key="2" value="country">
				Country level
			</ButtonSwitchOption>
		</ButtonSwitch>
	);
};

LevelSwitch.propTypes = {};

export default LevelSwitch;
