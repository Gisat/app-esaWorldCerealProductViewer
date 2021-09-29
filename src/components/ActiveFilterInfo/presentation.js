import React from 'react';
import {Button} from '@gisatcz/ptr-atoms';
import RemovableLabel, {RemovableLabelContainer} from '../atoms/RemovableLabel';

import './style.scss';

const ActiveFilterInfo = ({
	activeFilterParameters,
	availableProductMetadata,
	onValueRemove,
	onClearAll,
}) => {
	let numOfFilters = 0;
	if (activeFilterParameters?.length) {
		activeFilterParameters.forEach(item => {
			if (item.values?.length) {
				numOfFilters += item.values.length;
			}
		});
	}

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
					{numOfFilters > 1 ? (
						<Button
							icon="times"
							className="worldCereal-ActiveFilterInfo-clearAllButton"
							small
							invisible
							onClick={e => {
								e.stopPropagation();
								onClearAll();
							}}
						>
							Clear all filters
						</Button>
					) : null}
				</RemovableLabelContainer>
			) : null}
		</div>
	);
};

export default ActiveFilterInfo;
