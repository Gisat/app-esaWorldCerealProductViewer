import classnames from 'classnames';
import {Icon} from '@gisatcz/visat-components';
import AppConfigurationSection from './AppConfigurationSection';
import AppComponentsConfiguration from './AppComponentsConfiguration';
import {mapSetKey} from '../../constants/app';
import './style.scss';

const AppConfiguration = () => {
	const classes = classnames('worldCereal-AppConfiguration', {});

	return (
		<div className={classes}>
			<div className="worldCereal-AppConfiguration-title">
				<Icon icon="ri-tune" />
				<h2>Configuration</h2>
			</div>
			<div className="worldCereal-AppConfiguration-body">
				<AppConfigurationSection title="Map tools">
					<AppComponentsConfiguration
						configurationGroupKey={'mapSetTools'}
						configurationPath={mapSetKey}
					/>
				</AppConfigurationSection>
			</div>
		</div>
	);
};

AppConfiguration.propTypes = {};

export default AppConfiguration;
