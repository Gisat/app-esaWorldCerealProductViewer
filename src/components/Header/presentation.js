import PropTypes from 'prop-types';
import {Button} from '@gisatcz/ptr-atoms';

import {MAX_MAPS_IN_MAP_SET} from '../../constants/app';
import logoData from './logo';
import './style.scss';

const Header = ({addMap, mapSetMapKeys}) => {
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
				{/*{showStatusInfo ? (*/}
				{/*	<StatusLabel small status="warning">*/}
				{/*		Zoom in to work with layers!*/}
				{/*	</StatusLabel>*/}
				{/*) : null}*/}
				<Button
					className="ptr-dark"
					onClick={addMap}
					ghost
					small
					icon="plus-thick"
					disabled={mapsInMapSet >= MAX_MAPS_IN_MAP_SET}
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
};

export default Header;
