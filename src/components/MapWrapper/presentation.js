import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {Button, Menu, MenuItem} from '@gisatcz/ptr-atoms';
import MapProductLabel from '../MapProductLabel';

import './style.scss';
import {RemovableLabelContainer} from '../atoms/RemovableLabel';

class MapWrapper extends React.PureComponent {
	static propTypes = {
		activeMapKey: PropTypes.string,
		mapKey: PropTypes.string,
		mapSetMapKeys: PropTypes.array,
		productMetadata: PropTypes.array,
	};

	constructor(props) {
		super(props);
	}

	render() {
		const {
			mapKey,
			activeMapKey,
			removeMap,
			mapSetMapKeys,
			productMetadataKeys,
			removeAllLayers,
		} = this.props;
		const wrapperClasses = classnames(
			'ptr-map-wrapper worldCereal-MapWrapper',
			{
				active: mapKey === activeMapKey,
			}
		);

		return (
			<div className={wrapperClasses}>
				{productMetadataKeys?.length ? (
					<RemovableLabelContainer className="worldCereal-MapProductLabelContainer">
						{productMetadataKeys.map(productMetadataKey =>
							this.renderMapProductLabel(productMetadataKey)
						)}
					</RemovableLabelContainer>
				) : null}
				<div className="worldCereal-MapTools">
					<Button
						title="Options"
						onClick={() => {}}
						icon="dots"
						invisible
						small
						className="worldCereal-MapToolsButton"
					>
						<Menu left>
							<MenuItem
								disabled={!productMetadataKeys?.length}
								onClick={removeAllLayers.bind(this, mapKey)}
							>
								Remove all layers
							</MenuItem>
						</Menu>
					</Button>
					{mapSetMapKeys?.length > 1 ? (
						<Button
							title="Remove map"
							icon="close"
							invisible
							small
							className="worldCereal-MapToolsButton"
							onClick={removeMap.bind(this, mapKey)}
						/>
					) : null}
				</div>
				{this.props.children}
			</div>
		);
	}

	renderMapProductLabel(productMetadataKey) {
		return (
			<MapProductLabel
				key={productMetadataKey}
				productMetadataKey={productMetadataKey}
				mapKey={this.props.mapKey}
			/>
		);
	}
}

export default MapWrapper;
