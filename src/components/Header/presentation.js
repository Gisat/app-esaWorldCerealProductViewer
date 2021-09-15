import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {Button} from '@gisatcz/ptr-atoms';

import {MAX_MAPS_IN_MAP_SET} from '../../constants/app';
import logo from '../../assests/logo_circle.png';

import './style.scss';

class Header extends React.PureComponent {
	static propTypes = {
		addMap: PropTypes.func,
		mapSetMapKeys: PropTypes.array,
	};

	constructor(props) {
		super(props);
	}

	render() {
		const {addMap, mapSetMapKeys} = this.props;
		const mapsInMapSet = mapSetMapKeys?.length;

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
					<Button
						className="ptr-dark"
						onClick={addMap}
						ghost
						icon="plus"
						disabled={mapsInMapSet >= MAX_MAPS_IN_MAP_SET}
					>
						Add map
					</Button>
				</div>
			</div>
		);
	}
}

export default Header;
