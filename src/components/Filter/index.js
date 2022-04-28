import RetractableWindow from '../atoms/RetractableWindow';
import ActiveFilterInfo from './ActiveFilterInfo';
import ProductFilter from './ProductFilter';

import './style.scss';

const Filter = () => {
	return (
		<RetractableWindow
			className="worldCereal-FilterWindow ptr-dark"
			retracted
			centered
			bottomPosition={10}
			bodyHeight={14}
			controlBarContent={<ActiveFilterInfo />}
		>
			<ProductFilter />
		</RetractableWindow>
	);
};

export default Filter;
