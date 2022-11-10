import '../style.scss';

const Map = () => (
	<div className="worldCereal-tour-steps-Container">
		<h3 style={{margin: '0 0 0.4rem 0'}}>Map window</h3>
		<div className="worldCereal-tour-steps-SectionsContainer">
			<div className="worldCereal-tour-steps-Section">
				<p>
					<b>Map</b> - background layer and added layers.
				</p>
				<p style={{marginBottom: 0}}>
					<b>Layer info</b> - information and basic interactions for added
					layers.
				</p>
			</div>
			<div
				className="worldCereal-tour-steps-Section"
				style={{marginLeft: '1rem'}}
			>
				<p>
					<b>Minimap</b> - shows your view on larger scale.
				</p>
				<p style={{marginBottom: 0}}>
					<b>Map tools</b> - tools for controlling the map window.
				</p>
			</div>
		</div>
	</div>
);

export default Map;
