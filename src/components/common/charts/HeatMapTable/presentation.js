// import PropTypes from 'prop-types';
// import {useEffect} from 'react';
import {ResponsiveHeatMap} from '@nivo/heatmap';

import './style.scss';
import {useEffect} from 'react';
import PropTypes from 'prop-types';

const data = [
	{
		id: 'Active cropland',
		data: [
			{
				x: 'Summer1',
				y: 0.23,
			},
			{
				x: 'Summer2',
				y: 0.33,
			},
			{
				x: 'Winter',
				y: 0.11,
			},
		],
	},
	{
		id: 'Active irrigation',
		data: [
			{
				x: 'Summer1',
				y: 0,
			},
			{
				x: 'Summer2',
				y: 0.002,
			},
			{
				x: 'Winter',
				y: 0.05,
			},
		],
	},
	{
		id: 'Maize',
		data: [
			{
				x: 'Summer1',
				y: 0.111,
			},
			{
				x: 'Summer2',
				y: 0.2,
			},
			{
				x: 'Winter',
				y: null,
			},
		],
	},
	{
		id: 'Spring cereals',
		data: [
			{
				x: 'Summer1',
				y: 0.97,
			},
			{
				x: 'Winter',
				y: null,
			},
			{
				x: 'Summer2',
				y: null,
			},
		],
	},
	{
		id: 'Winter cereals',
		data: [
			{
				x: 'Summer1',
				y: null,
			},
			{
				x: 'Winter',
				y: 0.66,
			},
			{
				x: 'Summer2',
				y: null,
			},
		],
	},
];

const HeatMapTable = ({onMount, onUnmount}) => {
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
	onMount: PropTypes.func,
	onUnmount: PropTypes.func,
};

export default HeatMapTable;
