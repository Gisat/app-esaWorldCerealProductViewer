import classnames from 'classnames';
import React from 'react';

import './style.scss';

const ExpandableLabelsContainer = ({className, children}) => {
	const classes = classnames('ptr-ExpandableLabelsContainer', className);

	return <div className={classes}>{children}</div>;
};

export default ExpandableLabelsContainer;
