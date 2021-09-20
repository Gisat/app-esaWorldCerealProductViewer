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
				Control
			</RetractableWindowControlBar>
			<RetractableWindowBody height={bodyHeight}>
				<p>
					Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui.
					Aliquam in lorem sit amet leo accumsan lacinia. Nullam sit amet magna
					in magna gravida vehicula. Etiam posuere lacus quis dolor. Nam sed
					tellus id magna elementum tincidunt. Integer vulputate sem a nibh
					rutrum consequat. Donec iaculis gravida nulla. Nulla accumsan, elit
					sit amet varius semper, nulla mauris mollis quam, tempor suscipit diam
					nulla vel leo. In rutrum. Donec ipsum massa, ullamcorper in, auctor
					et, scelerisque sed, est. Nullam justo enim, consectetuer nec,
					ullamcorper ac, vestibulum in, elit. Donec quis nibh at felis congue
					commodo.
				</p>
				<p>
					Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui.
					Aliquam in lorem sit amet leo accumsan lacinia. Nullam sit amet magna
					in magna gravida vehicula. Etiam posuere lacus quis dolor. Nam sed
					tellus id magna elementum tincidunt. Integer vulputate sem a nibh
					rutrum consequat. Donec iaculis gravida nulla. Nulla accumsan, elit
					sit amet varius semper, nulla mauris mollis quam, tempor suscipit diam
					nulla vel leo. In rutrum. Donec ipsum massa, ullamcorper in, auctor
					et, scelerisque sed, est. Nullam justo enim, consectetuer nec,
					ullamcorper ac, vestibulum in, elit. Donec quis nibh at felis congue
					commodo.
				</p>
			</RetractableWindowBody>
		</div>
	);
};

export default RetractableWindow;
