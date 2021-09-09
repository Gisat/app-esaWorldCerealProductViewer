import {commonActions} from '@gisatcz/ptr-state';
import ActionTypes from '../../../constants/ActionTypes';

const add = commonActions.add(ActionTypes.WORLD_CEREAL.PRODUCT_METADATA);
const setActiveKeys = commonActions.setActiveKeys(
	ActionTypes.WORLD_CEREAL.PRODUCT_METADATA
);

export default {
	add,
	setActiveKeys,
};
