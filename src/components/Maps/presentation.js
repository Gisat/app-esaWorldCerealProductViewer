// eslint-disable-next-line no-unused-vars
import React from 'react';
import {Children, cloneElement} from 'react';
import PropTypes from 'prop-types';
import {ReactCompareSlider} from 'react-compare-slider';
import {MapSet, PresentationMap, ReactLeafletMap} from '@gisatcz/ptr-maps';
import MapAttribution from './MapAttribution';
import MapContainer from './MapContainer';
import MapSetContainer from './MapSetContainer';
import MapWrapper from './MapWrapper';

import ZoomControls from './ZoomControls';
import MapComponentsGroup from './MapComponentsGroup';
import BackgroundLayersControl from './BackgroundLayersControl';
import Scale from './Scale';
import OverviewMap from './OverviewMap';
import CompareMapsControl from './CompareMapsControl';
import AddMapControl from './AddMapControl';

import {mapSetKey, MAX_MAPS_IN_MAP_SET} from '../../constants/app';

import './style.scss';

const ConnectedMap = MapContainer(PresentationMap);
const ConnectedMapSet = MapSetContainer(MapSet);

const Map = MapContainer(PresentationMap);

const PropsDriller = ({children, className, ...restProps}) => {
	return (
		<div className={className}>
			{Children.map(children, child => {
				return child ? cloneElement(child, {...restProps}) : null;
			})}
		</div>
	);
};

PropsDriller.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
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
				/>
			}
			itemTwo={
				<Map
					wrapper={MapWrapper}
					wrapperProps={{labelsRight: true, noTools: true}}
					mapComponent={ReactLeafletMap}
					stateMapKey={maps[1].key}
				>
					<MapComponentsGroup className="worldCereal-MapInfoElements">
						<OverviewMap overviewMapKey="overview" />
						<MapComponentsGroup className="worldCereal-AttributionScaleContainer">
							<MapAttribution mapSetKey={mapSetKey} />
							<Scale />
						</MapComponentsGroup>
					</MapComponentsGroup>
					<MapComponentsGroup className="worldCereal-MapSetControls">
						<AddMapControl
							mapSetKey={mapSetKey}
							maxMapsCount={MAX_MAPS_IN_MAP_SET}
						/>
						<CompareMapsControl mapSetKey={mapSetKey} />
						<BackgroundLayersControl />
						<ZoomControls viewLimits={viewLimits} />
					</MapComponentsGroup>
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
			<MapComponentsGroup className="worldCereal-MapSetControls">
				<AddMapControl
					mapSetKey={mapSetKey}
					maxMapsCount={MAX_MAPS_IN_MAP_SET}
				/>
				<CompareMapsControl mapSetKey={mapSetKey} />
				<BackgroundLayersControl />
				<ZoomControls viewLimits={viewLimits} />
			</MapComponentsGroup>
			<MapComponentsGroup className="worldCereal-MapInfoElements">
				<OverviewMap overviewMapKey="overview" />
				<MapComponentsGroup className="worldCereal-AttributionScaleContainer">
					<MapAttribution mapSetKey={mapSetKey} />
					<Scale />
				</MapComponentsGroup>
			</MapComponentsGroup>
		</ConnectedMapSet>
	);
};

Maps.propTypes = {
	mode: PropTypes.string,
	maps: PropTypes.array,
	viewLimits: PropTypes.object,
};

export default Maps;
