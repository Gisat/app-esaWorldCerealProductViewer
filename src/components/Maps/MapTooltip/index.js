import PropTypes from 'prop-types';
import RasterMapTooltip from './RasterMapTooltip';
import RasterContentWrapper from './RasterContentWrapper';
import './style.scss';

const MapTooltip = ({children, event, raster}) => {
	const vectorContent = [];
	const rasterContent = [];
	// for (const vectorLayer of vector) {
	// vector tooltip should come here
	// }
	for (const rasterLayer of raster) {
		rasterContent.push(
			<RasterMapTooltip
				key={rasterLayer.layer.props.layerKey || rasterLayer.layer.props.key}
				{...{layer: rasterLayer, event}}
			>
				{children}
			</RasterMapTooltip>
		);
	}
	return (
		<div>
			{vectorContent}
			<RasterContentWrapper {...{event}}>{rasterContent}</RasterContentWrapper>
		</div>
	);
};

MapTooltip.propTypes = {
	event: PropTypes.object,
	vector: PropTypes.array,
	raster: PropTypes.array,

	children: PropTypes.node,
};

export default MapTooltip;
