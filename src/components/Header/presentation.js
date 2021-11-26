import React from 'react';
import PropTypes from 'prop-types';
import {Button, ButtonSwitch, ButtonSwitchOption} from '@gisatcz/ptr-atoms';

import StatusLabel from '../atoms/StatusLabel';
import {MAX_MAPS_IN_MAP_SET} from '../../constants/app';
import logo from '../../assests/logo.png';
import logoData from './logo';
import './style.scss';

class Header extends React.PureComponent {
	static propTypes = {
		addMap: PropTypes.func,
		mapSetMapKeys: PropTypes.array,
		showStatusInfo: PropTypes.bool,
		mapCompareMode: PropTypes.bool,
		setMapCompareMode: PropTypes.bool,
		mapsInUse: PropTypes.array,
	};

	constructor(props) {
		super(props);
	}

	render() {
		const {
			addMap,
			mapSetMapKeys,
			showStatusInfo,
			mapCompareMode,
			setMapCompareMode,
			mapsInUse,
		} = this.props;
		const mapsInMapSet = mapSetMapKeys?.length;

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
				<div className="worldCereal-Header-tools">
					<ButtonSwitch
						className="ptr-dark"
						ghost
						small
						onClick={setMapCompareMode}
						disabled={mapsInUse.length !== 2}
					>
						<ButtonSwitchOption value={true} active={mapCompareMode}>
							Slider
						</ButtonSwitchOption>
						<ButtonSwitchOption value={false} active={!mapCompareMode}>
							Map set
						</ButtonSwitchOption>
					</ButtonSwitch>
					<Button
						className="ptr-dark"
						onClick={addMap}
						ghost
						small
						icon="plus-thick"
						disabled={mapsInMapSet >= MAX_MAPS_IN_MAP_SET || mapCompareMode}
					>
						Add map
					</Button>
				</div>
			</div>
		);
	}
}

export default Header;
