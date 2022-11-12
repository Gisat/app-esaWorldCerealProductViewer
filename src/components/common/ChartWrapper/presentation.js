import PropTypes from 'prop-types';
import BarChart from '../charts/BarChart';
import DonutChart from '../charts/DonutChart';

import './style.scss';

const ChartWrapper = ({componentKey, title, subtitle, type, onChartClick}) => {
	let content = null;

	switch (type) {
		case 'barChart':
			content = <BarChart componentKey={componentKey} onClick={onChartClick} />;
			break;
		case 'donutChart':
			content = <DonutChart componentKey={componentKey} />;
			break;
	}

	return (
		<div className={'ptr-ChartWrapper'}>
			<div className={'ptr-ChartWrapper-header'}>
				<div>
					<div className={'ptr-ChartWrapper-title'}>{title}</div>
				</div>
				{subtitle ? (
					<div>
						<div className={'ptr-ChartWrapper-subtitle'}>{subtitle}</div>
					</div>
				) : null}
			</div>
			<div className={'ptr-ChartWrapper-body'}>{content}</div>
		</div>
	);
};

ChartWrapper.propTypes = {
	componentKey: PropTypes.string,
	title: PropTypes.string,
	subtitle: PropTypes.string,
	type: PropTypes.string,
	onChartClick: PropTypes.func,
};

export default ChartWrapper;
