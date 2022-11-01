// eslint-disable-next-line no-unused-vars
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import {AdjustableColumns} from '@gisatcz/ptr-atoms';
import Maps from '../Maps';
import IntroOverlay from '../IntroOverlay';
import Header from '../views/common/Header';
import Filter from '../views/detailedExploarion/Filter';
import Timeline from '../views/detailedExploarion/Timeline';
import AnalyticsPanel from '../views/statistics/AnalyticsPanel';
import GlobalProducts from '../views/global/GlobalProducts';

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
				<>
					<Header />
					<AdjustableColumns
						fixed
						content={[
							{
								width: '35%',
								minWidth: '25rem',
								maxWidth: '35rem',
								className: 'worldCereal-statistics-analytics-column',
								component: AnalyticsPanel,
							},
							{
								component: Maps,
								className: 'worldCereal-statistics-map-column',
							},
						]}
					/>
				</>
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
