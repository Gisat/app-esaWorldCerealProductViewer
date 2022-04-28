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
		merged,
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
			</div>
			<div className="worldCereal-MetadataInfoItemBasics">
				{tiles ? (
					<MetadataInfoItemRec label="Tile collection ID">
						{id}
					</MetadataInfoItemRec>
				) : (
					<MetadataInfoItemRec label="ID">{merged.id}</MetadataInfoItemRec>
				)}
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
			{tiles ? (
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
			) : (
				<div className="worldCereal-MetadataInfoItemTiles">
					<div className="worldCereal-MetadataInfoItemTiles-header">
						Download original data:
					</div>
					<div className="worldCereal-MetadataInfoItemTiles-content">
						<a target="_blank" rel="noopener noreferrer" href={merged.product}>
							{merged.id}
						</a>
					</div>
				</div>
			)}
		</div>
	);
};

MetadataInfoItem.propTypes = {
	productMetadata: PropTypes.array,
	productTemplate: PropTypes.object,
};

export default MetadataInfoItem;
