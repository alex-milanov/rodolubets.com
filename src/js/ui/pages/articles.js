'use strict';

const {
	section, h1, h2, h3, hr, header, i, ul, li, p,
	table, thead, tbody, tr, td, th, span
} = require('../../util/vdom');

const rightColumn = require('../right-column');

module.exports = ({state, actions}) => section('#content', [
	section('.articles', state.articles.map(article =>
		section('.article', [
			h1(article.title),
			p('.meta', [
				span('.left', article.categories && article.categories.join(', ') || ''),
				span('.right', `Публикувана на ${article.createdAt} от ${article.author || 'Д-во Родолюбец'}`)
			]),
			p('.body', {props: {innerHTML: article.text}})
		]))
	),
	rightColumn({state, actions})
]);
