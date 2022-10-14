// eslint-disable-next-line no-unused-vars
import React from 'react';
import {isEmpty as _isEmpty, forIn as _forIn} from 'lodash';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {Button, Menu, MenuItem} from '@gisatcz/ptr-atoms';
import MapProductLabel from '../Maps/ProductLabel';
import {RemovableLabelContainer} from '../atoms/RemovableLabel';
import {MIN_PRODUCT_MAP_LABELS_FOR_GROUPING} from '../../constants/app';

import './style.scss';

const MapWrapper = ({
	mapKey,
	activeMapKey,
	removeMap,
	mapSetMapKeys,
	productsMetadata,
	removeAllLayers,
	children,
}) => {
	const wrapperClasses = classnames('ptr-map-wrapper worldCereal-MapWrapper', {
		active: mapKey === activeMapKey,
	});

	const noMetadata = _isEmpty(productsMetadata);

	const renderMapProductLabels = productsMetadata => {
		let labels = [];
		_forIn(productsMetadata, (models, product) => {
			if (models.length >= MIN_PRODUCT_MAP_LABELS_FOR_GROUPING) {
				labels.push(renderMapProductLabel(product, product, models));
			} else {
				models.forEach(model => {
					labels.push(renderMapProductLabel(model.key, product, [model]));
				});
			}
		});

		return labels.length ? labels : null;
	};

	const renderMapProductLabel = (key, productKey, productMetadata) => {
		const productMetadataKeys = productMetadata.map(item => item.key);

		return (
			<MapProductLabel
				key={key}
				productKey={productKey}
				productMetadataKeys={productMetadataKeys}
				productMetadata={productMetadata}
				mapKey={mapKey}
			/>
		);
	};

	return (
		<div className={wrapperClasses}>
			{!noMetadata ? (
				<RemovableLabelContainer className="worldCereal-MapProductLabelContainer">
					{renderMapProductLabels(productsMetadata)}
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
							disabled={noMetadata}
							onClick={() => removeAllLayers(mapKey)}
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
						onClick={() => removeMap(mapKey)}
					/>
				) : null}
			</div>
			{children}
		</div>
	);
};

MapWrapper.propTypes = {
	activeMapKey: PropTypes.string,
	children: PropTypes.node,
	mapKey: PropTypes.string,
	mapSetMapKeys: PropTypes.array,
	productsMetadata: PropTypes.object,
	removeAllLayers: PropTypes.func,
	removeMap: PropTypes.func,
};

export default MapWrapper;
