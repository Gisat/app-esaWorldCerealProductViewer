import PropTypes from 'prop-types';

const VectorMapTooltip = ({layer}) => {
	return (
		<div className={'VectorMapTooltip-layer'}>
			<label>Zone:</label>
			<div>{layer?.object?.properties?.zoneID}</div>
		</div>
	);
};

VectorMapTooltip.propTypes = {
	layer: PropTypes.object,
};

export default VectorMapTooltip;
