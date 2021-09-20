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
				retracted
				bottomPosition={6}
				bodyHeight={12}
				controlBarContent={
					<div>
						Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui.
						Aliquam in lorem sit amet leo accumsan lacinia. Nullam sit amet
						magna in magna gravida vehicula. Etiam posuere lacus quis dolor. Nam
						sed tellus id magna elementum tincidunt. Integer vulputate sem a
						nibh rutrum consequat.
					</div>
				}
			>
				<p>
					Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui.
					Aliquam in lorem sit amet leo accumsan lacinia. Nullam sit amet magna
					in magna gravida vehicula. Etiam posuere lacus quis dolor. Nam sed
					tellus id magna elementum tincidunt. Integer vulputate sem a nibh
					rutrum consequat. Donec iaculis gravida nulla. Nulla accumsan, elit
					sit amet varius semper, nulla mauris mollis quam, tempor suscipit diam
					nulla vel leo. In rutrum. Donec ipsum massa, ullamcorper in, auctor
					et, scelerisque sed, est. Nullam justo enim, consectetuer nec,
					ullamcorper ac, vestibulum in, elit. Donec quis nibh at felis congue
					commodo.
				</p>
				<p>
					Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui.
					Aliquam in lorem sit amet leo accumsan lacinia. Nullam sit amet magna
					in magna gravida vehicula. Etiam posuere lacus quis dolor. Nam sed
					tellus id magna elementum tincidunt. Integer vulputate sem a nibh
					rutrum consequat. Donec iaculis gravida nulla. Nulla accumsan, elit
					sit amet varius semper, nulla mauris mollis quam, tempor suscipit diam
					nulla vel leo. In rutrum. Donec ipsum massa, ullamcorper in, auctor
					et, scelerisque sed, est. Nullam justo enim, consectetuer nec,
					ullamcorper ac, vestibulum in, elit. Donec quis nibh at felis congue
					commodo.
				</p>
			</RetractableWindow>
			<Timeline />
			{/*<ControlPanel />*/}
		</div>
	);
};

export default App;
