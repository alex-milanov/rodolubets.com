'use strict';

const Rx = require('rx');
const $ = Rx.Observable;
const Subject = Rx.Subject;
const request = require('../util/request');
const {obj} = require('iblokz-data');

// const page = require('../page');

const stream = new Subject();

const forceLogout = () => state => obj.patch(state, 'auth', {user: null});

const login = data => request
	.post('/api/auth')
  .send(data)
	.set('Accept', 'application/json')
	.observe()
	.map(res => res.body)
	.map(body => state =>
		(body.status === 'success')
			? state => obj.patch(state, 'auth', {user: body.user})
			: state
	);

const logout = token => request
	.delete('/api/auth')
	.query({token})
	.set('Accept', 'application/json')
	.observe()
	.map(res => res.body)
	.map(data =>
		(data.status === 'success')
			? forceLogout()
			: state => state
	);

const auth = {
	forceLogout,
	login,
	logout,
	initial: {auth: {user: null}},
	stream
};

const attach = actions => Object.assign(
	{},
	actions,
	{
		auth,
		initial: Object.assign({}, actions.initial, auth.initial)
	}
);

const hook = state$ => {
};

module.exports = {
	attach,
	hook
};
