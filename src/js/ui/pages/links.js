'use strict';

const {
	section, h1, h2, h3, hr, header, i, ul, li, p,
	table, thead, tbody, tr, td, th, a
} = require('iblokz-snabbdom-helpers');

const marked = require('marked');

const rightColumn = require('../right-column');

module.exports = ({state, actions}) => [
	section('.content', [
		section('.post', [
			h1('Връзки')
		]),
		section('.post', [
			p({props: {innerHTML: marked(`
- [Държавна агенция за българите в чужбина](http://aba.government.bg)
- [Министерството на образованието и науката > За българите зад граница](http://www.mon.bg/?go=page&amp;pageId=15&amp;subpageId=173)
- [Научно дружество на българистите в Република Молдова](http://ndb.md/)
- [Българска Виртуална Библиотека](http://slovo.bg)
- [Вестник "Роден Край" - Одеса](http://www.rodenkray.od.ua/)
- [Архивни материали за Родолюбец (omda.bg)](http://prehod.omda.bg/page.php?IDMenu=642&IDLang=1)
- [Архивни материали по въпросите на българите зад граница (omda.bg)](http://prehod.omda.bg/page.php/?IDMenu=604)
			`)}})
		])
	]),
	rightColumn({state, actions})
];
