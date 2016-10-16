'use strict';

const Rx = require('rx');
const $ = Rx.Observable;
const Subject = Rx.Subject;

const stream = new Subject();

const parsePageParams = str => {
	const pageId = str.split('/')[1] || null;
	const page = ((pageId) ? str.split('/')[0] : str) || 'home';
	return {
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
	initial: {route: {page: 'home'}},
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
