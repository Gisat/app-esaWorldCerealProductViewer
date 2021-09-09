import {commonActionTypes} from '@gisatcz/ptr-state';
import {utils} from '@gisatcz/ptr-utils';

const specificActionTypes = utils.deepKeyMirror({
	WORLD_CEREAL: {
		PRODUCT_METADATA: {
			ADD: null,
			SET_ACTIVE_KEYS: null,
		},
	},
});

export default {
	...commonActionTypes,
	...specificActionTypes,
};
