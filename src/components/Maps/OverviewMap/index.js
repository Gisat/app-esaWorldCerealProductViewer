import PropTypes from 'prop-types';
import {PresentationMap, ReactLeafletMap} from '@gisatcz/ptr-maps';
import ComponentRenderer from '../ComponentRenderer';
import MapContainer from '../MapContainer';

import './style.scss';

const Map = MapContainer(PresentationMap);

const OverviewMap = ({overviewMapKey}) => {
	return (
		<ComponentRenderer
			component={'overviewMap'}
			configurationGroupKey={'mapSetTools'}
		>
			<div className={'ptr-OverviewMap'}>
				<Map mapComponent={ReactLeafletMap} stateMapKey={overviewMapKey} />
			</div>
		</ComponentRenderer>
	);
};

OverviewMap.propTypes = {
	overviewMapKey: PropTypes.string,
};

export default OverviewMap;
