module.exports = function override(config) {
	// comment when using package from npm
	config.resolve = {
		alias: {
			// 'classnames': './node_modules/classnames',
			// 'react': '/Users/vojtadubrovsky/Work/GISAT/git/app-esaWorldCerealProductViewer/node_modules/@gisatcz/ptr-state/node_modules/react',
			// '@gisatcz/ptr-maps': '/Users/vojtadubrovsky/Work/GISAT/git/@gisatcz/ptr-maps',
			// 'react': '/Users/vojtadubrovsky/Work/GISAT/git/ptr-maps/node_modules/react',
			// 'react-resize-detector': '/Users/vojtadubrovsky/Work/GISAT/git/app-esaWorldCerealProductViewer/node_modules/@gisatcz/ptr-maps/node_modules/react-resize-detector',
			// 'react-resize-detector': '/Users/vojtadubrovsky/Work/GISAT/git/app-esaWorldCerealProductViewer/node_modules/react-resize-detector',
			// '@gisatcz/ptr-timeline': '/Users/vojtadubrovsky/Work/GISAT/git/ptr-timeline'
			// '@gisatcz/ptr-state': '/Users/vojtadubrovsky/_WORK/GISAT/git/ptr-state',
			// '@gisatcz/ptr-timeline':
			// 	'/Users/vojtadubrovsky/_WORK/GISAT/git/ptr-timeline',
			// react:
			// 	'/Users/vojtadubrovsky/_WORK/GISAT/git/ptr-timeline/node_modules/react',
			// 'react-resize-detector':
			// 	'/Users/vojtadubrovsky/_WORK/GISAT/git/ptr-timeline/node_modules/react-resize-detector',
			// 'react-dom':
			// 	'/Users/vojtadubrovsky/_WORK/GISAT/git/ptr-state/node_modules/react-dom',
		},
	};

	return config;
};
