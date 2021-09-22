import React, {useEffect} from 'react';
import {connects} from '@gisatcz/ptr-state';
import {
	ReactLeafletMap,
	MapControls,
	MapSet,
	PresentationMap,
} from '@gisatcz/ptr-maps';
import Header from '../Header';
import MapContainer from '../MapContainer';
import MapWrapper from '../MapWrapper';
import RetractableWindow from '../atoms/RetractableWindow';
import SimpleLayersControl from '../SimpleLayersControl';
import Timeline from '../Timeline';
import ActiveFilterInfo from '../ActiveFilterInfo';
import PageSwitcher, {
	PageSwitcherContent,
	PageSwitcherMenu,
	PageSwitcherMenuItem,
	PageSwitcherPage,
} from '../atoms/PageSwitcher';

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
			<Header />
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
			<RetractableWindow
				className="worldCereal-FilterWindow ptr-dark"
				retracted
				bottomPosition={6}
				bodyHeight={14}
				controlBarContent={<ActiveFilterInfo />}
			>
				<PageSwitcher className="worldCereal-Filter">
					<PageSwitcherMenu>
						<PageSwitcherMenuItem pageKey="product">
							Product
						</PageSwitcherMenuItem>
						<PageSwitcherMenuItem pageKey="zone">Zone</PageSwitcherMenuItem>
						<PageSwitcherMenuItem pageKey="season" active>
							Season
						</PageSwitcherMenuItem>
						<PageSwitcherMenuItem pageKey="user" disabled>
							User
						</PageSwitcherMenuItem>
					</PageSwitcherMenu>
					<PageSwitcherContent>
						<PageSwitcherPage pageKey="product">Product page</PageSwitcherPage>
						<PageSwitcherPage pageKey="zone">Zone page</PageSwitcherPage>
						<PageSwitcherPage pageKey="season">Season page</PageSwitcherPage>
						<PageSwitcherPage pageKey="user">User page</PageSwitcherPage>
					</PageSwitcherContent>
				</PageSwitcher>
			</RetractableWindow>
			<Timeline />
			{/*<ControlPanel />*/}
		</div>
	);
};

export default App;
