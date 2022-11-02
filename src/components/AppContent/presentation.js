// eslint-disable-next-line no-unused-vars
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import Maps from '../Maps';
import IntroOverlay from '../IntroOverlay';
import Header from '../views/common/Header';
import Filter from '../views/detailedExploarion/Filter';
import Timeline from '../views/detailedExploarion/Timeline';
import GlobalProducts from '../views/global/GlobalProducts';
import StatisticsConfigurationPanel from '../views/statistics/StatisticsConfigurationPanel';

import './style.scss';

const getContent = view => {
	switch (view) {
		case 'detailedExploration':
			return (
				<>
					<Header />
					<Maps />
					<Filter />
					<Timeline />
				</>
			);
		case 'globalView':
			return (
				<>
					<Header />
					<Maps />
					<GlobalProducts />
				</>
			);
		case 'statistics':
			return (
				<div style={{display: 'flex', height: '100%'}}>
					<StatisticsConfigurationPanel />
					<Maps />
				</div>
			);
		default:
			return null;
	}
};

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
				{getContent(view)}
			</div>
		</>
	);
};

App.propTypes = {
	activeView: PropTypes.object,
	open: PropTypes.bool,
};

export default App;
