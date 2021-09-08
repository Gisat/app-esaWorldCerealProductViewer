var path = require('path');

module.exports = function override(config, env) {
	// comment when using package from npm
	config.resolve = {
		alias: {
			// react: 'C:/Users/PavelVlach/WebstormProjects/ptr-maps/node_modules/react',
			// '@gisatcz/ptr-maps': 'C:/Users/PavelVlach/WebstormProjects/ptr-maps',
			// '@gisatcz/ptr-atoms': 'C:/Users/PavelVlach/WebstormProjects/ptr-atoms',
		},
	};

	return config;
};
