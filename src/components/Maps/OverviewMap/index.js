import PropTypes from 'prop-types';
import {PresentationMap, DeckGlMap} from '@gisatcz/ptr-maps';
import {connects} from '@gisatcz/ptr-state';
import ComponentRenderer from '../ComponentRenderer';

import './style.scss';

const Map = connects.Map(PresentationMap);

const OverviewMap = ({overviewMapKey}) => {
	return (
		<ComponentRenderer
			component={'overviewMap'}
			configurationGroupKey={'mapSetTools'}
		>
			<div className={'ptr-OverviewMap'}>
				<Map mapComponent={DeckGlMap} stateMapKey={overviewMapKey} />
			</div>
		</ComponentRenderer>
	);
};

OverviewMap.propTypes = {
	overviewMapKey: PropTypes.string,
};

export default OverviewMap;
