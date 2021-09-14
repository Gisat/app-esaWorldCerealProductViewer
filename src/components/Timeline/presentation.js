import React from 'react';
import {find as _find, findIndex as _findIndex} from 'lodash';
import PropTypes from 'prop-types';
import {MapTimeline, Mouse, Years, Months} from '@gisatcz/ptr-timeline';

import './style.scss';

const periodLimit = {
	start: '2019',
	end: '2022',
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

	constructor(props) {
		super(props);
	}

	render() {
		const {productMetadata, activeLayers, handleProductInActiveMap} =
			this.props;

		const layers = productMetadata?.length
			? productMetadata.map((product, i) => {
					return {
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
						activePeriodIndex: _findIndex(
							activeLayers,
							layer => layer.layerKey === product.key
						),
						title: product.data.name,
						info: product.data.product,
						zIndex: i,
					};
			  })
			: null;

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
