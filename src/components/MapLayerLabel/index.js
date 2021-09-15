import React from 'react';
import {Button} from '@gisatcz/ptr-atoms';

import './style.scss';

export const MapLayerLabelContainer = ({children}) => (
	<div className="worldCereal-MapLayerLabelContainer">{children}</div>
);

const MapLayerLabel = props => {
	return (
		<div className="worldCereal-MapLayerLabel">
			<Button
				className="worldCereal-MapLayerLabel-button"
				small
				secondary
				icon="crop"
			>
				{props.product} ({props.sos}/{props.eos}) AEZ: {props.aez_id}
			</Button>
		</div>
	);
};

export default MapLayerLabel;
