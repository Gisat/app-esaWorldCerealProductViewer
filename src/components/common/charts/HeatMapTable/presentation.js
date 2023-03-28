// import PropTypes from 'prop-types';
// import {useEffect} from 'react';
import {ResponsiveHeatMap} from '@nivo/heatmap';

import './style.scss';
import {useEffect} from 'react';
import PropTypes from 'prop-types';

const HeatMapTable = ({data, onMount, onUnmount}) => {
	useEffect(() => {
		if (typeof onMount === 'function') {
			onMount();
		}
		if (typeof onUnmount === 'function') {
			return onUnmount;
		}
	}, []);

	return (
		<ResponsiveHeatMap
			data={data}
			margin={{top: 20, right: 10, bottom: 10, left: 90}}
			valueFormat=">-.1%"
			axisTop={{
				tickSize: 5,
				tickPadding: 5,
				legend: '',
				legendOffset: 46,
			}}
			axisLeft={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
			}}
			colors={{
				type: 'sequential',
				scheme: 'oranges',
				// colors: ['#ff0000', '#0000ff'],
				minValue: 0,
				maxValue: 1,
			}}
			theme={{
				fontSize: 11,
				textColor: 'var(--base70)',
				axis: {
					legend: {
						text: {
							fontSize: 13,
							fontWeight: 'bold',
						},
					},
					ticks: {
						line: {
							stroke: 'var(--base20)',
						},
					},
				},
				grid: {
					line: {
						stroke: 'var(--base20)',
					},
				},
				labels: {
					text: {
						fontSize: 13,
						fontWeight: 'bold',
					},
				},
			}}
			emptyColor="#ffffff22"
			tooltip={() => {}}
		/>
	);
};

HeatMapTable.propTypes = {
	data: PropTypes.array,
	onMount: PropTypes.func,
	onUnmount: PropTypes.func,
};

export default HeatMapTable;
