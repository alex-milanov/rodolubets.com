'use strict';

const {
	section, h1, h2, h3, hr, header, i, ul, li, p, button,
	table, thead, tbody, tr, td, th, a, form, label, input, textarea
} = require('iblokz/adapters/vdom');

const marked = require('marked');

module.exports = ({state, actions}) => [
	section('.content', [
		ul('.breadcrumb', ['Администрация', 'Публикации'].concat(
			state.route.pageId
				? (state.route.pageId === 'new') && ['Нова Публикация']
					|| [`Редактирай Публикация`]
				: []
		).map(item =>
			li(item)
		)),
		!state.route.pageId ? section('.post', [
			button({
				on: {click: () => actions.router.go('admin/articles/new')}
			}, [i('.fa.fa-plus'), 'Добави публикация'])
		]) : '',
		!state.route.pageId ? table('.crud', [
			thead([tr([
				th('[width="600"]', 'Заглавие'),
				th('Автор'),
				th('Категории'),
				th('Дата'),
				th('Издание'),
				th('[width="120"]', 'Действия')
			])]),
			tbody(state.articles.map(article => tr([
				td(article.title),
				td(article.author),
				td(article.categories),
				td(article.createdAt),
				td(article.publishedIn),
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
		]) : '',
		state.route.pageId ? state.articles.filter(a => a._id === state.route.pageId).map(article =>
			form([
				label('Заглавие'),
				input('[type="text"][name="title"]', {props: {value: article.title || ''}}),
				label('Автор'),
				input('[type="text"][name="author"]', {props: {value: article.author || ''}}),
				label('Текст'),
				textarea('[name="text"]', article.text || '')
			])
		).pop() : ''
	])
];
