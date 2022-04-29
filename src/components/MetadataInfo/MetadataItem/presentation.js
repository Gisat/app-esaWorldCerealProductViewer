// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {isArray as _isArray} from 'lodash';

import './style.scss';

const MetadataInfoItemRec = ({label, small, children}) => {
	const classes = classnames('worldCereal-MetadataInfoItemRec', {
		small,
	});

	let values = _isArray(children) ? children.join(', ') : children;

	return (
		<div className={classes}>
			<span className="worldCereal-MetadataInfoItemRec-label">{label}: </span>
			<span className="worldCereal-MetadataInfoItemRec-value">
				{values || '-'}
			</span>
		</div>
	);
};

MetadataInfoItemRec.propTypes = {
	children: PropTypes.node,
	label: PropTypes.string,
	small: PropTypes.bool,
};

const MetadataInfoItem = ({productMetadata, productTemplate}) => {
	const {
		product,
		season,
		sos,
		eos,
		aez,
		aez_group,
		id,
		model,
		public: isPublic,
		tiles,
	} = productMetadata;

	const productName = productTemplate?.data?.nameDisplay || product;
	const color = productTemplate?.data?.style?.rules?.[0]?.styles?.[0]?.color;

	const style = {
		borderColor: color,
	};

	return (
		<div className="worldCereal-MetadataInfoItem" style={style}>
			<div className="worldCereal-MetadataInfoItemHeader">
				<h4 className="worldCereal-MetadataInfoItemHeader-title">
					{productName} - zone {aez} - season {season}
				</h4>
				{/*<div className="worldCereal-MetadataInfoItemHeader-tools">*/}
				{/*	<Button*/}
				{/*		className="worldCereal-MetadataInfoItemHeader-download"*/}
				{/*		ghost*/}
				{/*		small*/}
				{/*		disabled*/}
				{/*		icon="download"*/}
				{/*	>*/}
				{/*		Download*/}
				{/*	</Button>*/}
				{/*</div>*/}
			</div>
			<div className="worldCereal-MetadataInfoItemBasics">
				<MetadataInfoItemRec label="Tile collection ID">
					{id}
				</MetadataInfoItemRec>
				<MetadataInfoItemRec label="product">{productName}</MetadataInfoItemRec>
				<MetadataInfoItemRec label="season">{season}</MetadataInfoItemRec>
				<MetadataInfoItemRec label="start of season">{sos}</MetadataInfoItemRec>
				<MetadataInfoItemRec label="end of season">{eos}</MetadataInfoItemRec>
				<MetadataInfoItemRec label="zone (AEZ)">{aez}</MetadataInfoItemRec>
				<MetadataInfoItemRec label="zone group">
					{aez_group}
				</MetadataInfoItemRec>
				<MetadataInfoItemRec label="public">{isPublic}</MetadataInfoItemRec>
				<MetadataInfoItemRec label="model">{model}</MetadataInfoItemRec>
			</div>
			<div className="worldCereal-MetadataInfoItemTiles">
				<div className="worldCereal-MetadataInfoItemTiles-header">
					Original data for S2 tiles:
				</div>
				<div className="worldCereal-MetadataInfoItemTiles-content">
					{tiles.map(tile => (
						<a
							key={tile.tile}
							target="_blank"
							rel="noopener noreferrer"
							href={tile.product}
						>
							{tile.tile}
						</a>
					))}
				</div>
			</div>
		</div>
	);
};

MetadataInfoItem.propTypes = {
	productMetadata: PropTypes.shape({
		aez: PropTypes.number,
		aez_group: PropTypes.number,
		eos: PropTypes.string,
		id: PropTypes.string,
		model: PropTypes.string,
		product: PropTypes.string,
		public: PropTypes.string,
		season: PropTypes.string,
		sos: PropTypes.string,
		tiles: PropTypes.array,
	}),
	productTemplate: PropTypes.shape({
		data: PropTypes.shape({
			nameDisplay: PropTypes.string,
			style: PropTypes.object,
		}),
	}),
};

export default MetadataInfoItem;
