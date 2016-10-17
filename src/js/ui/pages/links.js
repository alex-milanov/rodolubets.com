'use strict';

const {
	section, h1, h2, h3, hr, header, i, ul, li, p,
	table, thead, tbody, tr, td, th, a
} = require('../../util/vdom');

const rightColumn = require('../right-column');

module.exports = ({state, actions}) => section('#content', [
	section('.articles', [
		section('.article', [
			h1('Полезни Връзки'),
			h2('Интернет страници:'),
			ul([
				li([a({attrs: {href: 'http://aba.government.bg', target: '_blank'}},
					'Държавна агенция за българите в чужбина')]),
				li([a({attrs: {href: 'http://www.mon.bg/?go=page&amp;pageId=15&amp;subpageId=173', target: '_blank'}},
					'Министерството на образованието и науката / За българите зад граница')
				]),
				li([a({attrs: {href: 'http://ndb.md/', target: '_blank'}}, 'Научно дружество на българистите в Република Молдова')]),
				li([a({attrs: {href: 'http://slovo.bg', target: '_blank'}}, 'Българска Виртуална Библиотека')]),
				li([a({attrs: {href: 'http://www.rodenkray.od.ua/', target: '_blank'}}, 'Вестник "Роден Край" - Одеса')])
			])
		])
	]),
	rightColumn({state, actions})
]);
