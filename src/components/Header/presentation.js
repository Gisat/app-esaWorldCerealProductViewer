// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import logoData from './logo';
import AppConfigurationTool from './AppConfigurationTool';
import './style.scss';

const Header = ({openOverlay}) => {
	return (
		<div className="worldCereal-Header">
			<div className="worldCereal-Header-logo" onClick={openOverlay}>
				<div>
					<img src={`data:image/jpeg;base64,${logoData}`} />
				</div>
				<h1>
					<span>World Cereal</span>
					<span>Detailed exploration</span>
				</h1>
			</div>
			<div className="worldCereal-Header-tools">
				<AppConfigurationTool />
			</div>
		</div>
	);
};

Header.propTypes = {
	openOverlay: PropTypes.func,
};

export default Header;
