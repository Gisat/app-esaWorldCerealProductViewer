import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import {TourProvider} from '@reactour/tour';

import steps from './steps';

import './style.scss';

const AppTour = ({
	children,

	activeView,
	introOverlayIsOpen,

	openIntroOverlay,
	redirectToDetailedView,
	redirectToGlobalView,

	controlTourGuide,
	activateDefaultLayer,
	expandProductLabel,
	expandFilterWindow,
	removeAllFilters,
	addDefaultFilter,
	zoomInMap,

	activeFilters,
	activeMap,
}) => {
	const [openTour, setOpenTour] = useState(false);
	const [step, setStep] = useState(0);
	const [openMapLayer, setOpenMapLayer] = useState(false);

	const style = {
		popover: base => ({
			...base,
			maxWidth: '90%',
			'--reactour-accent': 'rgb(233, 177, 22)',
		}),
		badge: base => ({
			...base,
			backgroundColor: 'rgb(233, 177, 22)',
			color: 'black',
		}),
	};

	// on tour open
	const setTourIsOpen = () => {
		// set the current step depending on the user's location
		if (introOverlayIsOpen) {
			setStep(0);
		} else if (activeView?.data?.nameInternal === 'detailedExploration') {
			setStep(2);
		} else if (activeView?.data?.nameInternal === 'globalView') {
			setStep(7);
		}

		// if default layer is already added to the map
		if (
			activeMap?.data?.layers?.length > 0 &&
			activeView?.data?.nameInternal === 'detailedExploration' &&
			!openMapLayer
		) {
			setOpenMapLayer(true);
			activeMap?.data?.layers
				.map(layer => {
					return layer.layerKey === 'b8ae22a1-5444-52db-bcd3-096faf2315cc';
				})
				.includes(true)
				? null
				: activateDefaultLayer();
		} else {
			setOpenMapLayer(false);
		}

		removeAllFilters();
		setOpenTour(true);
		controlTourGuide(true);
	};

	// add or remove default layer
	if (
		!openMapLayer &&
		activeView?.data?.nameInternal === 'detailedExploration' &&
		!introOverlayIsOpen &&
		openTour
	) {
		activateDefaultLayer();
		setOpenMapLayer(true);
	} else if (
		openMapLayer &&
		activeView?.data?.nameInternal === 'globalView' &&
		!introOverlayIsOpen &&
		openTour
	) {
		// layers get removed just by changing views
		setOpenMapLayer(false);
	} else if (openMapLayer && introOverlayIsOpen && openTour) {
		activateDefaultLayer();
		setOpenMapLayer(false);
	}

	const setCurrentStep = step => {
		switch (step) {
			case 0:
				openIntroOverlay(true);
				expandProductLabel(false);
				expandFilterWindow(false);
				removeAllFilters();
				break;
			case 1:
				openIntroOverlay(true);
				expandProductLabel(false);
				expandFilterWindow(false);
				removeAllFilters();
				break;
			case 2:
				openIntroOverlay(false);
				redirectToDetailedView();
				expandProductLabel(false);
				expandFilterWindow(false);
				removeAllFilters();
				break;
			case 3:
				openIntroOverlay(false);
				redirectToDetailedView();
				expandProductLabel(false);
				expandFilterWindow(false);
				removeAllFilters();
				break;
			case 4:
				openIntroOverlay(false);
				redirectToDetailedView();
				expandProductLabel(true);
				expandFilterWindow(false);
				removeAllFilters();
				break;
			case 5:
				openIntroOverlay(false);
				redirectToDetailedView();
				expandProductLabel(false);
				expandFilterWindow(false);
				removeAllFilters();
				break;
			case 6:
				openIntroOverlay(false);
				redirectToDetailedView();
				expandProductLabel(false);
				expandFilterWindow(true);
				break;
			case 7:
				openIntroOverlay(false);
				redirectToGlobalView();
				expandProductLabel(false);
				expandFilterWindow(false);
				break;
			default:
				break;
		}
		setStep(step);
	};

	// when the user skips directly to the 6th step, in order to add the default filter (4,5,6 for zoom in the map),
	// it is necessary to wait for the active filters to get set, otherwise the filters get cleaned up.
	// I found out that it is just fine to wait for the active layer and then set the default filter.
	useEffect(() => {
		if (
			(step === 4 || step === 5) &&
			!activeFilters?.product?.length > 0 &&
			openTour
		) {
			zoomInMap();
		} else if (step === 6 && !activeFilters?.product?.length > 0 && openTour) {
			zoomInMap();
			addDefaultFilter();
		}
	}, [step, activeMap]);

	const getTourPadding = () => {
		if (step === 3) {
			return {popover: [12, 12]};
		} else if (step === 6) {
			return {mask: [-1, 165], popover: [13, 85.5]};
		} else {
			return {popover: [13, 8]};
		}
	};

	return (
		<TourProvider
			styles={style}
			steps={steps}
			currentStep={step}
			setCurrentStep={setCurrentStep}
			afterOpen={setTourIsOpen}
			beforeClose={() => {
				// clean up
				setOpenTour(false);
				setOpenMapLayer(false);
				expandProductLabel(false);
				expandFilterWindow(false);
				removeAllFilters();
				controlTourGuide(false);
			}}
			padding={getTourPadding()}
		>
			{children}
		</TourProvider>
	);
};

AppTour.propTypes = {
	children: PropTypes.node,
	openIntroOverlay: PropTypes.func,
	redirectToDetailedView: PropTypes.func,
	redirectToGlobalView: PropTypes.func,
	activeView: PropTypes.object,
	introOverlayIsOpen: PropTypes.bool,
	activateDefaultLayer: PropTypes.func,
	expandProductLabel: PropTypes.func,
	activeMap: PropTypes.object,
	expandFilterWindow: PropTypes.func,
	removeAllFilters: PropTypes.func,
	addDefaultFilter: PropTypes.func,
	controlTourGuide: PropTypes.func,
	activeFilters: PropTypes.object,
	zoomInMap: PropTypes.func,
};

export default AppTour;
