import PropTypes from 'prop-types';
import {Toggle} from '@gisatcz/visat-components';
import LayerLabelTool from '../LayerLabelTool';

const TooltipControl = ({active, onChange}) => {
	return (
		<LayerLabelTool
			title="Data query"
			key="tootips"
			onClick={() => onChange(!active)}
		>
			<Toggle className="ptr-dark" notInteractive on={active} />
		</LayerLabelTool>
	);
};

TooltipControl.propTypes = {
	active: PropTypes.bool,
	onChange: PropTypes.func,
};

export default TooltipControl;
