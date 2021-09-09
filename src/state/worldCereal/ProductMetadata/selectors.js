import {commonSelectors} from '@gisatcz/ptr-state';

const getSubstate = state => state.worldCereal.productMetadata;

const getActiveKeys = commonSelectors.getActiveKeys(getSubstate);
const getActiveModels = commonSelectors.getActiveModels(getSubstate);

export default {
	getSubstate,

	getActiveKeys,
	getActiveModels,
};
