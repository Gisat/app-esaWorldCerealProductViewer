// eslint-disable-next-line no-unused-vars
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import Header from '../Header';
import Maps from '../Maps';
import Filter from '../Filter';
import Timeline from '../Timeline';
import IntroOverlay from '../IntroOverlay';

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
					{/*<GlobalProducts/>*/}
				</>
			);
		case 'statistics':
			return (
				<>
					<Header />
					<Maps />
					{/*<Analytics/>*/}
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
