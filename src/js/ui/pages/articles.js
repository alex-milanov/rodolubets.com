'use strict';

const {
	section, h1, h2, h3, hr, header, i, ul, li, p,
	table, thead, tbody, tr, td, th, span, div, a
} = require('iblokz/adapters/vdom');

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
					span('.right', [
						(article.publishedIn || article.createdAt) && 'Публикувана ' || '',
						article.publishedIn && `в ${article.publishedIn} ` || '',
						article.createdAt && `на ${article.createdAt} ` || '',
						article.author && `Автор: ${article.author}` || ''
					])
				]),
				p('.body', {props: {innerHTML: article.text}})
			])).pop()
		: section('.article', [
			div(state.articles
				.filter(a => !state.category || (a.categories.indexOf(state.category) > -1))
				.map(article =>
					div('.article-item', [
						a(`.title[href="#/articles/${article._id}"]`, article.title),
						p('.item-meta', [
							span('.left', article.categories && article.categories.join(', ') || ''),
							span('.right', [
								(article.publishedIn || article.createdAt) && 'Публикувана ' || '',
								article.publishedIn && `в ${article.publishedIn} ` || '',
								article.createdAt && `на ${article.createdAt} ` || '',
								article.author && `Автор: ${article.author}` || ''
							])
						])
					])
			))
		])
	]),
	rightColumn({state, actions})
]);
