import React, {useEffect} from 'react';

import './style.scss';

const App = ({onMount, onUnmount}) => {
	useEffect(() => {
		if (typeof onMount === 'function') {
			onMount();
		}
		if (typeof onUnmount === 'function') {
			return onUnmount();
		}
	}, []);

	return <div>Hello world!</div>
};

export default App;
