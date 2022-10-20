// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import logoData from './logo';
import AppConfigurationTool from './AppConfigurationTool';
import './style.scss';
import EsaLogo from '../atoms/EsaLogo';

const Header = ({openOverlay, viewName}) => {
	return (
		<div className="worldCereal-Header">
			<div className="worldCereal-Header-logo" onClick={openOverlay}>
				<div>
					<img src={`data:image/jpeg;base64,${logoData}`} />
				</div>
				<h1>
					<span>WorldCereal</span>
					<span>{viewName}</span>
				</h1>
			</div>
			<div className="worldCereal-Header-tools">
				<EsaLogo className="worldCereal-Header-esaLogo" />
				<AppConfigurationTool />
			</div>
		</div>
	);
};

Header.propTypes = {
	openOverlay: PropTypes.func,
	viewName: PropTypes.string,
};

export default Header;
