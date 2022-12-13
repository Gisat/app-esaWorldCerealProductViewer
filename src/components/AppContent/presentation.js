// eslint-disable-next-line no-unused-vars

import PropTypes from 'prop-types';
import ExplorationPage from '../../pages/Exploration';
import HomePage from '../../pages/Home';
import GlobalView from '../../pages/GlobalView';
import Statistics from '../../pages/Statistics';

import './style.scss';

const getContent = () => {
	switch (window.location.pathname) {
		case '/detailedExploration':
			return <ExplorationPage />;

		case '/globalView':
			return <GlobalView />;

		case '/statistics':
			return <Statistics />;

		case '/':
			return <HomePage />;

		default:
			return null;
	}
};

const App = () => {
	return <div className="worldCereal-ProductViewer">{getContent()}</div>;
};

App.propTypes = {
	activeView: PropTypes.object,
	open: PropTypes.bool,
};

export default App;
