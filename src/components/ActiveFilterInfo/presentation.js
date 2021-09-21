import React from 'react';

import './style.scss';

const AvailableFilterInfo = ({availableProductMetadata}) => {
	return (
		<div className="worldCereal-ActiveFilterInfo">
			{availableProductMetadata?.length || 0} filtered products
		</div>
	);
};

export default AvailableFilterInfo;
