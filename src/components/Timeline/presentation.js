import React from 'react';
import {find as _find, findIndex as _findIndex} from 'lodash';
import PropTypes from 'prop-types';
import {Mouse} from '@gisatcz/ptr-timeline';
import Months from '../MapTimeline/Months';
import Years from '../MapTimeline/Years';
import MapTimeline from '../MapTimeline';

import './style.scss';

const periodLimit = {
	start: '2020',
	end: '2021',
};

const LEVELS = [
	{
		level: 'year',
		end: 2,
	},
	{
		level: 'month',
		end: 10,
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
		const {productMetadata, activeLayers, handleProductInActiveMap} =
			this.props;

		const layersByPlaces = {};
		let layers = [];
		if (productMetadata?.length) {
			productMetadata.forEach((product, i) => {
				const placeID = product.data.aez_id;
				const productID = product.data.product;
				if (!layersByPlaces.hasOwnProperty(placeID)) {
					layersByPlaces[placeID] = {};
				}

				if (!layersByPlaces[placeID].hasOwnProperty(productID)) {
					layersByPlaces[placeID][productID] = [];
				}

				// push data from same place and same product to the same line in timeline
				layersByPlaces[placeID][productID].push({
					key: product.key,
					layerTemplateKey: product.key,
					period: [
						{
							start: product.data.sos,
							end: product.data.eos,
						},
					],
					color: 'rgba(255, 0, 0, 0.3)',
					activeColor: 'rgba(255, 0, 0, 0.7)',
					active: !!_find(
						activeLayers,
						layer => layer.layerKey === product.key
					),
					activePeriodIndex: 0,
					title: `${product.data.product} (z ${product.data.aez_id}) ${product.data.name}`,
					// zIndex: i,
				});
			});
		}

		for (const placeId of Object.keys(layersByPlaces)) {
			for (const productID of Object.keys(layersByPlaces[placeId])) {
				layers = [...layers, layersByPlaces[placeId][productID]];
			}
		}

		return (
			<div className="worldCereal-Timeline">
				{layers ? (
					<MapTimeline
						periodLimit={periodLimit}
						onClick={evt => console.log('onClick', evt)}
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
