'use strict';

const Rx = require('rx');
const $ = Rx.Observable;
const {Subject} = Rx;

const {obj} = require('iblokz-data');

const request = require('../util/request');

const initial = {
	query: {},
	list: [],
	doc: {},
	dirty: true
};

// ns - namespace
const list = ns => (query = {}) => request.get(`/api/${ns}`)
	.query(query)
	.observe()
	.map(res => res.body)
	.map(data => state => obj.patch(state, ns,
		Object.assign({}, data, {dirty: false})
	));

const query = ns => keyValuePair => state => obj.patch(state, ns, {
	query: Object.assign({}, obj.sub(state, [].concat(ns, 'query')), keyValuePair),
	dirty: true
});

const create = ns => doc => request.post(`/api/${ns}`)
	.send(doc)
	.observe()
	.map(() => state => obj.patch(state, ns, {dirty: true, doc: {}}));

const read = ns => id => request.get(`/api/${ns}/${id}`)
	.observe()
	.map(res => res.body)
	.map(doc => state => obj.patch(state, ns, {doc}));

const actions = {
	initial,
	list,
	query,
	create,
	read
};

const applyNs = (o, ns) => obj.map(o, (v, k) => (v instanceof Function) ? v(ns) : v);

const attach = (o, ns) => obj.patch(o, ns, applyNs(actions, ns));

const hook = ns => ({state$, actions}) => {
	state$
		.distinctUntilChanged(state => state[ns].dirty)
		.filter(state => state[ns].dirty)
		.subscribe(state => actions[ns].list(state[ns].query));
};

module.exports = {
	actions,
	applyNs,
	attach,
	hook
};
