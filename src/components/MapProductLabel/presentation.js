import React from 'react';
import {Button, Icon} from '@gisatcz/ptr-atoms';

import './style.scss';

export const MapProductLabelContainer = ({children}) => (
	<div className="worldCereal-MapProductLabelContainer">{children}</div>
);

class MapProductLabel extends React.PureComponent {
	render() {
		const {productMetadata, productTemplates} = this.props;
		if (productMetadata) {
			const {product, sos, eos, aez_id} = productMetadata.data;
			const template = productTemplates[product]?.data;

			return (
				<div className="worldCereal-MapProductLabel">
					<Button
						className="worldCereal-MapProductLabel-button"
						small
						secondary
					>
						<>
							<div className="worldCereal-MapProductLabel-button-caption-header">
								{template?.icon ? <Icon icon={template.icon} /> : null}
								<div>
									<span className="worldCereal-MapProductLabel-product">
										{template?.nameDisplay || product}
									</span>
									<span className="worldCereal-MapProductLabel-zone">
										(zone {aez_id})
									</span>
								</div>
							</div>
							<div className="worldCereal-MapProductLabel-period">
								{sos} / {eos}
							</div>
						</>
					</Button>
				</div>
			);
		} else {
			return null;
		}
	}
}

export default MapProductLabel;
