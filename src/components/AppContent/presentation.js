// eslint-disable-next-line no-unused-vars
import React from 'react';
import Header from '../Header';
import Maps from '../Maps';
import Filter from '../Filter';
import Timeline from '../Timeline';

import './style.scss';
import IntroOverlay from '../IntroOverlay';

const App = () => {
	return (
		<div className="worldCereal-ProductViewer">
			<IntroOverlay />
			<Header />
			<Maps />
			<Filter />
			<Timeline />
		</div>
	);
};

export default App;
