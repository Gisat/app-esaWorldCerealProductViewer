import React from 'react';
import PageSwitcher, {
	PageSwitcherContent,
	PageSwitcherMenu,
	PageSwitcherMenuItem,
	PageSwitcherPage,
} from '../atoms/PageSwitcher';
import ProductFilterParameter from './ProductFilterParameter/presentation';

import './style.scss';

const ProductFilter = ({filterParameters}) => {
	return (
		<PageSwitcher className="worldCereal-Filter">
			<PageSwitcherMenu>
				{filterParameters
					? filterParameters.map((item, i) => (
							<PageSwitcherMenuItem
								key={item.key}
								pageKey={item.key}
								active={i === 0}
							>
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
