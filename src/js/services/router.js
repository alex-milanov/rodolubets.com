'use strict';

const Rx = require('rx');
const $ = Rx.Observable;

const parsePageParams = str => {
	const path = str.split('/');
	const admin = path[0] === 'admin';
	const pageId = path.length > (1 + admin ? 1 : 0) ? path.slice(admin ? 2 : 1).join('/') : null;
	const page = (admin ? path.slice(0, 2).join('.') : path[0]) || 'home';
	return {
		path,
		admin,
		page,
		pageId
	};
};

let change;
let go;

change = page => state => (page.match('admin') && (!state.auth.user || state.auth.user.role !== 'admin'))
	? (go('home'), state)
	: Object.assign({}, state, {router: parsePageParams(page)});

go = page => {
	window.location.hash = '/' + ((page !== 'home') ? page.split('.').join('/') : '');
	return state => state;
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
