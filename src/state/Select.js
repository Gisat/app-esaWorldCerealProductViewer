import {createCachedSelector} from 're-reselect';
import {filter as _filter, includes as _includes} from 'lodash';
import {Select as CommonSelect} from '@gisatcz/ptr-state';

import productMetadataSelectors from './worldCereal/ProductMetadata/selectors';
import productMetadataFilterSelectors from './worldCereal/ProductMetadataFilter/selectors';
import {createSelector} from 'reselect';

/**
 * Get product template extended by style definition
 * @param {Object} state
 * @param {string} productMetadataKey uuid
 * @return {Object} Case model extended by style definition
 */
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

/**
 * Get style based on styleKey in case
 * @param {Object} state
 * @param {string} productTemplateKey caseKey
 * @return {Object} Panther style definition
 */
const getStyleDefinitionByProductTemplateKey = createCachedSelector(
	[CommonSelect.cases.getByKey, CommonSelect.styles.getAllAsObject],
	(productTemplate, styles) => {
		if (productTemplate && styles) {
			const styleKey = productTemplate.data?.styleKey;
			if (styleKey && styles[styleKey]) {
				return styles[styleKey].data.definition;
			} else {
				return null;
			}
		} else {
			return null;
		}
	}
)((state, productTemplateKey) => productTemplateKey);

const getProductMetadataByMapSetViewAndFilter = createSelector(
	[
		productMetadataSelectors.getByMapSetView,
		productMetadataFilterSelectors.getActiveFilter,
	],
	(productMetadata, filter) => {
		if (productMetadata && filter) {
			return _filter(productMetadata, item => {
				// TODO add other filter params
				const {aez_id, product, season} = item.data;
				if (filter.aez_id && !_includes(filter.aez_id, aez_id)) {
					return false;
				}
				if (filter.product && !_includes(filter.product, product)) {
					return false;
				}
				if (filter.season && !_includes(filter.season, season)) {
					return false;
				}
				return true;
			});
		} else {
			return null;
		}
	}
);

export default {
	...CommonSelect,
	worldCereal: {
		productMetadata: productMetadataSelectors,
		productMetadataFilter: productMetadataFilterSelectors,

		getProductMetadataByMapSetViewAndFilter,
		getProductTemplateByProductMetadataKey,
		getStyleDefinitionByProductTemplateKey,
	},
};
