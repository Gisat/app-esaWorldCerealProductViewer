import PropTypes from 'prop-types';
import classNames from 'classnames';
import {createElement} from 'react';
import './style.scss';

export const IntroCardTitle = ({children}) => {
	return <h2 className="worldCereal-IntroCard-title">{children}</h2>;
};

IntroCardTitle.propTypes = {
	children: PropTypes.node,
};

export const IntroCardText = ({children}) => {
	return <span className="worldCereal-IntroCard-text">{children}</span>;
};

IntroCardText.propTypes = {
	children: PropTypes.node,
};

const IntroCard = ({disabled, Icon, children, href}) => {
	const classes = classNames('worldCereal-IntroCard', {
		'is-disabled': disabled,
	});
	return (
		<a href={href}>
			<div className={classes}>
				{Icon
					? createElement(Icon, {
							color: disabled ? 'rgb(110, 110, 110)' : 'rgb(239,180,9)',
							set: 'duotone',
							size: '50',
					  })
					: null}
				{children}
			</div>
		</a>
	);
};

IntroCard.propTypes = {
	disabled: PropTypes.bool,
	Icon: PropTypes.object,
	children: PropTypes.node,
	href: PropTypes.string,
};

export default IntroCard;
