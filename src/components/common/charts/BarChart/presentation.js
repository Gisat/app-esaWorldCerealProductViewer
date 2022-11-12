import PropTypes from 'prop-types';
import {useEffect} from 'react';
import {ResponsiveBar} from '@nivo/bar';
import colorUtils from '../../../../utils/colors';
import helpers from '../helpers';

import './style.scss';

const BarChart = ({
	onMount,
	onUnmount,
	data,
	metadata,
	selectedFeatureKeys,
	onClick,
	onSelectedFeaturesChange,
}) => {
	const {valueAttributeKeys, settings, options} = metadata;
	const colorMap = colorUtils.getColorMap(valueAttributeKeys);

	useEffect(() => {
		if (typeof onMount === 'function') {
			onMount();
		}
		if (typeof onUnmount === 'function') {
			return onUnmount;
		}
	}, []);

	useEffect(() => {
		if (options?.selectedFeaturesOnly) {
			onSelectedFeaturesChange(selectedFeatureKeys);
		}
	}, [selectedFeatureKeys]);

	const onColumnClick = (chartData, e) => {
		const {data} = chartData;
		const {ctrlKey, metaKey} = e;
		if (data) {
			onClick(
				helpers.getSelectedFeatureKeysOnClick(
					data.id.toString(),
					ctrlKey || metaKey,
					selectedFeatureKeys
				)
			);
		}
	};

	return (
		<ResponsiveBar
			onClick={onColumnClick}
			data={data}
			keys={valueAttributeKeys}
			colors={({indexValue, id}) => {
				if (
					selectedFeatureKeys?.length &&
					indexValue &&
					selectedFeatureKeys.includes(indexValue.toString())
				) {
					return colorMap?.[id]?.highlighted || '#11bda3';
				} else {
					return colorMap?.[id]?.base || '#97e2d5';
				}
			}}
			tooltip={() => {}}
			{...settings}
		/>
	);
};

BarChart.propTypes = {
	onClick: PropTypes.func,
	onMount: PropTypes.func,
	onUnmount: PropTypes.func,
	data: PropTypes.array,
	metadata: PropTypes.object,
	selectedFeatureKeys: PropTypes.array,
	onSelectedFeaturesChange: PropTypes.func,
};

export default BarChart;
