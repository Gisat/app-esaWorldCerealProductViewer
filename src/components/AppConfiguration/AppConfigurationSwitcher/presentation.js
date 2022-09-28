import PropTypes from 'prop-types';
import {Switcher} from '@gisatcz/visat-components';
import './style.scss';

const AppConfigurationSwitcher = ({
	active,
	disabled,
	name,
	icon,
	componentKey,
	onClick,
}) => {
	return (
		<Switcher
			className="visat-AppConfigurationSwitcher"
			active={active}
			name={name}
			icon={icon}
			disabled={disabled}
			onClick={componentKey ? () => onClick(!active) : null}
		/>
	);
};

AppConfigurationSwitcher.propTypes = {
	active: PropTypes.bool,
	componentKey: PropTypes.string,
	disabled: PropTypes.bool,
	icon: PropTypes.string,
	name: PropTypes.string,
	onClick: PropTypes.func,
};

export default AppConfigurationSwitcher;
