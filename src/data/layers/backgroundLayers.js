import React from 'react';

export default {
	topomap: {
		key: 'topomap',
		name: 'ESRI Topomap',
		type: 'wmts',
		options: {
			url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
			maxNativeZoom: 16,
		},
		attribution: <>Esri, USGS | Esri, HERE, Garmin, FAO, NOAA, USGS</>,
		theme: 'light',
	},
	imagery: {
		key: 'imagery',
		name: 'ESRI Imagery',
		type: 'wmts',
		options: {
			url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
			maxNativeZoom: 17,
		},
		attribution: (
			<>Esri, USGS | Esri, Garmin, FAO, NOAA | Earthstar Geographics</>
		),
		theme: 'dark',
	},
	greyCanvas: {
		key: 'greyCanvas',
		name: 'ESRI Grey Canvas',
		type: 'wmts',
		options: {
			url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
			maxNativeZoom: 16,
		},
		attribution: <>Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ</>,
		theme: 'light',
	},
	osm: {
		key: 'osm',
		name: 'OpenStreetMap',
		type: 'wmts',
		options: {
			url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
		},
		attribution: (
			<>
				©{' '}
				<a
					href="https://www.openstreetmap.org/copyright"
					target="_blank"
					rel="noreferrer noopener"
				>
					OpenStreetMap
				</a>{' '}
				contributors
			</>
		),
		theme: 'light',
	},
	cartoDark: {
		key: 'cartoDark',
		name: 'CartoDB - dark',
		type: 'wmts',
		options: {
			url: 'https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png',
		},
		attribution: (
			<>
				&copy;{' '}
				<a
					href="https://www.openstreetmap.org/copyright"
					target="_blank"
					rel="noreferrer noopener"
				>
					OpenStreetMap
				</a>{' '}
				contributors,{' '}
				<a
					href="https://creativecommons.org/licenses/by-sa/2.0/"
					target="_blank"
					rel="noreferrer noopener"
				>
					CC-BY-SA
				</a>
			</>
		),
		theme: 'dark',
	},
	cartoGrey: {
		key: 'cartoGrey',
		name: 'CartoDB - grey',
		type: 'wmts',
		options: {
			url: 'https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png',
		},
		attribution: (
			<>
				&copy;{' '}
				<a
					href="https://www.openstreetmap.org/copyright"
					target="_blank"
					rel="noreferrer noopener"
				>
					OpenStreetMap
				</a>{' '}
				contributors,{' '}
				<a
					href="https://creativecommons.org/licenses/by-sa/2.0/"
					target="_blank"
					rel="noreferrer noopener"
				>
					CC-BY-SA
				</a>
			</>
		),
		theme: 'light',
	},
};
