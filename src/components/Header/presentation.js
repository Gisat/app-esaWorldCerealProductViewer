// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import {Button, ButtonSwitch, ButtonSwitchOption} from '@gisatcz/ptr-atoms';

import {MAX_MAPS_IN_MAP_SET} from '../../constants/app';
import logoData from './logo';
import './style.scss';

const Header = ({addMap, mapSetMapKeys, mapsMode, setMapsMode}) => {
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
					onClick={setMapsMode}
					disabled={mapsInMapSet !== 2}
				>
					<ButtonSwitchOption
						className="worldCereal-MapsModeOption-compare"
						value="compare"
						active={mapsMode === 'compare'}
						icon="expand"
					>
						Compare mode
					</ButtonSwitchOption>
					<ButtonSwitchOption
						value="set"
						active={mapsMode === 'set'}
						icon="tilt-less"
					>
						Set mode
					</ButtonSwitchOption>
				</ButtonSwitch>
				<Button
					className="ptr-dark"
					onClick={addMap}
					ghost
					small
					icon="plus-thick"
					disabled={
						mapsInMapSet >= MAX_MAPS_IN_MAP_SET || mapsMode === 'compare'
					}
				>
					Add map
				</Button>
			</div>
		</div>
	);
};

Header.propTypes = {
	addMap: PropTypes.func,
	mapSetMapKeys: PropTypes.array,
	mapsMode: PropTypes.string,
	setMapsMode: PropTypes.func,
};

export default Header;
