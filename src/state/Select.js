import {Select as CommonSelect} from '@gisatcz/ptr-state';
import productMetadataSelectors from './worldCereal/ProductMetadata/selectors';
import {createCachedSelector} from 're-reselect';

const getProductTemplateByProductMetadataKey = createCachedSelector(
	[
		CommonSelect.cases.getAllAsObject,
		CommonSelect.styles.getAllAsObject,
		productMetadataSelectors.getByKey,
	],
	(cases, styles, productMetadata) => {
		if (productMetadata && cases) {
			const productTemplate = cases[productMetadata.data?.product];
			if (productTemplate) {
				if (styles) {
					const style = styles[productTemplate.data?.styleKey];
					if (style) {
						return {
							...productTemplate,
							data: {
								...productTemplate.data,
								style: style.data.definition,
							},
						};
					} else {
						return productTemplate;
					}
				} else {
					return productTemplate;
				}
			} else {
				return null;
			}
		} else {
			return null;
		}
	}
)((state, productMetadataKey) => productMetadataKey);

export default {
	...CommonSelect,
	worldCereal: {
		productMetadata: productMetadataSelectors,

		getProductTemplateByProductMetadataKey,
	},
};
