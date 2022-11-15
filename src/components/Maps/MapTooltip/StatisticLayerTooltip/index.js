import {connect} from '@gisatcz/ptr-state';
// import Action from '../../../../state/Action';
import Select from '../../../../state/Select';

import Presentation from './presentation';

// const filter = [
// 	null, // order,
// 	{
// 		modifiers: {
// 			scopeKey: '10de783b-810b-4f8a-aceb-4c9e9f91d4d3',
// 			caseKey: '66f490a6-d8df-45a3-adcb-d3648715ddd5',
// 			periodKey: '2a293769-d7ba-4c83-800e-8184b457ac85',
// 			applicationKey: 'esaWorldCerealProductViewer',
// 		},
// 		areaTreeLevelKey: 'a53a54dd-8a0b-4e28-b7aa-aa566cd2ba47',
// 		attributeKeys: ['901ff005-2a62-41d4-afc4-e8d1b1f5d088'],
// 	},
// 	{
// 		featureKeys: ['IND'],
// 		attributeFilter: {},
// 	}, // attributeDataFilterExtension,
// 	false, //loadRelations
// 	true, //loadData
// 	null, //relationsPagination,
// 	{offset: 0, limit: 1}, //attributePagination
// ];

const mapStateToProps = (state, ownProps) => {
	const fidColumnName = ownProps?.layer?.sourceLayer?.props?.fidColumnName;
	const placeKey = ownProps?.layer?.object?.properties?.[fidColumnName];
	// const place = Select.places.getIndexed(state, placeKey);
	const title = Select.worldCereal.statistics.getTooltipTitle(state, placeKey);

	//get absolute data
	// const absoluteData = Select.data.attributeData.get
	return {
		name: title,
		placename: ownProps?.layer?.object?.properties?.[fidColumnName],
		areaShare:
			ownProps?.layer?.object?.properties?.[
				'73e3bd86-8701-47e4-b27b-9d2555d68304'
			],
		areaTotal:
			ownProps?.layer?.object?.properties?.[
				'73e3bd86-8701-47e4-b27b-9d2555d68304'
			],
	};
};

const mapDispatchToProps = () => {
	return () => {
		return {
			ensureAbsoluteData: () => {
				// console.log('xxx_ensureAbsoluteData');
				// dispatch(Action.data.components.loadIndexedPage(...filter));
			},
		};
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
