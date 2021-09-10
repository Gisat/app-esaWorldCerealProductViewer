import React from 'react';
import PropTypes from 'prop-types';
import {find as _find} from 'lodash';

import './style.scss';
import {Button, ButtonGroup} from '@gisatcz/ptr-atoms';

class ControlPanel extends React.PureComponent {
	static propTypes = {
		layers: PropTypes.array,
		productMetadata: PropTypes.array,
	};

	constructor(props) {
		super(props);
	}

	render() {
		const {productMetadata, layers, handleProductInActiveMap} = this.props;

		return (
			<div className="worldCereal-ControlPanel">
				<ButtonGroup>
					{productMetadata &&
						productMetadata.map(metadataItem => {
							return (
								<Button
									onClick={handleProductInActiveMap.bind(
										this,
										metadataItem.key
									)}
									primary={
										!!_find(
											layers,
											layer => layer.layerKey === metadataItem.key
										)
									}
								>
									{metadataItem.data.name}
								</Button>
							);
						})}
				</ButtonGroup>
			</div>
		);
	}
}

export default ControlPanel;
