import React from 'react';

import './style.scss';

const ProductFilterOption = ({
	value,
	count,
	parameterKey,
	selected,
	onValueChange,
}) => {
	return (
		<div className="worldCereal-ProductFilterOption">
			<input
				type="checkbox"
				disabled={count === 0}
				id={value}
				name={value}
				checked={selected}
				onChange={e => {
					onValueChange(value, e.target.checked);
				}}
			/>
			<label htmlFor={value}>
				{value} <span>({count})</span>
			</label>
		</div>
	);
};

export default ProductFilterOption;
