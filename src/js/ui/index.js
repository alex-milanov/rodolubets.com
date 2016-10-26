'use strict';

const {section} = require('../util/vdom');

const header = require('./header');
const pages = {
	default: require('./pages/home'),
	about: require('./pages/about'),
	almanac: require('./pages/almanac'),
	articles: require('./pages/articles'),
	links: require('./pages/links')
};

const _switch = (value, cases) => (typeof cases[value] !== 'undefined')
	&& cases[value] || cases['default'] || false;

module.exports = ({state, actions}) => section('#ui', [
	header({state, actions}),
	_switch(state.route.page, pages)({state, actions})
]);
