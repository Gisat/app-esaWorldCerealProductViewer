import {Action as CommonAction} from '@gisatcz/ptr-state';
import config from '../config';
import {appKey} from '../constants/keys';

function initApp() {
	return (dispatch, getState) => {
		dispatch(CommonAction.app.updateLocalConfiguration(config));
		dispatch(CommonAction.app.setKey(appKey));
		dispatch(CommonAction.app.loadConfiguration());
	};
}

export default {
	...CommonAction,
	initApp,
	worldCereal: {

	},
};
