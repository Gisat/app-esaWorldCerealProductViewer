import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import {TourProvider} from '@reactour/tour';

import steps from './steps';

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
	addDefaultFillter,

	activeFilters,
	activeLayers,
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
		}

		// if default layer is already added to the map
		if (
			activeLayers?.data?.layers?.length > 0 &&
			activeView?.data?.nameInternal === 'detailedExploration' &&
			!openMapLayer
		) {
			setOpenMapLayer(true);
			activeLayers?.data?.layers
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

	// add default layer
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
		(activeView?.data?.nameInternal != 'detailedExploration' ||
			introOverlayIsOpen) &&
		openTour
	) {
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
				expandProductLabel(true);
				expandFilterWindow(false);
				removeAllFilters();
				break;
			case 4:
				openIntroOverlay(false);
				redirectToDetailedView();
				expandProductLabel(false);
				expandFilterWindow(false);
				removeAllFilters();
				break;
			case 5:
				openIntroOverlay(false);
				redirectToDetailedView();
				expandProductLabel(false);
				expandFilterWindow(true);
				break;
			case 6:
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

	// when the user skips directly to the 5th step, in order to add the default filter,
	// it is necessary to wait for the active filters to get set, otherwise the filters get cleaned up.
	// I found out that it is just fine to wait for the active layer and then set the default filter.
	useEffect(() => {
		step === 5 && !activeFilters?.product?.length > 0 && openTour
			? addDefaultFillter()
			: null;
	}, [step, activeLayers]);

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
			padding={step === 5 ? {mask: [10, 130], popover: [10, 70]} : {}}
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
	activeLayers: PropTypes.object,
	expandFilterWindow: PropTypes.func,
	removeAllFilters: PropTypes.func,
	addDefaultFillter: PropTypes.func,
	controlTourGuide: PropTypes.func,
	activeFilters: PropTypes.object,
};

export default AppTour;
