'use strict';

// lib
const Rx = require('rx');
const $ = Rx.Observable;

// util
const vdom = require('./util/vdom');

// app
const actions = require('./actions');
window.actions = actions;
const ui = require('./ui');

// reduce actions to state
const state$ = actions.stream
	.scan((state, reducer) => reducer(state), {})
	.map(state => (console.log(state), state));

// map state to ui
const ui$ = state$.map(state => ui({state, actions}));

// patch stream to dom
vdom.patchStream(ui$, '#ui');
