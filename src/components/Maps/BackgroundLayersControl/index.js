import ComponentRenderer from '../ComponentRenderer';
import SimpleLayersControl from './SimpleLayersControl';
import './style.scss';

const BackgroundLayersControl = props => {
	return (
		<ComponentRenderer
			component={'backgroundLayersControl'}
			configurationGroupKey={'mapSetTools'}
		>
			<div className={'ptr-BackgroundLayersControl'}>
				<SimpleLayersControl {...props} />
			</div>
		</ComponentRenderer>
	);
};

export default BackgroundLayersControl;
