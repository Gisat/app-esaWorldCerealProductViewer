import TourStepsContainer from '../components/TourStepsContainer';
import TourStepsSectionsContainer from '../components/TourStepsSectionsContainer';
import TourStepsSection from '../components/TourStepsSection';

import '../style.scss';

const Panel = () => (
	<TourStepsContainer>
		<h3 style={{margin: '0 0 0.4rem 0'}}>Panel</h3>
		<TourStepsSectionsContainer>
			<TourStepsSection>
				<p>
					<b>Product</b> - Fusce consectetuer risus a nunc. Maecenas
					sollicitudin.
				</p>
				<p>
					<b>Period</b> - In sem justo, commodo ut, suscipit at, pharetra vitae,
					orci.
				</p>
				<p>
					<b>Level</b> - Class aptent taciti sociosqu ad litora torquent per
					conubia nostra.
				</p>
				<p>
					<b>Countries</b> - Sed ac dolor sit amet purus malesuada congue.
				</p>
			</TourStepsSection>
		</TourStepsSectionsContainer>
		<TourStepsSectionsContainer>
			<TourStepsSection>
				<p>
					<b>Total product area</b> - Nam sed tellus id magna elementum
					tincidunt.
				</p>
				<p style={{marginBottom: 0}}>
					<b>Product area share</b> - Sed convallis magna eu sem.
				</p>
			</TourStepsSection>
		</TourStepsSectionsContainer>
	</TourStepsContainer>
);

export default Panel;
