import {Select as CommonSelect} from '@gisatcz/ptr-state';
import productMetadataSelectors from './worldCereal/ProductMetadata/selectors';

export default {
	...CommonSelect,
	worldCereal: {
		productMetadata: productMetadataSelectors,
	},
};
