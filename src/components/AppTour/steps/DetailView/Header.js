import '../style.scss';

const Header = () => (
	<div className="worldCereal-tour-steps-Container">
		<h3 style={{margin: '0 0 0.4rem 0'}}>Header</h3>
		<p>Header gives the option to navigate through the application.</p>
		<div className="worldCereal-tour-steps-SectionsContainer">
			<div className="worldCereal-tour-steps-Section">
				<p>
					<b>Logo + title</b> - back to introduction.
				</p>
				<p style={{marginBottom: 0}}>
					<b>ESA logo</b> - link to ESA.
				</p>
			</div>
			<div
				className="worldCereal-tour-steps-Section"
				style={{marginLeft: '1rem'}}
			>
				<p>
					<b>Configuration</b> - configuration for basic tools.
				</p>
				<p style={{marginBottom: 0}}>
					<b>Tour</b> - tour guide through application.
				</p>
			</div>
		</div>
	</div>
);

export default Header;
