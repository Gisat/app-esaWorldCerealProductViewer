import React from 'react';
import PageSwitcher, {
	PageSwitcherContent,
	PageSwitcherMenu,
	PageSwitcherMenuItem,
	PageSwitcherPage,
} from '../atoms/PageSwitcher';

import './style.scss';

const ProductFilter = ({filterParameters}) => {
	return (
		<PageSwitcher className="worldCereal-Filter">
			<PageSwitcherMenu>
				{filterParameters
					? filterParameters.map((item, i) => (
							<PageSwitcherMenuItem pageKey={item.key} active={i === 0}>
								{item.name}
							</PageSwitcherMenuItem>
					  ))
					: null}
			</PageSwitcherMenu>
			<PageSwitcherContent>
				{filterParameters
					? filterParameters.map((item, i) => (
							<PageSwitcherPage pageKey={item.key}>
								{item.name}
							</PageSwitcherPage>
					  ))
					: null}
			</PageSwitcherContent>
		</PageSwitcher>
	);
};

export default ProductFilter;
