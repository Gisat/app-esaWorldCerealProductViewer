import {useEffect} from 'react';
import PropTypes from 'prop-types';
import {ButtonSwitch, ButtonSwitchOption} from '@gisatcz/ptr-atoms';
import StatisticsConfigurationItem from '../StatisticsConfigurationItem';
import './style.scss';

const LevelSwitch = ({
	onMount,
	onUnmount,
	activeLevelKey,
	levels,
	onActiveLevelChange,
}) => {
	useEffect(() => {
		if (onMount && typeof onMount === 'function') {
			onMount();
		}

		if (onUnmount && typeof onUnmount === 'function') {
			return onUnmount;
		}
	}, []);

	return (
		<StatisticsConfigurationItem label="Level">
			<ButtonSwitch
				className="ptr-dark worldCereal-LevelSwitch worldCereal-ButtonSwitch"
				onClick={onActiveLevelChange}
			>
				{levels?.map(level => (
					<ButtonSwitchOption
						key={level.key}
						value={level.key}
						active={level.key === activeLevelKey}
					>
						{level.data.nameDisplay}
					</ButtonSwitchOption>
				))}
			</ButtonSwitch>
		</StatisticsConfigurationItem>
	);
};

LevelSwitch.propTypes = {
	activeLevelKey: PropTypes.string,
	onActiveLevelChange: PropTypes.func,
	levels: PropTypes.array,
	onMount: PropTypes.func,
	onUnmount: PropTypes.func,
};

export default LevelSwitch;
