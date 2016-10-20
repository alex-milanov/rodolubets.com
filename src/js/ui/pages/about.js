'use strict';

const {
	section, h1, h2, h3, hr, header, i, ul, li, p,
	table, thead, tbody, tr, td, th
} = require('../../util/vdom');

const rightColumn = require('../right-column');
const marked = require('marked');

module.exports = ({state, actions}) => section('#content', [
	section('.articles', [
		section('.article', [
			h1('За Нас'),
			p({props:{innerHTML: marked(`
**Юридически Адрес:** София, бул. „Евлоги Георгиев“ N 169, ет. II-ри <br/>*(към момента дружеството не разполага с възможност да реализира дейността си на посочения адрес, поради смяна на наемодателя)*

**Facebook Група:** https://www.facebook.com/groups/211277872302747

**Ел. Адрес:** rodolubets at abv dot bg <br/>*(сменете at с "@" и dot с ".")*
`)}})
		])]
	),
	rightColumn({state, actions})
]);
