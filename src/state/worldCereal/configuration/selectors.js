import {createSelector} from 'reselect';

/**
 * Helper collecting the config data
 * @param componentKey {string}
 * @param openKeys {Array}
 * @param disabledKeys {Array}
 * @param configData {Object}
 * @return {Object}
 */
const getConfigContent = (componentKey, openKeys, disabledKeys, configData) => {
	return {
		active: openKeys?.includes(componentKey),
		disabled: disabledKeys?.includes(componentKey),
		key: componentKey,
		...configData,
	};
};

const getSubstate = state => state.worldCereal.configuration;

/**
 * @param state {Object}
 * @param key {Object} group key (e.g. widgets, mapSetTools)
 * @param path {string} [optional] Currently supporting just one nesting level
 * @return {Object}
 */
const getConfigGroup = createSelector(
	[getSubstate, (state, key) => key, (state, key, path) => path],
	(substate, key, path) => {
		return path ? substate?.[key]?.[path] : substate?.[key];
	}
);

/**
 * @param state {Object}
 * @param key {Object} group key (e.g. widgets, mapSetTools)
 * @return {Array} list of open component keys
 */
const getConfigGroupOpenComponentKeys = createSelector(
	[getConfigGroup],
	configGroup => {
		return configGroup?.open;
	}
);

/**
 * @param state {Object}
 * @param key {Object} group key (e.g. widgets, mapSetTools)
 * @return {Array} list of disabled component keys
 */
const getConfigGroupDisabledComponentKeys = createSelector(
	[getConfigGroup],
	configGroup => {
		return configGroup?.disabled;
	}
);

/**
 * @param state {Object}
 * @param key {Object} group key (e.g. widgets, mapSetTools)
 * @return {Object} all config group components
 */
const getAllConfigGroupComponents = createSelector(
	[getConfigGroup],
	configGroup => {
		return configGroup?.componentsByKey;
	}
);

const getComponentConfiguration = createSelector(
	[
		(state, groupKey, path) =>
			getConfigGroupOpenComponentKeys(state, groupKey, path),
		(state, groupKey, path) =>
			getConfigGroupDisabledComponentKeys(state, groupKey, path),
		(state, groupKey, path) =>
			getAllConfigGroupComponents(state, groupKey, path),
		(state, groupKey, path, componentKey) => componentKey,
	],
	(open, disabled, components, componentKey) => {
		const configData = components?.[componentKey];
		return getConfigContent(componentKey, open, disabled, configData);
	}
);

const getConfigGroupAvailableComponentsConfiguration = createSelector(
	[getConfigGroup],
	configGroup => {
		if (configGroup) {
			return configGroup?.available?.map(componentKey => {
				const configData = configGroup.componentsByKey[componentKey];
				return getConfigContent(
					componentKey,
					configGroup.open,
					configGroup.disabled,
					configData
				);
			});
		} else {
			return null;
		}
	}
);

const getConfigGroupOpenComponentsConfiguration = createSelector(
	[getConfigGroup],
	configGroup => {
		if (configGroup) {
			return configGroup.open.map(componentKey => {
				const configData = configGroup.componentsByKey[componentKey];
				return getConfigContent(
					componentKey,
					configGroup.open,
					configGroup.disabled,
					configData
				);
			});
		} else {
			return null;
		}
	}
);

export default {
	getComponentConfiguration,
	getConfigGroupAvailableComponentsConfiguration,
	getConfigGroupOpenComponentsConfiguration,
};
