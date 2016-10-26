'use strict';

const {
	section, h1, h2, h3, hr, header, i, ul, li, p,
	table, thead, tbody, tr, td, th, span, div, a
} = require('../../util/vdom');

const rightColumn = require('../right-column');
const categories = [
	{
		title: "Изследвания"
	},
	{
		title: "Личности"
	},
	{
		title: "Информация"
	}
]

module.exports = ({state, actions}) => section('#content', [
	section('.articles', [
			section('.article', [
				h1('Публикации'),
				div('.menu', [
					ul([
						li([a('.active', 'Всички')])
					].concat(categories.map(c =>
						li([a(c.title)])
					)))
				])
			]),
			(state.route.pageId) ? state.articles.filter(a => a._id === state.route.pageId).map(article =>
				section('.article', [
					h1(article.title),
					p('.meta', [
						span('.left', article.categories && article.categories.join(', ') || ''),
						span('.right', `Публикувана на ${article.createdAt} от ${article.author || 'Д-во Родолюбец'}`)
					]),
					p('.body', {props: {innerHTML: article.text}})
				])).pop()
			: section('.article', [
				div(state.articles.map(article =>
					div('.article-item', [
						a(`.title[href="#/articles/${article._id}"]`, article.title),
						p(`Публикувана на ${article.createdAt} от ${article.author || 'Д-во Родолюбец'}`),
						p('.article-categories', article.categories && article.categories.join(', ') || '')
					])
				))
			])
	]),
	rightColumn({state, actions})
]);
