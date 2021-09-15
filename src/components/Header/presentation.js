import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {Button} from '@gisatcz/ptr-atoms';

import logo from '../../assests/logo_circle.png';

import './style.scss';

class Header extends React.PureComponent {
	static propTypes = {
		addMap: PropTypes.func,
	};

	constructor(props) {
		super(props);
	}

	render() {
		const {addMap} = this.props;

		return (
			<div className="worldCereal-Header">
				<div className="worldCereal-Header-logo">
					<div>
						<img src={logo} />
						<span>World Cereal</span>
					</div>
					<h1>Product Viewer</h1>
				</div>
				<div className="worldCereal-Header-tools">
					<Button onClick={addMap} ghost inverted icon="plus">
						Add map
					</Button>
				</div>
			</div>
		);
	}
}

export default Header;
