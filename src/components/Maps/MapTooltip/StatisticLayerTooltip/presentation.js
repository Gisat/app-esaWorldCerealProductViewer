import PropTypes from 'prop-types';
import {useEffect} from 'react';

const StatisticLayerTooltip = ({
	areaShare,
	name,
	// areaTotal,
	ensureAbsoluteData,
	relativeAttributeName,
}) => {
	useEffect(() => {
		ensureAbsoluteData();
	}, [name]);
	return (
		<div className={'VectorMapTooltip-layer'}>
			<h4>{name}</h4>
			<div>
				{areaShare ? (
					<>
						<div className="VectorMapTooltip-attribute">
							{relativeAttributeName}:{' '}
						</div>
						<div className="VectorMapTooltip-value">{`${areaShare} %`}</div>
					</>
				) : null}
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
	relativeAttributeName: PropTypes.string,
};

export default StatisticLayerTooltip;
