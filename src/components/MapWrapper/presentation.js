import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {Button} from '@gisatcz/ptr-atoms';

import './style.scss';

class MapWrapper extends React.PureComponent {
	static propTypes = {
		activeMapKey: PropTypes.string,
		mapSetMapKeys: PropTypes.array,
	};

	constructor(props) {
		super(props);
	}

	render() {
		const {mapKey, activeMapKey, removeMap, mapSetMapKeys} = this.props;
		const wrapperClasses = classnames(
			'ptr-map-wrapper worldCereal-MapWrapper',
			{
				active: mapKey === activeMapKey,
			}
		);

		return (
			<div className={wrapperClasses}>
				{mapSetMapKeys?.length > 1 ? (
					<Button
						icon="close"
						invisible
						className="worldCereal-MapRemoveButton"
						onClick={removeMap.bind(this, mapKey)}
					/>
				) : null}
				{this.props.children}
			</div>
		);
	}
}

export default MapWrapper;
