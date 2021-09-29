import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

export const MetadataInfoTitle = () => (
	<h3 className="worldCereal-MetadataInfoTitle">Product metadata</h3>
);

class MetadataInfo extends React.PureComponent {
	static propTypes = {
		productMetadata: PropTypes.object,
	};

	constructor(props) {
		super(props);
	}

	render() {
		const {productMetadata} = this.props;

		if (productMetadata) {
			const {product, season, sos, eos, aez, id} = productMetadata.data;

			return (
				<div className="worldCereal-MetadataInfo">
					<div className="worldCereal-MetadataInfoGrid">
						<div>
							<span>Product</span>
							<span>{product}</span>
						</div>
						<div>
							<span>Product ID</span>
							<span className="is-small">{id}</span>
						</div>
						<div>
							<span>Season</span>
							<span>{season}</span>
						</div>
						<div>
							<span>Start of season</span>
							<span>{sos}</span>
						</div>
						<div>
							<span>End of season</span>
							<span>{eos}</span>
						</div>
						<div>
							<span>AEZ</span>
							<span>{aez}</span>
						</div>
					</div>
				</div>
			);
		} else {
			return null;
		}
	}
}

export default MetadataInfo;
