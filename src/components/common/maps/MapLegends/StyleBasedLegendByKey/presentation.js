import PropTypes from 'prop-types';
import StyleBasedLegend from '../StyleBasedLegend';

const StyleBasedLegendByKey = ({
	style,
	styleKey,
	noData,
	title,
	unit,
	active,
}) => {
	return active ? (
		<StyleBasedLegend
			style={style}
			styleKey={styleKey}
			noData={noData}
			title={title}
			unit={unit}
		/>
	) : null;
};

StyleBasedLegendByKey.propTypes = {
	style: PropTypes.object,
	styleKey: PropTypes.object,
	noData: PropTypes.bool,
	title: PropTypes.string,
	unit: PropTypes.string,
	active: PropTypes.bool,
};

export default StyleBasedLegendByKey;
