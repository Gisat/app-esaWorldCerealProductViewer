import PropTypes from 'prop-types';
import logoData from '../Header/logo';
import './style.scss';

const Title = ({title}) => {
	return (
		<a href={'/'} style={{textDecoration: 'none'}}>
			<div className="worldCereal-Title">
				<div>
					<img src={`data:image/jpeg;base64,${logoData}`} />
				</div>
				<h1>
					<span>WorldCereal</span>
					<span>{title}</span>
				</h1>
			</div>
		</a>
	);
};

Title.propTypes = {
	className: PropTypes.string,
	openOverlay: PropTypes.func,
	title: PropTypes.string,
};

export default Title;
