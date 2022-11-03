import {useEffect} from 'react';
import PropTypes from 'prop-types';
import {ButtonSwitch, ButtonSwitchOption} from '@gisatcz/ptr-atoms';
import StatisticsConfigurationItem from '../StatisticsConfigurationItem';
import './style.scss';

const LevelSwitch = ({
	onMount,
	onUnmount,
	activeLevelKey,
	activePlaceKeys,
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
						disabled={activePlaceKeys?.length !== 1}
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
	activePlaceKeys: PropTypes.array,
	onActiveLevelChange: PropTypes.func,
	levels: PropTypes.array,
	onMount: PropTypes.func,
	onUnmount: PropTypes.func,
};

export default LevelSwitch;
