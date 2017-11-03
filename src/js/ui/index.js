'use strict';

const {section} = require('iblokz-snabbdom-helpers');
const {obj} = require('iblokz-data');

// comp
const pageComp = require('./comp/page');
const rightColumn = require('./right-column');

const _switch = (value, cases) =>
	obj.sub(cases, value) && obj.sub(cases, value)['default'] || obj.sub(cases, value)
	|| (value instanceof Array)
		&& value.length > 1 && _switch(value.slice(0, value.length - 1), cases)
	|| cases['default'];

const header = require('./header');
const pages = {
	default: require('./pages/home'),
	about: require('./pages/about'),
	almanac: require('./pages/almanac'),
	articles: require('./pages/articles'),
	links: require('./pages/links'),
	admin: {
		default: require('./pages/admin'),
		articles: require('./pages/admin/articles'),
		events: require('./pages/admin/events'),
		pages: require('./pages/admin/pages'),
		assets: require('./pages/admin/assets')
	}
};

module.exports = ({state, actions}) => section('#ui', [
	section((state.router.admin ? '#admin' : '#front'), [].concat(
		[header({state, actions})],
		_switch(state.router.path, state.pages.list.reduce(
			(pages, page) => obj.patch(pages, page.path.split('.'),
				({state, actions}) => pageComp({state, actions, page, rightColumn:
				rightColumn({state, actions})})
			),
			pages
		))({state, actions})
	))
]);
