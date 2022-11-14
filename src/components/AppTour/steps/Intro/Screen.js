import TourStepsContainer from '../components/TourStepsContainer';

import '../style.scss';

const Screen = () => (
	<TourStepsContainer>
		<p>
			Welcome to the <b>WorldCereal portal</b> - a web application for
			monitoring global croplands.
		</p>
		<p style={{marginBottom: 0}}>
			This is a tour guide that presents the basic functionalities and
			principles of the application.
		</p>
	</TourStepsContainer>
);

export default Screen;
