import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import './style.scss';

class MapWrapper extends React.PureComponent {
	static propTypes = {
		activeMapKey: PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	render() {
		const {mapKey, activeMapKey} = this.props;
		const wrapperClasses = classnames(
			'ptr-map-wrapper worldCereal-MapWrapper',
			{
				active: mapKey === activeMapKey,
			}
		);

		return <div className={wrapperClasses}>{this.props.children}</div>;
	}
}

export default MapWrapper;
