import PropTypes from 'prop-types';
import {Search, Globe1, User1, ChartVertical} from 'react-swm-icon-pack';
import IntroCard from './IntroCard';
import {IntroCardText, IntroCardTitle} from './IntroCard/presentation';
import EsaLogo from '../atoms/EsaLogo';
import logo from '../../assets/logo_name.png';

import './style.scss';

const Intro = ({onViewSelect}) => {
	return (
		<div className="worldCereal-Intro">
			<div className="worldCereal-Intro-content">
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
					<IntroCard onClick={onViewSelect} Icon={Search}>
						<IntroCardTitle>Detailed exploration</IntroCardTitle>
						<IntroCardText>of WorldCereal products</IntroCardText>
					</IntroCard>
					<IntroCard disabled Icon={Globe1}>
						<IntroCardTitle>Global view </IntroCardTitle>
						<IntroCardText>on WorldCereal products</IntroCardText>
					</IntroCard>
					<IntroCard disabled Icon={User1}>
						<IntroCardTitle>User products</IntroCardTitle>
						<IntroCardText>exploration</IntroCardText>
					</IntroCard>
					<IntroCard disabled Icon={ChartVertical}>
						<IntroCardTitle>Statistics</IntroCardTitle>
						<IntroCardText>based on WorldCereal products</IntroCardText>
					</IntroCard>
				</div>
				<div className="worldCereal-Intro-body"></div>
				<div className="worldCereal-Intro-footer"></div>
			</div>
		</div>
	);
};

Intro.propTypes = {
	onViewSelect: PropTypes.func,
};

export default Intro;
