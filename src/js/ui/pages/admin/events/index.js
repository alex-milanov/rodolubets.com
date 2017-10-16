'use strict';

const {
	section, h1, h2, h3, hr, header, i, ul, li, p, button, div, span,
	table, thead, tbody, tr, td, th, a, form, label, input, textarea
} = require('iblokz-snabbdom-helpers');

const marked = require('marked');
const moment = require('moment');

// crud
const list = require('./list');
const edit = require('./edit');

module.exports = ({state, actions}) => [
	section('.content', [
		ul('.breadcrumb', ['Администрация', 'Събития'].concat(
			state.router.pageId
				? (state.router.pageId === 'new') && ['Ново Събитие']
					|| [`Редактирай Събитие`]
				: []
		).map(item =>
			li(item)
		)),
		!state.router.pageId
			? list({state, actions})
			: edit({state, actions})
	])
];
