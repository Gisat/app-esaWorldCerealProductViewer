import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import {Button, ButtonGroup} from '@gisatcz/ptr-atoms';

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
				<ButtonGroup>
					{this.props.productMetadata &&
						this.props.productMetadata.map(metadataItem => {
							return <Button>{metadataItem.data.name}</Button>;
						})}
				</ButtonGroup>
			</div>
		);
	}
}

export default ControlPanel;
