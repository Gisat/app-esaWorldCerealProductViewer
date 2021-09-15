import React from 'react';
import {Button} from '@gisatcz/ptr-atoms';

import './style.scss';

export const MapProductLabelContainer = ({children}) => (
	<div className="worldCereal-MapProductLabelContainer">{children}</div>
);

class MapProductLabel extends React.PureComponent {
	render() {
		const {productMetadata} = this.props;
		if (productMetadata) {
			const {product, sos, eos, aez_id} = productMetadata.data;

			return (
				<div className="worldCereal-MapProductLabel">
					<Button
						className="worldCereal-MapProductLabel-button"
						small
						secondary
						icon="crop"
					>
						{product} ({sos}/{eos}) AEZ: {aez_id}
					</Button>
				</div>
			);
		} else {
			return null;
		}
	}
}

export default MapProductLabel;
