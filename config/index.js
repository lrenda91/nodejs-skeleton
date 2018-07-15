function getConfig(env){
	env = env || 'development';
	switch (env) {
		case 'production':
			return require('./prod');
		case 'test':
			return require('./test');
		default:
			return require('./dev');
	}
}

module.exports = getConfig(process.env.NODE_ENV);
