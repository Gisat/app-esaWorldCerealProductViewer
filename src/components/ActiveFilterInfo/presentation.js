import React from 'react';
import RemovableLabel, {RemovableLabelContainer} from '../atoms/RemovableLabel';

import './style.scss';

const ActiveFilterInfo = ({
	activeFilterParameters,
	availableProductMetadata,
}) => {
	return (
		<div className="worldCereal-ActiveFilterInfo">
			<div className="worldCereal-ActiveFilterInfo-summary">
				<em>{availableProductMetadata?.length || 0}</em> filtered products
			</div>
			{activeFilterParameters ? (
				<RemovableLabelContainer className="worldCereal-ActiveFilterInfo-filters">
					{activeFilterParameters.map(item => {
						return item.values.map(value => (
							<RemovableLabel
								small
								onRemove={e => {
									e.stopPropagation();
								}}
							>
								{item.parameter.name}: {value}
							</RemovableLabel>
						));
					})}
				</RemovableLabelContainer>
			) : null}
		</div>
	);
};

export default ActiveFilterInfo;
