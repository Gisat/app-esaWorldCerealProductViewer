// eslint-disable-next-line no-unused-vars
import React from 'react';
import Header from '../Header';
import Maps from '../Maps';
import Filter from '../Filter';
import Timeline from '../Timeline';
import IntroOverlay from '../IntroOverlay';

import './style.scss';

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
