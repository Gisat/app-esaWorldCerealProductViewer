import React, {useEffect} from 'react';
import {connects} from '@gisatcz/ptr-state';
import {ReactLeafletMap, MapSet, PresentationMap} from '@gisatcz/ptr-maps';
import MapContainer from '../MapContainer';

const ConnectedMap = MapContainer(PresentationMap);
const ConnectedMapSet = connects.MapSet(MapSet);

import './style.scss';

const App = ({onMount, onUnmount}) => {
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
			<ConnectedMapSet
				stateMapSetKey="productViewer-set"
				mapComponent={ReactLeafletMap}
				connectedMapComponent={ConnectedMap}
			></ConnectedMapSet>
			<div className="worldCereal-ControlPanel"></div>
		</div>
	);
};

export default App;
