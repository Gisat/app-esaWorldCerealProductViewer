import {connect} from '@gisatcz/ptr-state';
import Action from '../state/Action';
import Select from '../state/Select';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import {IconTool, Tooltip} from '@gisatcz/visat-components';
import {useTour} from '@reactour/tour';
import {Search, Globe1, User1, ChartVertical} from 'react-swm-icon-pack';
import IntroCard from '../components/Intro/IntroCard';
import {
	IntroCardText,
	IntroCardTitle,
} from '../components/Intro/IntroCard/presentation';
import EsaLogo from '../components/atoms/EsaLogo';

import '../components/Intro/style.scss';

import logo from '../assets/logo_name.png';
import cs from '../assets/cs.jpg';
import eleaf from '../assets/eleaf.jpg';
import esa from '../assets/esa.jpg';
import gisat from '../assets/gisat.jpg';
import iiasa from '../assets/iiasa.jpg';
import strasbourg from '../assets/strasbourg.jpg';
import valencia from '../assets/valencia.jpg';
import vito from '../assets/vito.jpg';
import wageningen from '../assets/wageningen.jpg';

const getIcon = name => {
	switch (name) {
		case 'detailedExploration':
			return Search;
		case 'globalView':
			return Globe1;
		case 'userProducts':
			return User1;
		case 'statistics':
			return ChartVertical;
		default:
			return null;
	}
};

const HomePage = ({views, tourGuideIsOpen}) => {
	const {setIsOpen} = useTour();

	return (
		<div className="worldCereal-Intro">
			<div className="worldCereal-Intro-content">
				<IconTool
					className={classNames(
						'worldCereal-Intro-tourIcon',
						{},
						tourGuideIsOpen ? 'is-active' : ''
					)}
					icon={'ri-help'}
					onClick={() => setIsOpen(true)}
					tooltip={{text: 'TourGuide', position: 'left', component: Tooltip}}
				/>
				<div className="worldCereal-Intro-topSection">
					<div className="worldCereal-Intro-header">
						<img className="worldCereal-Intro-logo" src={logo} />
						<div className="worldCereal-Intro-title">
							<h1>
								World<em>Cereal</em>, global cropland monitoring based on
								Sentinels
							</h1>
						</div>
						<EsaLogo />
					</div>
					<div className="worldCereal-Intro-cards">
						{views?.map(view => (
							<IntroCard
								href={view.data.nameInternal}
								key={view.key}
								Icon={getIcon(view.data.nameInternal)}
							>
								<IntroCardTitle>{view.data.nameDisplay}</IntroCardTitle>
								<IntroCardText>{view.data.description}</IntroCardText>
							</IntroCard>
						))}
						<IntroCard disabled Icon={User1}>
							<IntroCardTitle>User products</IntroCardTitle>
							<IntroCardText>exploration</IntroCardText>
						</IntroCard>
					</div>
				</div>
				<div className="worldCereal-Intro-body"></div>
				<div className="worldCereal-Intro-footer">
					<a
						className="worldCereal-Intro-footer-logo"
						href="https://www.uv.es/uvweb/college/en/university-valencia-1285845048380.html"
					>
						<img src={valencia} />
					</a>
					<a
						className="worldCereal-Intro-footer-logo"
						href="https://www.csgroup.eu/en/"
					>
						<img src={cs} />
					</a>
					<a
						className="worldCereal-Intro-footer-logo"
						href="https://www.esa.int/"
					>
						<img src={esa} />
					</a>
					<a className="worldCereal-Intro-footer-logo" href="https://gisat.cz/">
						<img src={gisat} />
					</a>
					<a
						className="worldCereal-Intro-footer-logo"
						href="https://iiasa.ac.at/"
					>
						<img src={iiasa} />
					</a>
					<a
						className="worldCereal-Intro-footer-logo"
						href="https://en.unistra.fr/"
					>
						<img src={strasbourg} />
					</a>
					<a
						className="worldCereal-Intro-footer-logo"
						href="https://eleaf.com/"
					>
						<img src={eleaf} />
					</a>
					<a
						className="worldCereal-Intro-footer-logo"
						href="https://vito.be/en"
					>
						<img src={vito} />
					</a>
					<a
						className="worldCereal-Intro-footer-logo"
						href="https://www.wur.nl/en.htm"
					>
						<img src={wageningen} />
					</a>
				</div>
			</div>
		</div>
	);
};

HomePage.propTypes = {
	onViewSelect: PropTypes.func,
	views: PropTypes.array,
	tourGuideIsOpen: PropTypes.bool,
};

const mapStateToProps = state => {
	return {
		views: Select.views.getAll(state),
		tourGuideIsOpen: Select.components.get(state, 'tourGuide', 'isOpen'),
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onViewSelect: viewKey => {
			dispatch(Action.worldCereal.applyView(viewKey));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
