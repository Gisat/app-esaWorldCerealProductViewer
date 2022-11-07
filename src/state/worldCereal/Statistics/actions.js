import {Action as CommonAction} from '@gisatcz/ptr-state';
import Select from '../../Select';

/**
 * Set active place keys by selected feature keys. The linking should be stored in app configuration.
 * @param featureKeys {Array} A list of selected feature keys
 */
function setActivePlaceKeysByFeatureKeys(featureKeys) {
	return (dispatch, getState) => {
		const placeKeyByFeatureKey = Select.app.getConfiguration(
			getState(),
			'placeKeyByCountryFeatureKey'
		);
		if (placeKeyByFeatureKey) {
			const placeKeys = featureKeys.map(
				featureKey => placeKeyByFeatureKey[featureKey]
			);
			dispatch(
				CommonAction.places.setActiveKeys(placeKeys.length ? placeKeys : null)
			);
		}
	};
}

export default {
	setActivePlaceKeysByFeatureKeys,
};
