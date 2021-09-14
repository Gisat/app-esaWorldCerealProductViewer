import React, {useEffect} from 'react';
import {connects} from '@gisatcz/ptr-state';
import {
	ReactLeafletMap,
	MapControls,
	MapSet,
	PresentationMap,
} from '@gisatcz/ptr-maps';
import MapContainer from '../MapContainer';
import MapWrapper from '../MapWrapper';
import ControlPanel from '../ControlPanel';
import SimpleLayersControl from '../SimpleLayersControl';
import Timeline from '../Timeline';

const ConnectedMap = MapContainer(PresentationMap);
const ConnectedMapSet = connects.MapSet(MapSet);

import './style.scss';

const App = ({onMount, onUnmount, viewLimits}) => {
	useEffect(() => {
		if (typeof onMount === 'function') {
			onMount();
		}
		if (typeof onUnmount === 'function') {
			return onUnmount();
		}
	}, []);

	return (
		<div className="worldCereal-ProductViewer">
			<div className="worldCereal-MapSetContainer">
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
				</ConnectedMapSet>
				<Timeline />
			</div>
			<ControlPanel />
		</div>
	);
};

export default App;
