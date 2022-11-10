import IntroScreen from './Intro/Screen';
import IntroCards from './Intro/Cards';
import DetailViewHeader from './DetailView/Header';
import DetailViewMap from './DetailView/Map';
import DetailViewTimeline from './DetailView/Timeline';
import DetailViewFilters from './DetailView/Filters';

export default [
	{
		selector: '.worldCereal-Intro-header',
		content: IntroScreen,
	},
	{
		selector: '.worldCereal-Intro-cards',
		content: IntroCards,
	},
	{
		selector: '.worldCereal-Header',
		content: DetailViewHeader,
	},
	{
		selector: '.worldCereal-ProductViewer .ptr-map-set',
		content: DetailViewMap,
	},
	{
		selector: '.worldCereal-Timeline',
		content: DetailViewTimeline,
	},
	{
		selector: '.worldCereal-FilterWindow',
		content: DetailViewFilters,
	},
];
