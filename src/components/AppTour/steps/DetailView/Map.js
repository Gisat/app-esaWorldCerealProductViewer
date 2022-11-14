import TourStepsContainer from '../components/TourStepsContainer';
import TourStepsSectionsContainer from '../components/TourStepsSectionsContainer';
import TourStepsSection from '../components/TourStepsSection';

import '../style.scss';

const Map = () => (
	<TourStepsContainer>
		<h3 style={{margin: '0 0 0.4rem 0'}}>Map window</h3>
		<TourStepsSectionsContainer>
			<TourStepsSection>
				<p>
					<b>Map</b> - background layer and added layers.
				</p>
				<p style={{marginBottom: 0}}>
					<b>Layer info</b> - information and basic interactions for added
					layers.
				</p>
			</TourStepsSection>
			<TourStepsSection isRight>
				<p>
					<b>Minimap</b> - shows your view on larger scale.
				</p>
				<p style={{marginBottom: 0}}>
					<b>Map tools</b> - tools for controlling the map window.
				</p>
			</TourStepsSection>
		</TourStepsSectionsContainer>
	</TourStepsContainer>
);

export default Map;
