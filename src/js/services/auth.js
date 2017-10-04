'use strict';

const Rx = require('rx');
const $ = Rx.Observable;
const Subject = Rx.Subject;
const request = require('../util/request');
const store = require('../util/store');
const {obj} = require('iblokz-data');

// const page = require('../page');

const forceLogout = () => state => {
	store.set('user', null);
	store.set('token', null);
	window.location = '#/';
	return obj.patch(state, 'auth', {user: null, token: null});
};

const login = data => request
	.post('/api/auth')
  .send(data)
	.set('Accept', 'application/json')
	.observe()
	.map(res => res.body)
	.map(({success, user, token}) =>
		(success)
			? (
				store.set('user', user),
				store.set('token', token),
				(window.location = '#/admin'),
				state => obj.patch(state, 'auth', {user, token})
			)
			: state => state
	);

const logout = token => request
	.delete('/api/auth')
	.query({token})
	.set('Accept', 'application/json')
	.observe()
	.map(res => res.body)
	.map(data =>
		(data.success)
			? forceLogout()
			: state => state
	);

const actions = {
	forceLogout,
	login,
	logout: forceLogout,
	initial: {user: store.get('user'), token: store.get('token')}
};

const hook = state$ => {
};

module.exports = {
	actions,
	hook
};
