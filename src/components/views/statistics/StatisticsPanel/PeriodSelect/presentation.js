import PropTypes from 'prop-types';
import {useEffect} from 'react';
import StatisticsSelect from '../StatisticsSelect';
import './style.scss';

const PeriodSelect = ({
	activePeriodKey,
	periods,
	onActivePeriodChange,
	onMount,
	onUnmount,
}) => {
	useEffect(() => {
		if (onMount && typeof onMount === 'function') {
			onMount();
		}

		if (onUnmount && typeof onUnmount === 'function') {
			return onUnmount;
		}
	}, []);

	const options = periods?.map(periodItem => {
		return {value: periodItem.key, label: periodItem.data.nameDisplay};
	});
	const value = options?.find(option => option.value === activePeriodKey);

	const setActivePeriodKey = periodItem => {
		onActivePeriodChange(periodItem.value);
	};

	return (
		<StatisticsSelect
			label="Period"
			options={options}
			value={value}
			onChange={setActivePeriodKey}
		/>
	);
};

PeriodSelect.propTypes = {
	activePeriodKey: PropTypes.string,
	periods: PropTypes.array,
	onActivePeriodChange: PropTypes.func,
	onMount: PropTypes.func,
	onUnmount: PropTypes.func,
};

export default PeriodSelect;
