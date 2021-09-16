import React from 'react';
import {Button, Icon} from '@gisatcz/ptr-atoms';

import './style.scss';

export const MapProductLabelContainer = ({children}) => (
	<div className="worldCereal-MapProductLabelContainer">{children}</div>
);

class MapProductLabel extends React.PureComponent {
	render() {
		const {productMetadata, productTemplate, onProductRemove} = this.props;
		if (productMetadata) {
			const {product, sos, eos, aez_id} = productMetadata.data;
			const borderColor =
				productTemplate?.data?.style?.rules?.[0]?.styles?.[0]?.color;

			return (
				<div className="worldCereal-MapProductLabel" style={{borderColor}}>
					<div className="worldCereal-MapProductLabel-content">
						<div className="worldCereal-MapProductLabel-header">
							{productTemplate?.data?.icon ? (
								<Icon icon={productTemplate.data.icon} />
							) : null}
							<div>
								<span className="worldCereal-MapProductLabel-product">
									{productTemplate?.data?.nameDisplay || product}
								</span>
								<span className="worldCereal-MapProductLabel-zone">
									(zone {aez_id})
								</span>
							</div>
						</div>
						<div className="worldCereal-MapProductLabel-period">
							{sos} / {eos}
						</div>
					</div>
					<Button
						className="worldCereal-MapProductLabel-button"
						side="left"
						icon="close"
						small
						invisible
						onClick={onProductRemove}
					/>
				</div>
			);
		} else {
			return null;
		}
	}
}

export default MapProductLabel;
