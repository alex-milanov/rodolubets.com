'use strict';

const {
	section, h1, h2, h3, hr, header, i, ul, li, p,
	table, thead, tbody, tr, td, th
} = require('../../util/vdom');

const rightColumn = require('../right-column');

module.exports = ({state, actions}) => section('#content', [
	section('.articles', [
		section('.article', [
			h1('За Нас')
		])]
	),
	rightColumn({state, actions})
]);
