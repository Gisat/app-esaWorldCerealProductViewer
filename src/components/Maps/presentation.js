import React from 'react';
import PropTypes from 'prop-types';
import {ReactCompareSlider} from 'react-compare-slider';
import {
	MapControls,
	MapScale,
	MapSet,
	PresentationMap,
	ReactLeafletMap,
} from '@gisatcz/ptr-maps';
import MapAttribution from './MapAttribution';
import SimpleLayersControl from './SimpleLayersControl';
import MapContainer from './MapContainer';
import MapSetContainer from './MapSetContainer';
import MapWrapper from './MapWrapper';

import './style.scss';

const ConnectedMap = MapContainer(PresentationMap);
const ConnectedMapSet = MapSetContainer(MapSet);

const Map = MapContainer(PresentationMap);

const Maps = ({mode, maps, viewLimits}) => {
	return mode === 'compare' ? (
		<ReactCompareSlider
			onlyHandleDraggable
			className="worldCereal-CompareSlider"
			itemOne={
				<Map
					wrapper={MapWrapper}
					wrapperProps={{noTools: true}}
					mapComponent={ReactLeafletMap}
					stateMapKey={maps[0].key}
				>
					<MapScale className="worldCereal-MapScale" />
					<MapAttribution />
				</Map>
			}
			itemTwo={
				<Map
					wrapper={MapWrapper}
					wrapperProps={{labelsRight: true, noTools: true}}
					mapComponent={ReactLeafletMap}
					stateMapKey={maps[1].key}
				>
					<SimpleLayersControl />
					<MapControls
						levelsBased
						zoomOnly
						viewLimits={viewLimits} //hack for synced maps, viewLimits are not implemented for mapSet yet
					/>
				</Map>
			}
		/>
	) : (
		<ConnectedMapSet
			stateMapSetKey="productViewer-mapSet"
			mapComponent={ReactLeafletMap}
			connectedMapComponent={ConnectedMap}
			wrapper={MapWrapper}
		>
			<SimpleLayersControl />
			<MapControls
				levelsBased
				zoomOnly
				viewLimits={viewLimits} //hack for synced maps, viewLimits are not implemented for mapSet yet
			/>
			<MapScale className="worldCereal-MapScale" />
			<MapAttribution />
		</ConnectedMapSet>
	);
};

Maps.propTypes = {
	mode: PropTypes.string,
	maps: PropTypes.array,
	viewLimits: PropTypes.object,
};

export default Maps;
