'use strict';

const {
	section, h1, h2, h3, hr, header, i, ul, li, p,
	table, thead, tbody, tr, td, th, a
} = require('iblokz-snabbdom-helpers');

const marked = require('marked');

module.exports = ({state, actions}) => [
	section('.content', [
		ul('.breadcrumb', ['Администрация', 'Страници'].map(item =>
			li(item)
		)),
		section('.post', [
			p({props: {innerHTML: marked(`
				Добре Дошли!
			`)}})
		])
	])
];
