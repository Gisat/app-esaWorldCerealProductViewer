// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import logoData from './logo';
import AppConfigurationTool from './AppConfigurationTool';
import EsaLogo from '../../../atoms/EsaLogo';
import './style.scss';

const getContent = view => {
	switch (view) {
		case 'statistics':
			// TODO replace with component
			return (
				<div
					style={{background: 'red', flex: 1, height: '100%', margin: '0 2rem'}}
				/>
			);
		default:
			return null;
	}
};

const Header = ({openOverlay, view}) => {
	const title = view?.data.nameDisplay;
	const viewName = view?.data.nameInternal;

	return (
		<div className="worldCereal-Header">
			<div className="worldCereal-Header-logo" onClick={openOverlay}>
				<div>
					<img src={`data:image/jpeg;base64,${logoData}`} />
				</div>
				<h1>
					<span>WorldCereal</span>
					<span>{title}</span>
				</h1>
			</div>
			{getContent(viewName)}
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
