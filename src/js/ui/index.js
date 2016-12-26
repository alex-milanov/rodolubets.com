'use strict';

const {section} = require('iblokz/adapters/vdom');
const obj = require('iblokz/common/obj');

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
		pages: require('./pages/admin/pages')
	}
};

module.exports = ({state, actions}) => section('#ui', [
	section((state.route.admin ? '#admin' : '#front'), [].concat(
		[header({state, actions})],
		_switch(state.route.path, pages)({state, actions})
	))
]);
