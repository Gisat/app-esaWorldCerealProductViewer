import React from 'react';
import {ReactCompareSlider} from 'react-compare-slider';
import {connects} from '@gisatcz/ptr-state';
import {
	ReactLeafletMap,
	MapControls,
	MapSet,
	MapScale,
	PresentationMap,
} from '@gisatcz/ptr-maps';
import Header from '../Header';
import Filter from '../Filter';
import MapContainer from '../Maps/MapContainer';
import MapWrapper from '../Maps/MapWrapper';
import MapAttribution from '../Maps/MapAttribution';
import SimpleLayersControl from '../Maps/SimpleLayersControl';
import Timeline from '../Timeline';

const ConnectedMap = MapContainer(PresentationMap);
const ConnectedMapSet = connects.MapSet(MapSet);

const Map = MapContainer(PresentationMap);

import './style.scss';

const App = ({viewLimits, maps, mapCompareMode}) => {
	const allowComparison = maps?.length === 2 && mapCompareMode;

	return (
		<div className="worldCereal-ProductViewer">
			<Header />
			{allowComparison ? (
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
			)}
			<Filter />
			<Timeline />
		</div>
	);
};

export default App;
