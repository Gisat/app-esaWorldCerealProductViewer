import {createSelector} from 'reselect';
import chroma from 'chroma-js';
import worldCerealSelectors from '../selectors';

import {
	timelineLayerElementHeight,
	timelineLayerLineHeight,
} from '../../../constants/app';
console.log('xxx', worldCerealSelectors);
const getTimelineLayers = createSelector(
	[
		worldCerealSelectors.getProductTemplates,
		worldCerealSelectors.getActiveProductMetadataByActiveFilter,
	],
	(productTemplates, productMetadata) => {
		let timelineLayers = [];
		const layersByProducts = {};

		if (productMetadata?.length) {
			productMetadata.forEach((product, index) => {
				const placeID = product.data.aez;
				const productID = product.data.product;
				const seasonID = product.data.season;

				const productTemplate = productTemplates[productID];
				const productName = productTemplate?.data?.nameDisplay || productID;

				if (!Object.hasOwn(layersByProducts, productID)) {
					layersByProducts[productID] = {};
				}

				if (!Object.hasOwn(layersByProducts[productID], placeID)) {
					layersByProducts[productID][placeID] = {};
				}

				if (!Object.hasOwn(layersByProducts[productID][placeID], seasonID)) {
					layersByProducts[productID][placeID][seasonID] = [];
				}

				const activeProductColor =
					productTemplate?.data?.style?.data?.definition?.rules[0]?.styles[0]
						?.color;
				const productColor = activeProductColor
					? chroma(activeProductColor).desaturate(3).hex()
					: null;

				const config = {
					lineHeight: timelineLayerLineHeight,
					elementHeight: timelineLayerElementHeight,
					legend: {
						title: productName,
						subtitle: `(${seasonID}, zone ${placeID})`,
					},
					items: [
						{
							periods: [
								{
									data: {
										start: product.data.sos,
										end: product.data.eos,
									},
								},
							],
							colors: {
								basic: productColor || 'var(--base60)',
								active: activeProductColor || 'var(--base40)',
							},
							states: ['basic', 'active', 'hover', 'disabled'],
							activeStates: ['basic'],
							mapZIndex: index,
							layerState: {
								key: product.key, //used only as a key fot outline layer
								spatialDataSourceKey: product.data.dataSource.product, //used only as a key fot outline layer
							},
						},
					],
					controlMapState: false,
					allowNonActiveLayer: false,
				};

				layersByProducts[productID][placeID][seasonID].push(config);
			});
		}

		// order layers by product/place/season
		for (const product of Object.keys(layersByProducts)) {
			for (const place of Object.keys(layersByProducts[product])) {
				for (const season of Object.keys(layersByProducts[product][place])) {
					timelineLayers = [
						...timelineLayers,
						...layersByProducts[product][place][season],
					];
				}
			}
		}
		return timelineLayers;
	}
);

export default {
	getTimelineLayers,
};
