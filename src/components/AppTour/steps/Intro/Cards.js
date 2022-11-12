import TourStepsContainer from '../components/TourStepsContainer';
import TourStepsSectionsContainer from '../components/TourStepsSectionsContainer';
import TourStepsSection from '../components/TourStepsSection';

import '../style.scss';

const Cards = () => (
	<TourStepsContainer>
		<h3 style={{margin: '0 0 0.4rem 0'}}>Cards</h3>
		<p>Cards serve for navigation between map views (by clicking on it).</p>
		<TourStepsSectionsContainer>
			<TourStepsSection>
				<p>
					<b>Detailed exploration</b> - detail map exploration.
				</p>
				<p style={{marginBottom: 0}}>
					<b>Global view</b> - global map exploration.
				</p>
			</TourStepsSection>
			<TourStepsSection isRight>
				<p>
					<b>Statistics</b> - statistical view on WorldCereal products.
				</p>
				<p style={{marginBottom: 0}}>
					<b>User products</b> - explore your products.
				</p>
			</TourStepsSection>
		</TourStepsSectionsContainer>
	</TourStepsContainer>
);

export default Cards;
