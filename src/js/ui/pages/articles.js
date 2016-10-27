'use strict';

const {
	section, h1, h2, h3, hr, header, i, ul, li, p,
	table, thead, tbody, tr, td, th, span, div, a
} = require('../../util/vdom');

const rightColumn = require('../right-column');

module.exports = ({state, actions}) => section('#content', [
	section('.articles', [
		section('.article', [
			h1('Публикации'),
			div('.menu', [
				ul([
					li([a({
						class: {active: state.category === false},
						on: {click: el => actions.selectCategory(false)}
					}, 'Всички')])
				].concat(state.articles.reduce((cats, a) => cats.concat(a.categories.filter(c => cats.indexOf(c) === -1) || []), []).map(category =>
					li([a({
						class: {active: category === state.category},
						on: {click: el => actions.selectCategory(category)}
					}, category)])
				)))
			])
		]),
		(state.route.pageId) ? state.articles.filter(a => a._id === state.route.pageId).map(article =>
			section('.article', [
				h1(article.title),
				p('.meta', [
					span('.left', article.categories && article.categories.join(', ') || ''),
					span('.right', (article.createdAt && `Публикувана на ${article.createdAt} от ` || '') + `${article.author || 'Д-во Родолюбец'}`)
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
