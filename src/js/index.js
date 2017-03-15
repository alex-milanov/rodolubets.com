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
const resource = require('./services/resource');
actions = resource.attach(actions, 'articles');

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
				{router: router.actions},
				obj.keyValue('articles', resource.applyNs(resource.actions, 'articles'))
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
const state$ = actions$
	.startWith(() => actions.initial)
	.scan((state, change) => change(state), {})
	.map(state => (console.log(state), state))
	.share();

// state change hooks
router.hook({state$, actions});
resource.hook('articles')({state$, actions});

// trigger read action on pageId param
state$
	.distinctUntilChanged(state => state.router.pageId)
	.filter(state => state.router.pageId !== null && state.router.page.match(/articles/ig))
	.subscribe(state => actions.articles.read(state.router.pageId));

/*
state$
	.skip(2)
	.filter(state => state.router.page === 'articles')
	.distinctUntilChanged(state => state.category)
	.filter(state => state.category !== null)
	.subscribe(state => actions.router.go('articles'));

state$
	.skip(2)
	.filter(state => state.router.page === 'articles')
	.distinctUntilChanged(state => state.router.pageId)
	.filter(state => state.router.pageId !== null)
	.subscribe(state => actions.selectCategory(null));
*/

// map state to ui
const ui$ = state$.map(state => ui({state, actions}));


// patch stream to dom
vdom.patchStream(ui$, '#ui');

window.actions = actions;
