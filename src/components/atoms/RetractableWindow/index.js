import React, {useState} from 'react';
import classnames from 'classnames';

import './style.scss';

const RetractableWindowControlBar = ({children, onClick}) => {
	return (
		<div onClick={onClick} className="ptr-RetractableWindowControlBar">
			{children}
		</div>
	);
};

const RetractableWindowBody = ({children}) => {
	return <div className="ptr-RetractableWindowBody">{children}</div>;
};

const RetractableWindow = ({children, retracted, className}) => {
	const [isRetracted, handleRetraction] = useState(retracted);

	const classes = classnames('ptr-RetractableWindow', {
		...className,
		'is-retracted': isRetracted,
	});

	return (
		<div className={classes}>
			<RetractableWindowControlBar
				onClick={() => handleRetraction(!isRetracted)}
			>
				Control
			</RetractableWindowControlBar>
			<RetractableWindowBody>
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
