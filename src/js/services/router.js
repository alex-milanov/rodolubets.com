'use strict';

const Rx = require('rx');
const $ = Rx.Observable;
const Subject = Rx.Subject;

const stream = new Subject();

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

const change = page => {
	stream.onNext(state => Object.assign({}, state, {route: parsePageParams(page)}));
};

const go = page => {
	window.location.hash = '/' + ((page !== 'home') ? page : '');
	change(page);
};

const router = {
	stream,
	initial: {route: {page: 'home', path: ['home'], admin: false}},
	parsePageParams,
	change,
	go
};

const attach = actions => Object.assign(
	{},
	actions,
	{
		router,
		stream: $.merge(actions.stream, router.stream),
		initial: Object.assign({}, actions.initial, router.initial)
	}
);

const hook = state$ => {
	state$.take(1).subscribe(() => {
		window.setTimeout(() => change(location.hash.replace('#/', '') || 'home'));
		window.addEventListener('hashchange',
			() => change(location.hash.replace('#/', '') || 'home'));
	});
};

module.exports = {
	attach,
	hook
};
