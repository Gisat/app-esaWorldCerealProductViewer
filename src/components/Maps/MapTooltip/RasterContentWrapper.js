import {useState, useEffect, useRef, Children, cloneElement} from 'react';
import PropTypes from 'prop-types';
import {stateManagement} from '@gisatcz/ptr-utils';

import './style.scss';

const RasterContentWrapper = ({event, timeout = 200, children}) => {
	const timer = useRef();
	const componentsDataRef = useRef([]);
	const [coordsState, setCoordsState] = useState([null, null]);
	const [status, setStatus] = useState('HOVERING'); //HOVERING,PENDING,LOADING,RECEIVED,EMPTY
	const {x, y} = event || {};

	useEffect(() => {
		timer.current = setTimeout(() => setStatus('PENDING'), timeout);

		return () => {
			clearTimeout(timer.current);
		};
	}, []);

	useEffect(() => {
		clearTimeout(timer.current);
		setStatus('HOVERING');

		timer.current = setTimeout(() => setStatus('PENDING'), timeout);
		setCoordsState([x, y]);
	}, [x, y]);

	const updateStatus = () => {
		const childrenCount = Children.count(children);
		const lastRoundData =
			componentsDataRef.current[componentsDataRef.current.length - 1];
		const dataReceiveCount = lastRoundData.length;
		if (dataReceiveCount === childrenCount) {
			if (lastRoundData.every(d => !d)) {
				//all components return false, so nothing to display
				setStatus('EMPTY');
			} else {
				setStatus('RECEIVED');
			}
		} else {
			setStatus('LOADING');
		}
	};

	// Handler which should child component execute aftef success loading of getfeatureinfo.
	// If retrun true, then some data receive, and will be displayed, if false, then component will show nothing
	const onLoadEnd = (round, dataReceived) => {
		componentsDataRef.current[round].push(dataReceived);

		updateStatus();
	};
	const onLoadStart = round => {
		if (!componentsDataRef.current[round]) {
			componentsDataRef.current = stateManagement.addItemToIndex(
				componentsDataRef.current,
				round,
				[]
			);
		}
	};

	const getChildren = () => {
		switch (status) {
			case 'EMPTY':
				return <span className="info">Nothing received</span>;
			case 'LOADING':
			case 'RECEIVED':
			case 'PENDING':
				if (
					children &&
					Children.count(children) &&
					x === coordsState[0] &&
					y === coordsState[1]
				) {
					const childrens = Children.map(children, (child, i) =>
						cloneElement(child, {
							key: `${i}_${coordsState[0]}_${coordsState[1]}`,
							...child.props,
							x: coordsState[0],
							y: coordsState[1],
							onLoadEnd,
							onLoadStart,
							round: componentsDataRef.current.length,
						})
					);
					if (status === 'LOADING' || status === 'PENDING') {
						childrens.push(<span className="info">Loading...</span>);
					}
					return childrens;
				} else {
					return (
						<span className="info">Don&#39;t move cursor to get info</span>
					);
				}
			case 'HOVERING':
				return <span className="info">Don&#39;t move cursor to get info</span>;
		}
	};

	const childrenWithProps = getChildren();
	return childrenWithProps;
};

RasterContentWrapper.propTypes = {
	timeout: PropTypes.number,
	event: PropTypes.object,
	children: PropTypes.node,
};

export default RasterContentWrapper;
