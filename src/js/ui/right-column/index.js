'use strict';

const {
	section, h1, h2, h3, hr, header, i, ul, li, p,
	table, thead, tbody, tr, td, th
} = require('../../util/vdom');

const calendar = require('./calendar');

module.exports = ({state, actions}) => section('.right-column', [
	section([
		h2('Предстоящи събития:'),
		ul([
			li('27.10 18:30 Традиционен празничен концерт, посветен на Деня на Бесарабските Българи'),
			li('Коледно Тържество')
		])
	]),
	calendar({state, actions})
]);
