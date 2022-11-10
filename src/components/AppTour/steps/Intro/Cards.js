import '../style.scss';

const Cards = () => (
	<div className="worldCereal-tour-steps-Container">
		<h3 style={{margin: '0 0 0.4rem 0'}}>Cards</h3>
		<p>Cards serve for navigation between map views.</p>
		<div className="worldCereal-tour-steps-SectionsContainer">
			<div className="worldCereal-tour-steps-Section">
				<p>
					<b>Detailed exploration</b> - detail map exploration.
				</p>
				<p style={{marginBottom: 0}}>
					<b>Global view</b> - global map exploration.
				</p>
			</div>
			<div
				className="worldCereal-tour-steps-Section"
				style={{marginLeft: '1rem'}}
			>
				<p>
					<b>Statistics</b> - statistical view on WorldCereal products.
				</p>
				<p style={{marginBottom: 0}}>
					<b>User products</b> - explore your products.
				</p>
			</div>
		</div>
	</div>
);

export default Cards;
