import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {Button} from '@gisatcz/ptr-atoms';
import MapLayerLabel, {MapLayerLabelContainer} from '../MapLayerLabel';

import './style.scss';

class MapWrapper extends React.PureComponent {
	static propTypes = {
		activeMapKey: PropTypes.string,
		mapSetMapKeys: PropTypes.array,
		productMetadata: PropTypes.array,
	};

	constructor(props) {
		super(props);
	}

	render() {
		const {mapKey, activeMapKey, removeMap, mapSetMapKeys, productMetadata} =
			this.props;
		const wrapperClasses = classnames(
			'ptr-map-wrapper worldCereal-MapWrapper',
			{
				active: mapKey === activeMapKey,
			}
		);

		return (
			<div className={wrapperClasses}>
				<MapLayerLabelContainer>
					{productMetadata?.length
						? productMetadata.map(productMetadataItem =>
								this.renderMapLayerLabel(productMetadataItem)
						  )
						: null}
				</MapLayerLabelContainer>
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

	renderMapLayerLabel(productMetadata) {
		return (
			<MapLayerLabel key={productMetadata.key} {...productMetadata.data} />
		);
	}
}

export default MapWrapper;
