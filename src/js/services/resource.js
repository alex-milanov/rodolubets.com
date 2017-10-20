'use strict';

const Rx = require('rx');
const $ = Rx.Observable;
const {Subject} = Rx;

const {obj} = require('iblokz-data');

const request = require('../util/request');

const initial = {
	query: {limit: 100},
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

const create = ns => (doc, token) => request.post(`/api/${ns}`)
	.set(token && {'x-access-token': token} || {})
	.send(doc)
	.observe()
	.map(() => state => obj.patch(state, ns, {dirty: true, doc: {}}));

const read = ns => id => request.get(`/api/${ns}/${id}`)
	.observe()
	.map(res => res.body)
	.map(doc => state => obj.patch(state, ns, {doc}));

const update = ns => (id, doc, token) => request.put(`/api/${ns}/${id}`)
	.set(token && {'x-access-token': token} || {})
	.send(doc)
	.observe()
	.map(() => state => obj.patch(state, ns, {dirty: true, doc: {}}));

const save = ns => (doc, token) => doc._id
	? update(ns)(doc._id, doc, token)
	: create(ns)(doc, token);

const reset = ns => () => state => obj.patch(state, ns, {doc: {}});

const actions = {
	initial,
	list,
	query,
	create,
	update,
	save,
	read,
	reset
};

const applyNs = (o, ns) => obj.map(o, (v, k) => (v instanceof Function) ? v(ns) : v);

const attach = (o, ns) => obj.patch(o, ns, applyNs(actions, ns));

const hook = ns => ({state$, actions}) => {
	console.log({ns});
	state$
		.distinctUntilChanged(state => ((console.log(ns, state[ns])), state[ns].dirty))
		.filter(state => state[ns].dirty)
		.subscribe(state => actions[ns].list(state[ns].query));
};

module.exports = {
	actions,
	applyNs,
	attach,
	hook
};
