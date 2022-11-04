import PropTypes from 'prop-types';
import RasterMapTooltip from './RasterMapTooltip';
import RasterContentWrapper from './RasterContentWrapper';
import VectorMapTooltip from './VectorMapTooltip';
import './style.scss';

const MapTooltip = ({children, event, raster, vector}) => {
	const vectorContent = [];
	const rasterContent = [];
	let i = 0;
	for (const vectorLayer of vector) {
		// vector tooltip should come here
		vectorContent.push(
			<VectorMapTooltip
				key={`${i}_${
					vectorLayer.layer.props.layerKey || vectorLayer.layer.props.key
				}`}
				{...{layer: vectorLayer, event}}
			></VectorMapTooltip>
		);
		i++;
	}
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
			{raster?.length > 0 ? (
				<RasterContentWrapper {...{event}}>
					{rasterContent}
				</RasterContentWrapper>
			) : null}
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
