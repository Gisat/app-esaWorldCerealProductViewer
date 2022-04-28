import PropTypes from 'prop-types';
import MetadataInfoItem from './MetadataItem';

import './style.scss';

export const MetadataInfoTitle = () => (
	<h3 className="worldCereal-MetadataInfoTitle">Tile collection metadata</h3>
);

const MetadataInfo = ({productMetadata}) => {
	if (productMetadata.length) {
		return (
			<div className="worldCereal-MetadataInfo">
				{productMetadata.map(productMetadataItem => {
					return (
						<MetadataInfoItem
							key={productMetadataItem.key}
							productMetadata={productMetadataItem?.data}
						/>
					);
				})}
			</div>
		);
	} else {
		return null;
	}
};

MetadataInfo.propTypes = {
	productMetadata: PropTypes.array,
};

export default MetadataInfo;
