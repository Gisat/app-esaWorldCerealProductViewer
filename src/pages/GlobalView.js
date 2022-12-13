import {connect} from '@gisatcz/ptr-state';
import {useEffect} from 'react';
import Action from '../state/Action';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import Maps from '../components/Maps';
import Header from '../components/views/common/Header';
import GlobalProducts from '../components/views/global/GlobalProducts';

const viewKey = 'fc3aac1e-ffb2-4925-ae38-c95b8e8311c7';
const title = 'Global view';

const GlobalViewPage = ({onViewSelect}) => {
	useEffect(() => {
		onViewSelect(viewKey);
	}, []);

	return (
		<>
			<Helmet defaultTitle={`WorldCereal ${`| ${title}`}`} />
			<div className="worldCereal-ProductViewer">
				<Header />
				<Maps />
				<GlobalProducts />
			</div>
		</>
	);
};

GlobalViewPage.propTypes = {
	onViewSelect: PropTypes.func,
};

const mapDispatchToProps = dispatch => {
	return {
		onViewSelect: viewKey => {
			dispatch(Action.worldCereal.applyView(viewKey));
		},
	};
};

export default connect(() => ({}), mapDispatchToProps)(GlobalViewPage);
