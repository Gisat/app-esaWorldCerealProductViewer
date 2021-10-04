import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {isArray as _isArray} from 'lodash';

import './style.scss';
import {Button, Icon} from '@gisatcz/ptr-atoms';

export const MetadataInfoTitle = () => (
	<h3 className="worldCereal-MetadataInfoTitle">Product metadata</h3>
);

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

class MetadataInfoItem extends React.PureComponent {
	static propTypes = {
		productMetadata: PropTypes.array,
	};

	constructor(props) {
		super(props);
	}

	render() {
		const {productMetadata, productTemplate} = this.props;

		const {
			product,
			season,
			sos,
			eos,
			aez,
			id,
			users,
			public: isPublic,
			relatedProducts,
			type,
			meta,
		} = productMetadata;

		const color = productTemplate?.data?.style?.rules?.[0]?.styles?.[0]?.color;

		const style = {
			borderColor: color,
		};

		return (
			<div className="worldCereal-MetadataInfoItem" style={style}>
				<div className="worldCereal-MetadataInfoItemHeader">
					<h4 className="worldCereal-MetadataInfoItemHeader-title">{id}</h4>
					<div className="worldCereal-MetadataInfoItemHeader-tools">
						<Button
							className="worldCereal-MetadataInfoItemHeader-download"
							ghost
							small
							disabled
							icon="download"
						>
							Download
						</Button>
					</div>
				</div>
				<div className="worldCereal-MetadataInfoItemBasics">
					<MetadataInfoItemRec label="product ID">{id}</MetadataInfoItemRec>
					<MetadataInfoItemRec label="product">
						{productTemplate?.data?.nameDisplay || product}
					</MetadataInfoItemRec>
					<MetadataInfoItemRec label="season">{season}</MetadataInfoItemRec>
					<MetadataInfoItemRec label="start of season">
						{sos}
					</MetadataInfoItemRec>
					<MetadataInfoItemRec label="end of season">{eos}</MetadataInfoItemRec>
					<MetadataInfoItemRec label="zone (AEZ)">{aez}</MetadataInfoItemRec>
					<MetadataInfoItemRec label="type">{type}</MetadataInfoItemRec>
					<MetadataInfoItemRec label="public">{isPublic}</MetadataInfoItemRec>
					<MetadataInfoItemRec label="related products">
						{relatedProducts}
					</MetadataInfoItemRec>
				</div>
			</div>
		);
	}
}

export default MetadataInfoItem;
