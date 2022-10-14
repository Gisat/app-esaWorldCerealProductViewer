// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import Header from '../Header';
import Maps from '../Maps';
import Filter from '../Filter';
import Timeline from '../Timeline';
import IntroOverlay from '../IntroOverlay';

import './style.scss';

const App = ({activeView}) => {
	const view = activeView?.data?.nameInternal;

	return (
		<div className="worldCereal-ProductViewer">
			<IntroOverlay />
			<Header />
			<Maps />
			{view === 'detailedExploration' ? (
				<>
					<Filter />
					<Timeline />
				</>
			) : null}
		</div>
	);
};

App.propTypes = {
	activeView: PropTypes.object,
};

export default App;
