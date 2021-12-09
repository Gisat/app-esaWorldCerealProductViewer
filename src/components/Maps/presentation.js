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

import './style.scss';

const ConnectedMap = MapContainer(PresentationMap);
const ConnectedMapSet = connects.MapSet(MapSet);

const Map = MapContainer(PresentationMap);

const MapInfoElements = props => {
	const {children, ...restProps} = props;
	return (
		<div className={`worldWater-MapInfoElements`}>
			{React.Children.map(children, child => {
				return React.cloneElement(child, {...restProps});
			})}
		</div>
	);
};

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
					<MapInfoElements>
						<MapAttribution />
						<MapScale className="worldCereal-MapScale" />
					</MapInfoElements>
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
			<MapInfoElements>
				<MapAttribution />
				<MapScale className="worldCereal-MapScale" />
			</MapInfoElements>
		</ConnectedMapSet>
	);
};

Maps.propTypes = {
	mode: PropTypes.string,
	maps: PropTypes.array,
	viewLimits: PropTypes.object,
};

export default Maps;
