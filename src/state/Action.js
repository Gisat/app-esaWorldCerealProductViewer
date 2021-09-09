import {Action as CommonAction} from '@gisatcz/ptr-state';
import config from '../config';
import {appKey} from '../constants/keys';

// TODO load view from BE
import view from '../data/view';

function init(path) {
	return (dispatch, getState) => {
		dispatch(CommonAction.app.setBaseUrl(path));
		dispatch(CommonAction.app.updateLocalConfiguration(config));
		dispatch(CommonAction.app.setKey(appKey));
		// dispatch(CommonAction.app.loadConfiguration());

		// add & apply view
		dispatch(CommonAction.views.add(view));
		dispatch(CommonAction.views.applyAndSetActive(view.key, CommonAction));
	};
}

export default {
	...CommonAction,
	init,
	// worldCereal: {},
};
