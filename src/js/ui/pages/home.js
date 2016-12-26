'use strict';

const {
	section, h1, h2, h3, hr, header, i, ul, li, p,
	table, thead, tbody, tr, td, th, span, a, img
} = require('iblokz/adapters/vdom');

const rightColumn = require('../right-column');

const pinnedFirst = articles => articles
	.reduce((list, a) => a.pinned ? [a].concat(list) : list.concat(a), []);

module.exports = ({state, actions}) => [
	section('.content', [
		/*
		a('[href="https://www.facebook.com/events/1781298892137645/"][target="_blank"]', [
			img('.article[src="/img/mh100.png"][style="padding: 0"]')
		])
		*/
	].concat(pinnedFirst(state.articles).map(article =>
		section('.post', [
			h1([a(`[href="#/articles/${article._id}"]`, article.title)]),
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
		]))
	)),
	rightColumn({state, actions})
];
