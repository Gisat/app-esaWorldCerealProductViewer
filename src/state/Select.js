import {createCachedSelector} from 're-reselect';
import {
	filter as _filter,
	includes as _includes,
	findIndex as _findIndex,
} from 'lodash';
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

/**
 * Filter product metadata according to current map view and active filter
 * @param {Object} state
 * @param {string} mapSetKey
 * @return {Array} A collection of filtered product metadata
 */
const getProductMetadataByMapSetViewAndActiveFilter = createSelector(
	[
		productMetadataSelectors.getByMapSetView,
		productMetadataFilterSelectors.getActiveFilter,
	],
	(productMetadata, activeFilter) => {
		if (productMetadata && activeFilter) {
			return filterMetadata(productMetadata, activeFilter);
		} else {
			return null;
		}
	}
);

/**
 * @param {Object} state
 * @param {string} mapSetKey
 * @param {string} filterParameterKey
 * @param {string} value option
 * @return {number}
 */
const getProductMetadataCountForFilterOption = createCachedSelector(
	[
		productMetadataSelectors.getByMapSetView,
		productMetadataFilterSelectors.getActiveFilter,
		(state, mapSetKey, filterParameterKey) => filterParameterKey,
		(state, mapSetKey, filterParameterKey, value) => value,
	],
	(productMetadata, activeFilter, filterParameterKey, value) => {
		if (productMetadata && activeFilter && filterParameterKey && value) {
			const updatedFilter = {...activeFilter, [filterParameterKey]: [value]};
			const filteredMetadata = filterMetadata(productMetadata, updatedFilter);
			return filteredMetadata?.length || 0;
		} else {
			return 0;
		}
	}
)(
	(state, mapSetKey, filterParameterKey, value) =>
		`${filterParameterKey}_${value}`
);

// helpers
/**
 * @param productMetadata {Array} A collection of product metadata
 * @param filter {Object} metadata filter
 * @returns {Array} A collection of filtered product metadata
 */
function filterMetadata(productMetadata, filter) {
	return _filter(productMetadata, item => {
		// TODO add other filter params
		const {aez_id, product, season} = item.data;
		if (filter.aez_id && filter.aez_id.indexOf(aez_id) === -1) {
			return false;
		}
		if (filter.product && filter.product.indexOf(product) === -1) {
			return false;
		}
		if (filter.season && filter.season.indexOf(season) === -1) {
			return false;
		}
		return true;
	});
}

export default {
	...CommonSelect,
	worldCereal: {
		productMetadata: productMetadataSelectors,
		productMetadataFilter: productMetadataFilterSelectors,

		getProductMetadataByMapSetViewAndActiveFilter,
		getProductMetadataCountForFilterOption,
		getProductTemplateByProductMetadataKey,
		getStyleDefinitionByProductTemplateKey,
	},
};
