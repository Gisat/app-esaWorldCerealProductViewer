import {connect} from '@gisatcz/ptr-state';
import Presentation from './presentation';
import Select from '../../../../../state/Select';
import {STATISTICSLAYERKEY} from '../../../../../constants/app';

const mapStateToProps = (state, ownProps) => {
	const styleKey =
		Select.worldCereal.statistics.getStyleKeyForActiveMapAndLayerKey(
			state,
			ownProps.mapKey,
			STATISTICSLAYERKEY
		);
	const style = Select.styles.getByKey(state, styleKey);

	return {
		styleKey,
		style,
	};
};

const mapDispatchToProps = () => {};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
