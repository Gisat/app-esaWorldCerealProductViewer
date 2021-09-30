import React from 'react';
import {isEmpty as _isEmpty, forIn as _forIn} from 'lodash';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {Button, Menu, MenuItem} from '@gisatcz/ptr-atoms';
import MapProductLabel from '../MapProductLabel';

import './style.scss';
import {RemovableLabelContainer} from '../atoms/RemovableLabel';
import {MIN_PRODUCT_MAP_LABELS_FOR_GROUPING} from '../../constants/app';

class MapWrapper extends React.PureComponent {
	static propTypes = {
		activeMapKey: PropTypes.string,
		mapKey: PropTypes.string,
		mapSetMapKeys: PropTypes.array,
		productsMetadata: PropTypes.object,
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
			productsMetadata,
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
				{!_isEmpty(productsMetadata) ? (
					<RemovableLabelContainer className="worldCereal-MapProductLabelContainer">
						{this.renderMapProductLabels(productsMetadata)}
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
								disabled={!productsMetadata?.length}
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

	renderMapProductLabels(productsMetadata) {
		let labels = [];
		_forIn(productsMetadata, (models, product) => {
			if (models.length >= MIN_PRODUCT_MAP_LABELS_FOR_GROUPING) {
				// labels.push(this.renderMapMultipleProductsLabel(product, models));
			} else {
				models.forEach(model => {
					labels.push(this.renderMapProductLabel(product, model));
				});
			}
		});

		return labels.length ? labels : null;
	}

	renderMapProductLabel(productKey, productMetadata) {
		return (
			<MapProductLabel
				key={productMetadata.key}
				productKey={productKey}
				productMetadataKey={productMetadata.key}
				productMetadata={productMetadata}
				mapKey={this.props.mapKey}
			/>
		);
	}
}

export default MapWrapper;
