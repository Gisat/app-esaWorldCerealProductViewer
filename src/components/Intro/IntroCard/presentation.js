import PropTypes from 'prop-types';
import './style.scss';
import classNames from 'classnames';

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

const IntroCard = ({disabled, onClick, children}) => {
	const classes = classNames('worldCereal-IntroCard', {
		'is-disabled': disabled,
	});
	return (
		<div className={classes} onClick={onClick}>
			{children}
		</div>
	);
};

IntroCard.propTypes = {
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
	children: PropTypes.node,
};

export default IntroCard;
