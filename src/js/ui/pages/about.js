'use strict';

const {
	section, h1, h2, h3, hr, header, i, ul, li, p,
	table, thead, tbody, tr, td, th
} = require('../../util/vdom');

const rightColumn = require('../right-column');
const marked = require('marked');
marked.setOptions({
	gfm: true,
	tables: true
});

module.exports = ({state, actions}) => section('#content', [
	section('.articles', [
		section('.article', [
			h1('За Дружеството')
		]),
		section('.article', [
			p({props: {innerHTML: marked(`
Дружеството за приятелство и културни връзки с бесарабските и таврийските българи „Родолюбец” е основано в началото на 1990 г.

На 15 януари в София учредителното събрание приема Устава на дружеството, а решението за регистрация на Софийския градски съд е от 28.06.1990 г.

През тези повече от 25 години дружество „Родолюбец” пое отгворноста и огромната задача да запознае българите в България със съществуването на наши сънародници в Молдова, Украйна, Казахстан, Сибир... Дружеството има заслуга и за появата на 103 постановление на Министерския съвет на Република България за приемане на наши сънародници от бившите съветски републики за студенти у нас.

Издаването на алманаха „Родолюбец” стана необходимо помагало на учителите, които тръгват към нашите забравени сънародници. В 1998 г. дружеството възстанови отбелязването Деня на бесарабските българи. Радостно е, че и в селищата на нашите сънародници в някогашните Бесарабия и Таврия този Ден вече намира място в празничния им календар.

Членове на нашето дружество изнасят в селища с компактно българско население концерти – топла и сърдечна връзка със старата родина. Студентите и завръщащите се завинаги в България бесарабски и таврийски българи могат да разчитат на приятелска подкрепа от дружество „Родолюбец”.

`)}})
		])]
	),
	rightColumn({state, actions})
]);
