import React, {useEffect} from 'react';
import {connects} from '@gisatcz/ptr-state';
import {
	ReactLeafletMap,
	MapControls,
	MapSet,
	MapScale,
	PresentationMap,
} from '@gisatcz/ptr-maps';
import Header from '../Header';
import MapContainer from '../MapContainer';
import MapWrapper from '../MapWrapper';
import MapAttribution from '../MapAttribution';
import RetractableWindow from '../atoms/RetractableWindow';
import SimpleLayersControl from '../SimpleLayersControl';
import Timeline from '../Timeline';
import ActiveFilterInfo from '../ActiveFilterInfo';
import ProductFilter from '../ProductFilter';

const ConnectedMap = MapContainer(PresentationMap);
const ConnectedMapSet = connects.MapSet(MapSet);

const Map = MapContainer(PresentationMap);

import './style.scss';
import {ReactCompareSlider} from 'react-compare-slider';

const App = ({onMount, onUnmount, viewLimits, maps, mapCompareMode}) => {
	const allowComparison = maps?.length === 2 && mapCompareMode;

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
			<RetractableWindow
				className="worldCereal-FilterWindow ptr-dark"
				retracted
				centered
				bottomPosition={10}
				bodyHeight={14}
				controlBarContent={<ActiveFilterInfo />}
			>
				<ProductFilter />
			</RetractableWindow>
			<Timeline />
			{/*<ControlPanel />*/}
		</div>
	);
};

export default App;
