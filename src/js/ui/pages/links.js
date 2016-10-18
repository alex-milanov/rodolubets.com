'use strict';

const {
	section, h1, h2, h3, hr, header, i, ul, li, p,
	table, thead, tbody, tr, td, th, a
} = require('../../util/vdom');

const marked = require('marked');

const rightColumn = require('../right-column');

module.exports = ({state, actions}) => section('#content', [
	section('.articles', [
		section('.article', [
			h1('Полезни Връзки'),
			p({props: {innerHTML: marked(`
- [Държавна агенция за българите в чужбина](http://aba.government.bg)
- [Министерството на образованието и науката / За българите зад граница](http://www.mon.bg/?go=page&amp;pageId=15&amp;subpageId=173)
- [Научно дружество на българистите в Република Молдова](http://ndb.md/)
- [Българска Виртуална Библиотека](http://slovo.bg)
- [Вестник "Роден Край" - Одеса](http://www.rodenkray.od.ua/)
			`)}})
		])
	]),
	rightColumn({state, actions})
]);
