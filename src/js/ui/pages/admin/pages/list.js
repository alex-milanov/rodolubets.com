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
			on: {click: () => actions.router.go('admin/pages/new')}
		}, [i('.fa.fa-plus'), 'Добави страница'])
	]),
	table('.crud', [
		thead([tr([
			th('[width="400"]', 'Наименование'),
			th('[width="300"]', 'Пътека'),
			th('[width="120"]', 'Действия')
		])]),
		tbody(state.pages.list
			.map(page => tr([
				td(page.title),
				td(page.path),
				td([
					a(`.fa.fa-external-link[href="#/${page.path.split('.').join('/')}"][target="_blank"]`),
					button('.fa.fa-pencil', {
						on: {click: () => actions.router.go(`admin/pages/${page._id}`)}
					}),
					button('.fa.fa-trash')
				])
			])))
	])
]);
