// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import {IconTool, Tooltip} from '@gisatcz/visat-components';
import {useTour} from '@reactour/tour';
import classNames from 'classnames';
import logoData from './logo';
import AppConfigurationTool from './AppConfigurationTool';
import EsaLogo from '../../../atoms/EsaLogo';
import StatisticsHeaderContent from '../../statistics/StatisticsHeaderContent';
import './style.scss';

const getContent = view => {
	switch (view) {
		case 'statistics':
			return <StatisticsHeaderContent />;
		default:
			return null;
	}
};

const Header = ({openOverlay, view, tourGuideIsOpen}) => {
	const {setIsOpen} = useTour();

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
				<IconTool
					className={classNames(
						'worldCereal-Header-tourIcon',
						{},
						tourGuideIsOpen ? 'is-active' : ''
					)}
					icon={'ri-help'}
					medium
					onClick={() => setIsOpen(true)}
					tooltip={{text: 'Tourguide', position: 'bottom', component: Tooltip}}
				/>
			</div>
		</div>
	);
};

Header.propTypes = {
	openOverlay: PropTypes.func,
	view: PropTypes.object,
	tourGuideIsOpen: PropTypes.bool,
};

export default Header;
