'use strict';

const {
	section, h1, h2, h3, hr, header, i, ul, li, p, button, div, span,
	table, thead, tbody, tr, td, th, a, form, label, input, textarea
} = require('iblokz-snabbdom-helpers');

const marked = require('marked');
const moment = require('moment');

module.exports = ({state, actions}) => div([
	section('.post', [
		button({
			on: {click: () => actions.router.go('admin/events/new')}
		}, [i('.fa.fa-plus'), 'Добави събитие'])
	]),
	table('.crud', [
		thead([tr([
			th('[width="400"]', 'Текст'),
			th('[width="300"]', 'Връзка'),
			th('Начало'),
			th('Край'),
			th('[width="120"]', 'Действия')
		])]),
		tbody(state.events.list.map(event => tr([
			td(event.name),
			td(event.url),
			td(event.start),
			td(event.end),
			td([
				a(`.fa.fa-external-link[href="${event.url}"][target="_blank"]`),
				button('.fa.fa-pencil', {
					on: {click: () => actions.router.go(`admin/events/${event._id}`)}
				}),
				button('.fa.fa-trash')
			])
		])))
	])
]);
