'use strict';

const {
	section, h1, h2, h3, hr, header, i, ul, li, p,
	table, thead, tbody, tr, td, th, span, div, a
} = require('iblokz-snabbdom-helpers');

const rightColumn = require('../right-column');

const marked = require('marked');
const moment = require('moment');

module.exports = ({state, actions}) => [
	section('.content', [
		section('.post', [
			h1('Публикации'),
			div('.menu', [
				ul([
					li([a({
						class: {active:
							state.articles.query.categories !== undefined
							&& (state.articles.query.categories === false)
						},
						on: {click: el => {
							actions.articles.query({categories: false});
							if (state.router.pageId !== null) actions.router.go('articles');
						}}
					}, 'Без')]),
					li([a({
						class: {active:
							state.articles.query.categories === undefined || (state.articles.query.categories === '')},
						on: {click: el => {
							actions.articles.query({categories: ''});
							if (state.router.pageId !== null) actions.router.go('articles');
						}}
					}, 'Всички')])
				].concat(
					state.articles.list
						.reduce((cats, a) =>
							cats.concat(a.categories.filter(c => cats.indexOf(c) === -1) || []), [])
						.map(category =>
							li([a({
								class: {active:
									state.articles.query.categories && category === state.articles.query.categories},
								on: {click: el => {
									actions.articles.query({categories: category});
									if (state.router.pageId !== null) actions.router.go('articles');
								}}
							}, category)])
				)))
			])
		]),
		(state.router.pageId && state.articles.doc._id === state.router.pageId)
			? section('.post', [
				h1(state.articles.doc.title),
				p('.meta', [
					span('.left', state.articles.doc.categories && state.articles.doc.categories.join(', ') || ''),
					span('.right', [
						(state.articles.doc.publishedIn || state.articles.doc.createdAt) && 'Публикувана ' || '',
						state.articles.doc.publishedIn && `в ${state.articles.doc.publishedIn} ` || '',
						state.articles.doc.createdAt && `на ${moment(state.articles.doc.createdAt).format('DD MMMM Y')} ` || '',
						state.articles.doc.author && `Автор: ${state.articles.doc.author}` || ''
					])
				]),
				p('.body', {props: {innerHTML: marked(state.articles.doc.text)}})
			])
			: section('.post', [
				div(state.articles.list
					.map(article =>
						div('.article-item', [
							a(`.title[href="#/articles/${article._id}"]`, article.title),
							p('.item-meta', [
								span('.left', article.categories && article.categories.join(', ') || ''),
								span('.right', [
									(article.publishedIn || article.createdAt) && 'Публикувана ' || '',
									article.publishedIn && `в ${article.publishedIn} ` || '',
									article.createdAt && `на ${moment(article.createdAt).format('DD MMMM Y')} ` || '',
									article.author && `Автор: ${article.author}` || ''
								])
							])
						])
					)
				)
			])
	]),
	rightColumn({state, actions})
];
