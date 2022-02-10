import {createElement} from 'react';
import chroma from 'chroma-js';
import classnames from 'classnames';
import {find as _find} from 'lodash';
import PropTypes from 'prop-types';
import {Mouse} from '@gisatcz/ptr-timeline';
import Months from '../MapTimeline/Months';
import Years from '../MapTimeline/Years';
import MapTimeline from '../MapTimeline';

import './style.scss';

// TODO dynamic
const periodLimit = {
	start: '2018-05-01',
	end: '2020-03-31',
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
			return createElement(Years, {...props, key: 'year'});
		case 'month':
			return createElement(Months, {...props, key: 'month'});
	}
	return createElement(Months, {...props, key: 'month'});
};

Levels.propTypes = {
	activeLevel: PropTypes.string,
};

const Timeline = ({
	productMetadata,
	productTemplates,
	activeLayers,
	handleProductInActiveMap,
	isInteractivityLimited,
}) => {
	const layersByProducts = {};
	let layers = [];

	// TODO prepare this in selector
	if (productMetadata?.length) {
		productMetadata.forEach(product => {
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
			// push data from same place and same product to the same line in timeline
			layersByProducts[productID][placeID][seasonID].push({
				key: product.key,
				layerTemplateKey: product.key,
				period: [
					{
						start: product.data.sos,
						end: product.data.eos,
					},
				],
				color: productColor || 'var(--base60)',
				activeColor: activeProductColor || 'var(--base40)',
				active: !!_find(activeLayers, layer => layer.layerKey === product.key),
				activePeriodIndex: 0,
				title: `${productName}`,
				subtitle: `(${seasonID}, zone ${placeID})`,
				// zIndex: i,
			});
		});
	}

	for (const product of Object.keys(layersByProducts)) {
		for (const place of Object.keys(layersByProducts[product])) {
			for (const season of Object.keys(layersByProducts[product][place])) {
				layers = [...layers, layersByProducts[product][place][season]];
			}
		}
	}

	const classes = classnames('worldCereal-Timeline', {
		disabled: isInteractivityLimited,
	});

	return (
		<div className={classes}>
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
};

Timeline.propTypes = {
	activeLayers: PropTypes.array,
	handleProductInActiveMap: PropTypes.func,
	isInteractivityLimited: PropTypes.bool,
	productMetadata: PropTypes.array,
	productTemplates: PropTypes.object,
};

export default Timeline;
