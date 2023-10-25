import {connect} from '@gisatcz/ptr-state';
import {useEffect} from 'react';
import Action from '../state/Action';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import Maps from '../components/Maps';
import Header from '../components/views/common/Header';
import StatisticsPanel from '../components/views/statistics/StatisticsPanel';

const viewKey = '95ad1c41-9027-4546-9fd4-f7210cdbf493';
const title = 'Statistics';

const StatisticsPage = ({onViewSelect}) => {
	useEffect(() => {
		onViewSelect(viewKey);
	}, []);

	return (
		<>
			<Helmet defaultTitle={`WorldCereal ${`| ${title}`}`} />
			<div className="worldCereal-ProductViewer">
				<Header />
				<StatisticsPanel />
				<Maps />
			</div>
		</>
	);
};

StatisticsPage.propTypes = {
	onViewSelect: PropTypes.func,
};

const mapDispatchToProps = dispatch => {
	return {
		onViewSelect: viewKey => {
			dispatch(Action.worldCereal.applyView(viewKey));
		},
	};
};

export default connect(() => ({}), mapDispatchToProps)(StatisticsPage);
