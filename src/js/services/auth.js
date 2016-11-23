'use strict';

const Rx = require('rx');
const $ = Rx.Observable;
const Subject = Rx.Subject;
const request = require('iblokz/adapters/request');
const obj = require('iblokz/common/obj');

// const page = require('../page');

const stream = new Subject();

const forceLogout = () => {
	// store.set('user', null);
	stream.onNext(state => obj.patch(state, 'auth', {user: null}));
	// page.go('login');
};

const login = data => request
	.post('/api/auth')
  .send(data)
	.set('Accept', 'application/json')
	.observe()
	.map(res => res.body)
	.subscribe(body => {
		if (body.status === 'success') {
			// store.set('user', user);
			stream.onNext(state => obj.patch(state, 'auth', {user: body.user}));
			// page.go('videos');
		}
	});

const logout = token => request
	.delete('/api/auth')
	.query({token})
	.set('Accept', 'application/json')
	.observe()
	.map(res => res.body)
	.subscribe(data => {
		if (data.status === 'success') {
			forceLogout();
		}
	}, () => forceLogout());

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
		stream: $.merge(actions.stream, auth.stream),
		initial: Object.assign({}, actions.initial, auth.initial)
	}
);

const hook = state$ => {
};

module.exports = {
	attach,
	hook
};
