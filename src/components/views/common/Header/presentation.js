// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import Title from '../Title';
import AppConfigurationTool from './AppConfigurationTool';
import EsaLogo from '../../../atoms/EsaLogo';
import './style.scss';

const Header = () => {
	return (
		<div className="worldCereal-Header">
			<Title />
			<div className="worldCereal-Header-tools">
				<EsaLogo className="worldCereal-Header-esaLogo" />
				<AppConfigurationTool />
			</div>
		</div>
	);
};

Header.propTypes = {
	openOverlay: PropTypes.func,
	view: PropTypes.object,
};

export default Header;
