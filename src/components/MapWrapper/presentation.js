import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {Button} from '@gisatcz/ptr-atoms';
import MapProductLabel, {MapProductLabelContainer} from '../MapProductLabel';

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
				<MapProductLabelContainer>
					{productMetadata?.length
						? productMetadata.map(productMetadataItem =>
								this.renderMapProductLabel(productMetadataItem)
						  )
						: null}
				</MapProductLabelContainer>
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

	renderMapProductLabel(productMetadata) {
		return (
			<MapProductLabel key={productMetadata.key} {...productMetadata.data} />
		);
	}
}

export default MapWrapper;
