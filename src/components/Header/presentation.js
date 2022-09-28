// eslint-disable-next-line no-unused-vars
import React from 'react';
import logoData from './logo';
import './style.scss';

const Header = () => {
	return (
		<div className="worldCereal-Header">
			<div className="worldCereal-Header-logo">
				<div>
					<img src={`data:image/jpeg;base64,${logoData}`} />
				</div>
				<h1>
					<span>World Cereal</span>
					<span>Product Viewer</span>
				</h1>
			</div>
			<div className="worldCereal-Header-tools"></div>
		</div>
	);
};

Header.propTypes = {};

export default Header;
