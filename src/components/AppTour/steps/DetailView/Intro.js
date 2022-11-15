import TourStepsContainer from '../components/TourStepsContainer';

import '../style.scss';

const Intro = () => (
	<TourStepsContainer>
		<p>
			Welcome to the <b>Detailed view</b> exploration.
		</p>
		<p style={{marginBottom: 0}}>In this view you can explore...</p>
	</TourStepsContainer>
);

export default Intro;
