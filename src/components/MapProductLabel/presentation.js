import React from 'react';
import {Button, Icon} from '@gisatcz/ptr-atoms';

import './style.scss';

export const MapProductLabelContainer = ({children}) => (
	<div className="worldCereal-MapProductLabelContainer">{children}</div>
);

class MapProductLabel extends React.PureComponent {
	render() {
		const {productMetadata, productTemplate} = this.props;
		if (productMetadata) {
			const {product, sos, eos, aez_id} = productMetadata.data;
			const color =
				productTemplate?.data?.style?.rules?.[0]?.styles?.[0]?.color;

			return (
				<div className="worldCereal-MapProductLabel">
					<Button
						className="worldCereal-MapProductLabel-button"
						small
						secondary
					>
						<div className="ptr-button-content" style={{borderColor: color}}>
							<div className="worldCereal-MapProductLabel-button-caption-header">
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
					</Button>
				</div>
			);
		} else {
			return null;
		}
	}
}

export default MapProductLabel;
