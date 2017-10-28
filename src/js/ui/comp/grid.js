'use strict';

const {
	section, h1, h2, h3, hr, header, i, ul, li, p,
	table, thead, tbody, tr, td, th, button, div
} = require('iblokz-snabbdom-helpers');

const {str} = require('iblokz-data');

const verbUI = verb => button(
	{on: {click: ev => verb.handler(ev)}},
	[].concat(
		verb.icon && i(`.fa.${verb.icon}[alt="${verb.alt}"]`) || [],
		verb.title || []
	)
);

module.exports = ({fields, verbs, list}) => div('.crud', [
	section('.post', verbs.filter(verb => verb.section === 'post').map(verbUI)),
	table('.list', [
		thead(tr([].concat(fields, 'действия').map(str.capitalize).map(
			field => th(field)
		))),
		tbody(list.map(row =>
			tr([].concat(
				fields.map(field =>
					td(row[field])
				),
				td(verbs.filter(verb => verb.section === 'list').map(verbUI))
			))
		))
	])
]);
