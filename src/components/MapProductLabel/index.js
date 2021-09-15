import React from 'react';
import {Button} from '@gisatcz/ptr-atoms';

import './style.scss';

export const MapProductLabelContainer = ({children}) => (
	<div className="worldCereal-MapProductLabelContainer">{children}</div>
);

const MapProductLabel = props => {
	return (
		<div className="worldCereal-MapProductLabel">
			<Button
				className="worldCereal-MapProductLabel-button"
				small
				secondary
				icon="crop"
			>
				{props.product} ({props.sos}/{props.eos}) AEZ: {props.aez_id}
			</Button>
		</div>
	);
};

export default MapProductLabel;
