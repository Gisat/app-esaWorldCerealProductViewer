import React from 'react';
import PropTypes from 'prop-types';
import {ReactCompareSlider} from 'react-compare-slider';
import {connects} from '@gisatcz/ptr-state';
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
import MapWrapper from './MapWrapper';

const ConnectedMap = MapContainer(PresentationMap);
const ConnectedMapSet = connects.MapSet(MapSet);

const Map = MapContainer(PresentationMap);

const Maps = ({compareMode, maps, viewLimits}) => {
	const allowComparison = maps?.length === 2 && compareMode;

	return allowComparison ? (
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
	compareMode: PropTypes.bool,
	maps: PropTypes.array,
	viewLimits: PropTypes.object,
};

export default Maps;
