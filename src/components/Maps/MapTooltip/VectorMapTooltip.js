import PropTypes from 'prop-types';
import StatisticLayerTooltip from './StatisticLayerTooltip';
import {STATISTICSLAYERKEY, AEZLAYERKEY} from '../../../constants/app';

const VectorMapTooltip = ({layer}) => {
	const layerKey = layer?.sourceLayer?.props?.layerKey;

	switch (layerKey) {
		case STATISTICSLAYERKEY:
			return <StatisticLayerTooltip layer={layer} />;
		case AEZLAYERKEY:
			return (
				<div className={'VectorMapTooltip-layer'}>
					<div>
						<label>Zone:</label>
						<div>{layer?.object?.properties?.zoneID}</div>
					</div>
				</div>
			);

		default:
			return null;
	}
};

VectorMapTooltip.propTypes = {
	layer: PropTypes.object,
};

export default VectorMapTooltip;
