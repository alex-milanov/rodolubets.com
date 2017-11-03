'use strict';

// lib
const Rx = require('rx');
const $ = Rx.Observable;

require('moment/locale/bg');

// util
const vdom = require('iblokz-snabbdom-helpers');
const {obj} = require('iblokz-data');

// config
const config = {
	routes: [
		'admin/:page/:pageId',
		':page/:pageId'
	]
};
// app
const app = require('./util/app');
let actions = require('./actions');
let ui = require('./ui');

// services
// router
const router = require('./services/router');
actions.router = router.actions;
// resources
const resList = ['articles', 'events', 'pages', 'assets'];
const resource = require('./services/resource');
resList.forEach(res => (
	actions = resource.attach(actions, res)
));
// auth
const auth = require('./services/auth');
actions.auth = auth.actions;

// prep actions
let actions$;
actions = app.adapt(actions);

// hot reloading
if (module.hot) {
	// actions
	actions$ = $.fromEventPattern(
    h => module.hot.accept("./actions", h)
	)
		.flatMap(() => {
			actions = app.adapt(Object.assign(
				{},
				require('./actions'),
				{
					router: router.actions,
					auth: auth.actions
				},
				resList.reduce(
					(o, res) => obj.patch(o, res, resource.applyNs(resource.actions, res)), {}
				)
			));
			return actions.stream.startWith(state => state);
		}).merge(actions.stream);
	// ui
	module.hot.accept("./ui", function() {
		ui = require('./ui');
		actions.stream.onNext(state => state);
	});
} else {
	actions$ = actions.stream;
}

// actions -> state
const state$ = new Rx.BehaviorSubject();
actions$
	.startWith(() => actions.initial)
	.scan((state, change) => change(state), {})
	.map(state => (console.log(state), state))
	.subscribe(state => state$.onNext(state));

// state change hooks
router.hook({state$, actions});
resList.forEach(res => (
	resource.hook(res)({state$, actions})
));
auth.hook({state$, actions});

// trigger read action on pageId param
state$
	.distinctUntilChanged(state => state.router.pageId)
	.filter(state => state.router.pageId !== null)
	.subscribe(state => resList.forEach(res =>
		state.router.page.match(res) && (state.router.pageId === 'new'
			? actions[res].reset()
			: res === 'assets'
				? actions[res].list(actions[res].query, state.router.pageId)
				: actions[res].read(state.router.pageId))
	));

// map state to ui
const ui$ = state$.map(state => ui({state, actions}));

// patch stream to dom
vdom.patchStream(ui$, '#ui');

window.actions = actions;

// livereload impl.
if (module.hot) {
	document.write(`<script src="http://${(location.host || 'localhost').split(':')[0]}` +
	`:35729/livereload.js?snipver=1"></script>`);
}
