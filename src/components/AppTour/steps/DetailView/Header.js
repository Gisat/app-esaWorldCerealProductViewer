import TourStepsContainer from '../components/TourStepsContainer';
import TourStepsSectionsContainer from '../components/TourStepsSectionsContainer';
import TourStepsSection from '../components/TourStepsSection';

import '../style.scss';

const Header = () => (
	<TourStepsContainer>
		<h3 style={{margin: '0 0 0.4rem 0'}}>Header</h3>
		<p>Header is a simple navigation in the application.</p>
		<TourStepsSectionsContainer>
			<TourStepsSection>
				<p>
					<b>Logo + title</b> - back to introduction.
				</p>
				<p style={{marginBottom: 0}}>
					<b>ESA logo</b> - link to ESA.
				</p>
			</TourStepsSection>
			<TourStepsSection isRight>
				<p>
					<b>Configuration</b> - configuration for basic tools.
				</p>
				<p style={{marginBottom: 0}}>
					<b>Tour</b> - tour guide through application.
				</p>
			</TourStepsSection>
		</TourStepsSectionsContainer>
	</TourStepsContainer>
);

export default Header;
