import React from 'react';

import './style.scss';

const ProductFilterOption = ({
	value,
	parameterKey,
	selected,
	onValueChange,
}) => {
	return (
		<div className="worldCereal-ProductFilterOption">
			<input
				type="checkbox"
				id={value}
				name={value}
				checked={selected}
				onChange={e => {
					onValueChange(value, e.target.checked);
				}}
			/>
			<label htmlFor={value}>{value}</label>
		</div>
	);
};

export default ProductFilterOption;
