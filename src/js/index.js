'use strict';

// lib
const Rx = require('rx');
const $ = Rx.Observable;

// util
const vdom = require('./util/vdom');

// app
let actions = require('./actions');
const ui = require('./ui');

// services
const router = require('./services/router');
actions = router.attach(actions);

console.log(actions);

// reduce actions to state
const state$ = actions.stream
	.map(change => (console.log('ch', change), change))
	.scan((state, reducer) => reducer(state), actions.initial)
	.map(state => (console.log('sc', state), state));

// map state to ui
const ui$ = state$.map(state => ui({state, actions}));
router.hook(state$);

// patch stream to dom
vdom.patchStream(ui$, '#ui');

window.actions = actions;
