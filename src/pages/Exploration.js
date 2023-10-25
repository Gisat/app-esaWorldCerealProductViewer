import {connect} from '@gisatcz/ptr-state';
import {useEffect} from 'react';
import Action from '../state/Action';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import Maps from '../components/Maps';
import Header from '../components/views/common/Header';
import Filter from '../components/views/detailedExploarion/Filter';
import Timeline from '../components/views/detailedExploarion/Timeline';

const viewKey = '371846f9-0270-4e43-a46a-db009cd5946a';
const title = 'Detailed exploration';

const ExplorationPage = ({onViewSelect}) => {
	useEffect(() => {
		onViewSelect(viewKey);
	}, []);

	return (
		<>
			<Helmet defaultTitle={`WorldCereal ${`| ${title}`}`} />
			<div className="worldCereal-ProductViewer">
				<Header />
				<Maps />
				<Filter />
				<Timeline />
			</div>
		</>
	);
};

ExplorationPage.propTypes = {
	onViewSelect: PropTypes.func,
};

const mapDispatchToProps = dispatch => {
	return {
		onViewSelect: viewKey => {
			dispatch(Action.worldCereal.applyView(viewKey));
		},
	};
};

export default connect(() => ({}), mapDispatchToProps)(ExplorationPage);
