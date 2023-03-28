// import PropTypes from 'prop-types';
// import {useEffect} from 'react';
import {ResponsiveHeatMap} from '@nivo/heatmap';

import './style.scss';
import {useEffect} from 'react';
import PropTypes from 'prop-types';

const HeatMapTable = ({
	data,
	metadata,
	selectedFeatureKeys,
	onMount,
	onUnmount,
	onSelectedFeaturesChange,
}) => {
	const {settings} = metadata;

	useEffect(() => {
		if (typeof onMount === 'function') {
			onMount();
		}
		if (typeof onUnmount === 'function') {
			return onUnmount;
		}
	}, []);

	useEffect(() => {
		onSelectedFeaturesChange(selectedFeatureKeys);
	}, [selectedFeatureKeys]);

	return (
		<ResponsiveHeatMap
			data={data}
			labelTextColor={item => {
				if (item?.value > 0.7) {
					return '#ffffff';
				} else if (item.value) {
					return '#333333';
				} else {
					return '#cccccc';
				}
			}}
			{...settings}
		/>
	);
};

HeatMapTable.propTypes = {
	data: PropTypes.array,
	metadata: PropTypes.object,
	onMount: PropTypes.func,
	onUnmount: PropTypes.func,
	selectedFeatureKeys: PropTypes.array,
	onSelectedFeaturesChange: PropTypes.func,
};

export default HeatMapTable;
