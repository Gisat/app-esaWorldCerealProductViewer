import PropTypes from 'prop-types';
import {Toggle} from '@gisatcz/ptr-atoms';
import {ProductLabelBodyItem} from '../presentation';

const ConfidenceLayerControl = ({active, onChange}) => {
	return (
		<ProductLabelBodyItem
			title="Confidence layer"
			key="confidence"
			onClick={() => onChange(!active)}
		>
			<Toggle className="ptr-dark" notInteractive on={active} />
		</ProductLabelBodyItem>
	);
};

ConfidenceLayerControl.propTypes = {
	active: PropTypes.bool,
	onChange: PropTypes.func,
};

export default ConfidenceLayerControl;
