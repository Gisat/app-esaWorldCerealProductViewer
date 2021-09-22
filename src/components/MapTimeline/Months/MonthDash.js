import React from 'react';
import PropTypes from 'prop-types';
import {utils} from '@gisatcz/ptr-timeline';
const MonthDash = props => {
	const {x, label, vertical, height} = props;
	return (
		<g className={'ptr-timeline-month'}>
			{/* {height === 2 ? React.createElement(utils.dash.D2, {x,vertical}) : null} */}
			{/* {height === 1 ? React.createElement(utils.dash.D1, {x,vertical}) : null} */}
			{React.createElement(utils.dash.D1, {x,vertical})}
			{label}
		</g>
	);
};

MonthDash.propTypes = {
	x: PropTypes.number,
	label: PropTypes.element,
	vertical: PropTypes.bool,
};

MonthDash.defaultProps = {
	vertical: false,
	label: null,
};

export default MonthDash;
