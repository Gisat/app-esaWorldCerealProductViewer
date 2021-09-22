import React from 'react';
import RemovableLabel, {RemovableLabelContainer} from '../atoms/RemovableLabel';

import './style.scss';

const ActiveFilterInfo = ({
	activeFilterParameters,
	availableProductMetadata,
	onValueRemove,
}) => {
	return (
		<div className="worldCereal-ActiveFilterInfo">
			<div className="worldCereal-ActiveFilterInfo-summary">
				<em>{availableProductMetadata?.length || 0}</em> filtered product
				{availableProductMetadata?.length > 1 ? 's' : ''}
			</div>
			{activeFilterParameters ? (
				<RemovableLabelContainer className="worldCereal-ActiveFilterInfo-filters">
					{activeFilterParameters.map(item => {
						return (
							<React.Fragment key={item.key}>
								{item.values.map(value => {
									const valueKey = value.key || value;
									const valueName = value.data?.nameDisplay || value;

									return (
										<RemovableLabel
											key={valueKey}
											small
											onRemove={e => {
												e.stopPropagation();
												onValueRemove(item.parameter.key, valueKey);
											}}
										>
											{item.parameter.name}: {valueName}
										</RemovableLabel>
									);
								})}
							</React.Fragment>
						);
					})}
				</RemovableLabelContainer>
			) : null}
		</div>
	);
};

export default ActiveFilterInfo;
