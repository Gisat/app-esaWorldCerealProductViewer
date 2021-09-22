import React from 'react';
import {withResizeDetector} from 'react-resize-detector';
import Years from './Years';
import MonthsLabels from './MonthsLabels';

const Levels = props => {
	const {activeLevel} = props;
	switch (activeLevel) {
		case 'year':
			return React.createElement(Years, {...props, key: 'year'});
		case 'month':
			return React.createElement(MonthsLabels, {...props, key: 'month'});
	}
    return null
};


const XAxis = ({period, getX, dayWidth, vertical, height, width, activeLevel}) => {
    const elementWidth = vertical ? height : width;
	const elementHeight = vertical ? width : height;
    const transform = vertical ? `scale(-1,1) translate(-${height},0)` : '';

    return (
            <div style={{display:'flex'}}>
                <div className={'ptr-timeline-legend-placeholder'}>
                </div>
                <div className={'ptr-timeline-x-titles'}>
                    <svg
                        version={'1.1'}
                        xmlns={'http://www.w3.org/2000/svg'}
                        xmlnsXlink={'http://www.w3.org/1999/xlink'}
                        width={elementWidth}
                        height={elementHeight}
                    >
                        <g transform={transform}>
                            <Levels period={period} getX={getX} dayWidth={dayWidth} height={20} vertical={vertical} activeLevel={activeLevel}/>
                        </g>
                    </svg>
                </div>
            </div>
    )
}

export default withResizeDetector(XAxis);