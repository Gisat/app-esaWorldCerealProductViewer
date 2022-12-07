// eslint-disable-next-line no-unused-vars
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import Maps from '../Maps';
import IntroOverlay from '../IntroOverlay';
import Header from '../views/common/Header';
import Filter from '../views/detailedExploarion/Filter';
import Timeline from '../views/detailedExploarion/Timeline';
import GlobalProducts from '../views/global/GlobalProducts';
import StatisticsPanel from '../views/statistics/StatisticsPanel';
import {screens} from '../../constants/app';

import './style.scss';

const getContent = view => {
	switch (view) {
		case screens['home']:
			return <IntroOverlay />;

		case screens['exploration']:
			return (
				<>
					<Header />
					<Maps />
					<Filter />
					<Timeline />
				</>
			);
		case screens['globalView']:
			return (
				<>
					<Header />
					<Maps />
					<GlobalProducts />
				</>
			);
		case screens['statistics']:
			return (
				<div className="worldCereal-statistics">
					<StatisticsPanel />
					<Maps />
				</div>
			);
		default:
			return null;
	}
};

const App = ({activeScreen, open}) => {
	// const view = activeView?.data?.nameInternal;
	// const title = activeView?.data?.nameDisplay;
	const title = 'TODO';

	return (
		<>
			<Helmet
				defaultTitle={`WorldCereal ${title && !open ? `| ${title}` : ''}`}
			/>
			<div className="worldCereal-ProductViewer">
				{getContent(activeScreen)}
			</div>
		</>
	);
};

App.propTypes = {
	activeScreen: PropTypes.object,
	open: PropTypes.bool,
};

export default App;
