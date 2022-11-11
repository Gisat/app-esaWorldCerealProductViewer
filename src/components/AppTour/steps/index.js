import IntroScreen from './Intro/Screen';
import IntroCards from './Intro/Cards';
import DetailViewHeader from './DetailView/Header';
import DetailViewMap from './DetailView/Map';
import DetailViewTimeline from './DetailView/Timeline';
import DetailViewFilters from './DetailView/Filters';
import GlobalView from './GlobalView/GlobalView';

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
	// because filter is a toggle window, it is better to highlight the timeline and add padding to show timeline + filters
	{
		selector: '.worldCereal-Timeline',
		content: DetailViewFilters,
	},
	{
		selector: '.worldCereal-ProductViewer',
		content: GlobalView,
	},
];
