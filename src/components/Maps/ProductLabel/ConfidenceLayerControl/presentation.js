import PropTypes from 'prop-types';
import {Icon, Toggle} from '@gisatcz/ptr-atoms';
import {ProductLabelBodyItem} from '../presentation';
import {useEffect} from 'react';

import './style.scss';

const ConfidenceLayerControl = ({
	active,
	onChange,
	isActiveCropland,
	disabledDueBoxRange,
}) => {
	const disabled = isActiveCropland || disabledDueBoxRange;

	useEffect(() => {
		if (active) {
			onChange(!active);
		}
	}, [disabledDueBoxRange]);

	return (
		<ProductLabelBodyItem
			title="Confidence layer"
			key="confidence"
			onClick={() => (disabled ? {} : onChange(!active))}
			disabled={disabled}
		>
			{disabledDueBoxRange ? (
				<div
					className="worldWater-ConfidenceLayerControlHelp-wrapper"
					title="Zoom in to enable confidence layer"
				>
					<Icon
						className="worldWater-ConfidenceLayerControlHelp"
						icon="ri-help"
					/>
				</div>
			) : null}
			<Toggle
				className={disabled ? '' : 'ptr-dark'}
				notInteractive
				on={active}
			/>
		</ProductLabelBodyItem>
	);
};

ConfidenceLayerControl.propTypes = {
	active: PropTypes.bool,
	isActiveCropland: PropTypes.bool,
	disabledDueBoxRange: PropTypes.bool,
	onChange: PropTypes.func,
};

export default ConfidenceLayerControl;
