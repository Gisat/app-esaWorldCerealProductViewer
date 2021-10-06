import React from 'react';
import chroma from 'chroma-js';
import {find as _find, findIndex as _findIndex} from 'lodash';
import PropTypes from 'prop-types';
import {Mouse} from '@gisatcz/ptr-timeline';
import Months from '../MapTimeline/Months';
import Years from '../MapTimeline/Years';
import MapTimeline from '../MapTimeline';

import './style.scss';

// TODO dynamic
const periodLimit = {
	start: '2019-01-02',
	end: '2021-01-31',
};

const LEVELS = [
	{
		level: 'year',
		end: 2,
	},
	{
		level: 'month',
		end: 5,
	},
];

const Levels = props => {
	const {activeLevel} = props;
	switch (activeLevel) {
		case 'year':
			return React.createElement(Years, {...props, key: 'year'});
		case 'month':
			return React.createElement(Months, {...props, key: 'month'});
	}
	return React.createElement(Months, {...props, key: 'month'});
};

class Timeline extends React.PureComponent {
	static propTypes = {};

	render() {
		const {
			productMetadata,
			productTemplates,
			activeLayers,
			handleProductInActiveMap,
		} = this.props;

		const layersByProducts = {};
		let layers = [];

		// TODO prepare this in selector
		if (productMetadata?.length) {
			productMetadata.forEach((product, i) => {
				const placeID = product.data.aez;
				const productID = product.data.product;
				const productTemplate = productTemplates[productID];
				const productName = productTemplate?.data?.nameDisplay || productID;

				if (!layersByProducts.hasOwnProperty(productID)) {
					layersByProducts[productID] = {};
				}

				if (!layersByProducts[productID].hasOwnProperty(placeID)) {
					layersByProducts[productID][placeID] = [];
				}

				const activeProductColor =
					productTemplate?.data?.style?.data?.definition?.rules[0]?.styles[0]
						?.color;
				const productColor = activeProductColor
					? chroma(activeProductColor).desaturate(3).hex()
					: null;
				// push data from same place and same product to the same line in timeline
				layersByProducts[productID][placeID].push({
					key: product.key,
					layerTemplateKey: product.key,
					period: [
						{
							start: product.data.sos,
							end: product.data.eos,
						},
					],
					color: productColor || 'var(--accent50)',
					activeColor: activeProductColor || 'var(--accent70)',
					active: !!_find(
						activeLayers,
						layer => layer.layerKey === product.key
					),
					activePeriodIndex: 0,
					title: `${productName} (zone ${placeID})`,
					// zIndex: i,
				});
			});
		}

		for (const product of Object.keys(layersByProducts)) {
			for (const place of Object.keys(layersByProducts[product])) {
				layers = [...layers, layersByProducts[product][place]];
			}
		}

		return (
			<div className="worldCereal-Timeline">
				{layers ? (
					<MapTimeline
						periodLimit={periodLimit}
						vertical={false}
						levels={LEVELS}
						selectMode={true}
						layers={layers}
						legend={true}
						onLayerClick={handleProductInActiveMap}
					>
						<Levels />
						<Mouse mouseBufferWidth={20} key="mouse" />
					</MapTimeline>
				) : null}
			</div>
		);
	}
}

export default Timeline;
