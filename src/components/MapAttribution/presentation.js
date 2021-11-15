import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const MapAttribution = ({backgroundLayer}) => {
	return (
		<div className="worldCereal-MapAttribution">
			<a
				href="https://leafletjs.com/"
				target="_blank"
				rel="noreferrer noopener"
			>
				Leaflet
			</a>{' '}
			| Background map: {backgroundLayer?.attribution}
		</div>
	);
};

MapAttribution.propTypes = {
	backgroundLayerAttribution: PropTypes.element,
};

export default MapAttribution;
