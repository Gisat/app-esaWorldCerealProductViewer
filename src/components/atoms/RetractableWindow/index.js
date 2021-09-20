import React, {useState, useEffect} from 'react';
import useSize from '@react-hook/size';
import classnames from 'classnames';

import './style.scss';

const RetractableWindowControlBar = ({children, onClick, onHeightChange}) => {
	const ref = React.useRef(null);
	const [width, height] = useSize(ref);

	useEffect(() => {
		onHeightChange(height);
	}, [height]);

	return (
		<div
			ref={ref}
			onClick={onClick}
			className="ptr-RetractableWindowControlBar"
		>
			{children}
		</div>
	);
};

const RetractableWindowBody = ({children, height}) => {
	const style = {
		height: `${height}rem`,
	};

	return (
		<div className="ptr-RetractableWindowBody" style={style}>
			{children}
		</div>
	);
};

const RetractableWindow = ({
	children,
	controlBarContent,
	retracted,
	bottomPosition,
	bodyHeight,
	className,
}) => {
	const [isRetracted, handleRetraction] = useState(retracted);
	const [positionOffset, handlePosition] = useState(0);

	const classes = classnames('ptr-RetractableWindow', {
		...className,
		'is-retracted': isRetracted,
	});

	const style = {
		top: `calc(100% - ${positionOffset}px - ${
			isRetracted ? bottomPosition : bottomPosition + bodyHeight
		}rem)`,
	};

	return (
		<div className={classes} style={style}>
			<RetractableWindowControlBar
				onHeightChange={height => handlePosition(height)}
				onClick={() => handleRetraction(!isRetracted)}
			>
				{controlBarContent}
			</RetractableWindowControlBar>
			<RetractableWindowBody height={bodyHeight}>
				{children}
			</RetractableWindowBody>
		</div>
	);
};

export default RetractableWindow;
