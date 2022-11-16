import PropTypes from 'prop-types';
import {useEffect} from 'react';

const StatisticLayerTooltip = ({
	areaShare,
	name,
	// areaTotal,
	ensureAbsoluteData,
}) => {
	useEffect(() => {
		ensureAbsoluteData();
	}, [name]);
	return (
		<div className={'VectorMapTooltip-layer'}>
			<h4>{name}</h4>
			<div>
				<label>Area share:</label>
				<div>{`${areaShare} %`}</div>
			</div>
			{/* <label>Total area:</label>
			<div>{`${areaTotal} %`}</div> */}
		</div>
	);
};

StatisticLayerTooltip.propTypes = {
	areaShare: PropTypes.string,
	areaTotal: PropTypes.string,
	name: PropTypes.string,
	ensureAbsoluteData: PropTypes.string,
};

export default StatisticLayerTooltip;
