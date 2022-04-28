import PropTypes from 'prop-types';
import classnames from 'classnames';

import './style.scss';

const StatusLabel = ({status, floating, small, children, className}) => {
	const classes = classnames(`ptr-StatusLabel ${className || ''}`, {
		'is-error': status === 'error',
		'is-warning': status === 'warning',
		'is-floating': floating,
		'is-small': small,
	});

	return <div className={classes}>{children}</div>;
};

StatusLabel.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	floating: PropTypes.bool,
	small: PropTypes.bool,
	status: PropTypes.string,
};

export default StatusLabel;
