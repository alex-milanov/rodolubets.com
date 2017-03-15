'use strict';

const Rx = require('rx');
const $ = Rx.Observable;

const parsePageParams = str => {
	const path = str.split('/');
	const admin = path[0] === 'admin';
	const pageId = path[admin ? 2 : 1] || null;
	const page = (admin ? 'admin.' : '') + ((pageId) ? path[path.length - 2] : path[path.length - 1]) || 'home';
	return {
		path,
		admin,
		page,
		pageId
	};
};

const change = page => state => Object.assign({}, state, {router: parsePageParams(page)});

const go = page => {
	window.location.hash = '/' + ((page !== 'home') ? page.split('.').join('/') : '');
	return change(page);
};

const actions = {
	initial: {page: 'home', path: ['home'], admin: false, pageId: null},
	change,
	go
};

const hook = ({state$, actions}) => {
	state$.take(1).subscribe(() => {
		window.setTimeout(() => actions.router.change(location.hash.replace('#/', '') || 'home'));
		window.addEventListener('hashchange',
			() => actions.router.change(location.hash.replace('#/', '') || 'home'));
	});
};

module.exports = {
	actions,
	hook
};
