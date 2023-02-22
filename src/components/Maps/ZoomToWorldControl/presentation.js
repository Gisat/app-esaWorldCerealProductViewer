import PropTypes from 'prop-types';
import {IconTool, Tooltip} from '@gisatcz/ptr-atoms';
import ComponentRenderer from '../ComponentRenderer';
import {WORLD_BOX_RANGE} from '../../../constants/app';

const ZoomToWorldControl = ({currentBoxRange, onBoxRangeChange}) => {
	return (
		<ComponentRenderer
			component={'zoomToWorld'}
			configurationGroupKey={'mapSetTools'}
		>
			<IconTool
				active={currentBoxRange === WORLD_BOX_RANGE}
				tooltip={{text: 'Zoom to World', position: 'left', component: Tooltip}}
				onClick={() => onBoxRangeChange(WORLD_BOX_RANGE)}
				floating
				medium
				icon="globe"
			/>
		</ComponentRenderer>
	);
};

ZoomToWorldControl.propTypes = {
	currentBoxRange: PropTypes.number,
	mapSetKey: PropTypes.string,
	onBoxRangeChange: PropTypes.func,
};

export default ZoomToWorldControl;
