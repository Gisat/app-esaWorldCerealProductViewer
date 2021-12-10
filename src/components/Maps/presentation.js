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

const PropsDriller = props => {
	const {children, className, ...restProps} = props;
	return (
		<div className={className}>
			{React.Children.map(children, child => {
				return child ? React.cloneElement(child, {...restProps}) : null;
			})}
		</div>
	);
};

const Maps = ({attribution, mode, maps, overviewMap, scale, viewLimits}) => {
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
					<PropsDriller className="worldCereal-MapInfoElements">
						{overviewMap ? (
							<PropsDriller className="worldCereal-OverviewMap">
								<Map mapComponent={ReactLeafletMap} stateMapKey="overview" />
							</PropsDriller>
						) : null}
						{attribution || scale ? (
							<PropsDriller className="worldCereal-AttributionScaleContainer">
								{attribution ? <MapAttribution /> : null}
								{scale ? <MapScale className="worldCereal-MapScale" /> : null}
							</PropsDriller>
						) : null}
					</PropsDriller>
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
			<PropsDriller className="worldCereal-MapInfoElements">
				{overviewMap ? (
					<PropsDriller className="worldCereal-OverviewMap">
						<Map mapComponent={ReactLeafletMap} stateMapKey="overview" />
					</PropsDriller>
				) : null}
				{attribution || scale ? (
					<PropsDriller className="worldCereal-AttributionScaleContainer">
						{attribution ? <MapAttribution /> : null}
						{scale ? <MapScale className="worldCereal-MapScale" /> : null}
					</PropsDriller>
				) : null}
			</PropsDriller>
		</ConnectedMapSet>
	);
};

Maps.propTypes = {
	attribution: PropTypes.bool,
	mode: PropTypes.string,
	maps: PropTypes.array,
	overviewMap: PropTypes.bool,
	scale: PropTypes.bool,
	viewLimits: PropTypes.object,
};

export default Maps;
