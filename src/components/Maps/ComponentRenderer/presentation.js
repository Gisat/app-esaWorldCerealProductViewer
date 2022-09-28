import PropTypes from 'prop-types';
import {cloneElement} from 'react';

const ComponentRenderer = ({renderComponent, children, ...restProps}) => {
	const isActive = restProps.componentConfiguration?.active;
	if (isActive) {
		if (renderComponent) {
			return renderComponent(restProps);
		} else {
			return cloneElement(children, restProps);
		}
	} else {
		return null;
	}
};

ComponentRenderer.propTypes = {
	children: PropTypes.node,
	renderComponent: PropTypes.func,
};

export default ComponentRenderer;
