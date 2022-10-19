// eslint-disable-next-line no-unused-vars
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import Header from '../Header';
import Maps from '../Maps';
import Filter from '../Filter';
import Timeline from '../Timeline';
import IntroOverlay from '../IntroOverlay';

import './style.scss';

const App = ({activeView, open}) => {
	const view = activeView?.data?.nameInternal;
	const title = activeView?.data?.nameDisplay;

	return (
		<>
			<Helmet
				defaultTitle={`WorldCereal ${title && !open ? `| ${title}` : ''}`}
			/>
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
		</>
	);
};

App.propTypes = {
	activeView: PropTypes.object,
	open: PropTypes.bool,
};

export default App;
