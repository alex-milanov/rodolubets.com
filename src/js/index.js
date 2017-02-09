'use strict';

// lib
const Rx = require('rx');
const $ = Rx.Observable;

// util
const vdom = require('iblokz/adapters/vdom');

// config
const config = {
	routes: [
		'admin/:page/:pageId',
		':page/:pageId'
	]
};

// app
let actions = require('./actions');
const ui = require('./ui');

// services
const router = require('./services/router');
actions = router.attach(actions);

console.log(actions);

// reduce actions to state
const state$ = actions.stream
	// .map(change => (console.log('ch', change), change))
	.scan((state, reducer) => reducer(state), actions.initial)
	.map(state => (console.log('sc', state), state))
	.share();

// state change hooks
state$
	.skip(2)
	.filter(state => state.route.page === 'articles')
	.distinctUntilChanged(state => state.category)
	.filter(state => state.category !== null)
	.subscribe(state => actions.router.go('articles'));

state$
	.skip(2)
	.filter(state => state.route.page === 'articles')
	.distinctUntilChanged(state => state.route.pageId)
	.filter(state => state.route.pageId !== null)
	.subscribe(state => actions.selectCategory(null));

// map state to ui
const ui$ = state$.map(state => ui({state, actions}));
router.hook(state$);

// patch stream to dom
vdom.patchStream(ui$, '#ui');

window.actions = actions;
