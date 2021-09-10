import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

class ControlPanel extends React.PureComponent {
	static propTypes = {
		productMetadata: PropTypes.array,
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="worldCereal-ControlPanel">
				{this.props.productMetadata &&
					this.props.productMetadata.map(metadataItem => {
						return <div key={metadataItem.key}>{metadataItem.data.name}</div>;
					})}
			</div>
		);
	}
}

export default ControlPanel;
