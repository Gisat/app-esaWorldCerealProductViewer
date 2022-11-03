import PropTypes from 'prop-types';

const VectorMapTooltip = ({layer}) => {
	return (
		<div className={'VectorMapTooltip-layer'}>
			<span className="VectorMapTooltip-header">Zone</span>
			<span className="VectorMapTooltip-value">
				<label>zone ID</label>:{layer?.object?.properties?.zoneID}
			</span>
		</div>
	);
};

VectorMapTooltip.propTypes = {
	layer: PropTypes.object,
};

export default VectorMapTooltip;
