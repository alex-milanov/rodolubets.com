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
			on: {click: () => actions.router.go('admin/articles/new')}
		}, [i('.fa.fa-plus'), 'Добави публикация'])
	]),
	table('.crud', [
		thead([tr([
			th('[width="600"]', 'Заглавие'),
			th('Автор'),
			th('Категории'),
			th('Дата'),
			th('Издание'),
			th('Закачена'),
			th('[width="120"]', 'Действия')
		])]),
		tbody(state.articles.list.map(article => tr([
			td(article.title),
			td(article.author),
			td(article.categories),
			td(article.createdAt),
			td(article.publishedIn),
			td('[align="center"]', [a(i('.fa', {
				on: {
					click: () => actions.articles.update(article._id, {
						pinned: !article.pinned
					}, state.auth.token)
				},
				class: {
					'fa-toggle-on': article.pinned,
					'fa-toggle-off': !article.pinned
				}
			}))]),
			td([
				button('.fa.fa-external-link', {
					on: {click: () => actions.router.go(`articles/${article._id}`)}
				}),
				button('.fa.fa-pencil', {
					on: {click: () => actions.router.go(`admin/articles/${article._id}`)}
				}),
				button('.fa.fa-trash')
			])
		])))
	])
]);
