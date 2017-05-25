'use strict';

const jwt = require('jsonwebtoken');

// ref: https://github.com/wdavidw/node-http-status/blob/master/src/index.litcoffee
const status = require('http-status');
const HTTPError = require('node-http-error');

const createToken = (config, payload) => jwt.sign(payload, config.jwt.secret, config.jwt.options);

const verifyToken = (config, token) => (token)
	? jwt.verify(token, config.jwt.secret, config.jwt.options)
	: false;

const secureMiddleware = (config, access) => (req, res, next) => {
	// get token from either headers or query
	const token = req.headers.authorization ||
		((req.query && req.query.token)
			? req.query.token
			: null);

	// if there is access requirement but no token is provided -> 401 unauthorized
	if (!token && access && access !== 'all')
		throw new HTTPError(status.UNAUTHORIZED, 'Unauthorized');

	const payload = verifyToken(config, token);
	// TODO: check priviledges

	req.user = payload || null;

	next();
};

const configure = config => ({
	createToken: createToken(config),
	verifyToken: verifyToken(config),
	secureMiddleware: secureMiddleware(config)
});

module.exports = {
	configure,
	createToken,
	verifyToken,
	secureMiddleware
};
