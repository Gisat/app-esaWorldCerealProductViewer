import React from 'react';
import classnames from 'classnames';
import {Button} from '@gisatcz/ptr-atoms';

import './style.scss';

export const MapLabelContainer = ({className, children}) => {
	const classes = classnames('ptr-MapLabelContainer', className);

	return <div className={classes}>{children}</div>;
};

const MapLabel = ({stripColor, onRemove, children, className}) => {
	const classes = classnames('ptr-MapLabel', className);

	return (
		<div className={classes} style={{borderColor: stripColor}}>
			<div className="ptr-MapLabel-content">{children}</div>
			{onRemove ? (
				<Button
					className="ptr-MapLabel-removeButton"
					side="left"
					icon="close"
					small
					invisible
					onClick={onRemove}
				/>
			) : null}
		</div>
	);
};

export default MapLabel;
