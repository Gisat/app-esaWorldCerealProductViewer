import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {Button} from '@gisatcz/ptr-atoms';
import MapProductLabel from '../MapProductLabel';
import {MapProductLabelContainer} from '../MapProductLabel/presentation';

import './style.scss';

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
					<MapProductLabelContainer>
						{productMetadataKeys.map(productMetadataKey =>
							this.renderMapProductLabel(productMetadataKey)
						)}
					</MapProductLabelContainer>
				) : null}
				{mapSetMapKeys?.length > 1 ? (
					<Button
						icon="close"
						invisible
						small
						className="worldCereal-MapRemoveButton"
						onClick={removeMap.bind(this, mapKey)}
					/>
				) : null}
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
