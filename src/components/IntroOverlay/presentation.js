import PropTypes from 'prop-types';
import classNames from 'classnames';
import Intro from '../Intro';
import './style.scss';

const IntroOverlay = ({closeOverlay, open}) => {
	const classes = classNames('worldCereal-IntroOverlay', {
		'is-open': open,
	});

	return (
		<div className={classes}>
			<Intro closeOverlay={closeOverlay} />
		</div>
	);
};

IntroOverlay.propTypes = {
	closeOverlay: PropTypes.func,
	open: PropTypes.bool,
};

export default IntroOverlay;
