const getSeasonName = season => {
	switch (season) {
		case 'summer1':
			return 'tc-maize-main';
		case 'summer2':
			return 'tc-maize-second';
		case 'winter':
			return 'tc-wintercereals';
		case 'annual':
			return 'tc-annual';
	}
};

export default {
	getSeasonName,
};
