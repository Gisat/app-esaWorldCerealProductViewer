import React from 'react';
import PageSwitcher, {
	PageSwitcherContent,
	PageSwitcherMenu,
	PageSwitcherMenuItem,
	PageSwitcherPage,
} from '../atoms/PageSwitcher';
import ProductFilterParameter from './ProductFilterParameter/presentation';

import './style.scss';

const ProductFilter = ({filterParameters, activeParameter}) => {
	return (
		<PageSwitcher className="worldCereal-Filter" activeKey={activeParameter}>
			<PageSwitcherMenu>
				{filterParameters
					? filterParameters.map(item => (
							<PageSwitcherMenuItem key={item.key} pageKey={item.key}>
								{item.name}
							</PageSwitcherMenuItem>
					  ))
					: null}
			</PageSwitcherMenu>
			<PageSwitcherContent>
				{filterParameters
					? filterParameters.map((item, i) => (
							<PageSwitcherPage key={item.key} pageKey={item.key}>
								<ProductFilterParameter parameterKey={item.key} {...item} />
							</PageSwitcherPage>
					  ))
					: null}
			</PageSwitcherContent>
		</PageSwitcher>
	);
};

export default ProductFilter;
