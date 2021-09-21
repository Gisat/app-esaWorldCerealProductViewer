import React from 'react';
import RemovableLabel, {RemovableLabelContainer} from '../atoms/RemovableLabel';

import './style.scss';

const ActiveFilterInfo = ({availableProductMetadata}) => {
	return (
		<div className="worldCereal-ActiveFilterInfo">
			<div className="worldCereal-ActiveFilterInfo-summary">
				<em>{availableProductMetadata?.length || 0}</em> filtered products
			</div>
			<RemovableLabelContainer className="worldCereal-ActiveFilterInfo-filters">
				<RemovableLabel
					small
					onRemove={e => {
						e.stopPropagation();
					}}
				>
					Filter
				</RemovableLabel>
				<RemovableLabel
					small
					onRemove={e => {
						e.stopPropagation();
					}}
				>
					Filter 2
				</RemovableLabel>
			</RemovableLabelContainer>
		</div>
	);
};

export default ActiveFilterInfo;
