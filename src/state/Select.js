import {Select as CommonSelect} from '@gisatcz/ptr-state';

import productMetadataSelectors from './worldCereal/ProductMetadata/selectors';
import productMetadataFilterSelectors from './worldCereal/ProductMetadataFilter/selectors';
import timelineSelect from './worldCereal/Timeline/selectors';
import worldCerealSelectors from './worldCereal/selectors';

export default {
	...CommonSelect,
	worldCereal: {
		productMetadata: productMetadataSelectors,
		productMetadataFilter: productMetadataFilterSelectors,
		timeline: timelineSelect,

		...worldCerealSelectors,
	},
};
