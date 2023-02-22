import PropTypes from 'prop-types';
import {IconTool, Tooltip} from '@gisatcz/ptr-atoms';
import ComponentRenderer from '../ComponentRenderer';
import {DETAILED_BOX_RANGE} from '../../../constants/app';

const ZoomToDetailControl = ({currentBoxRange, onBoxRangeChange}) => {
	return (
		<ComponentRenderer
			component={'zoomToDetail'}
			configurationGroupKey={'mapSetTools'}
		>
			<IconTool
				active={currentBoxRange === DETAILED_BOX_RANGE}
				tooltip={{text: 'Zoom to detail', position: 'left', component: Tooltip}}
				onClick={() => onBoxRangeChange(DETAILED_BOX_RANGE)}
				floating
				medium
				icon="ri-zoom-in-area"
			/>
		</ComponentRenderer>
	);
};

ZoomToDetailControl.propTypes = {
	currentBoxRange: PropTypes.number,
	mapSetKey: PropTypes.string,
	onBoxRangeChange: PropTypes.func,
};

export default ZoomToDetailControl;
