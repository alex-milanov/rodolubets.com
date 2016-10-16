'use strict';

const {
	section, h1, h2, h3, hr, header, i, ul, li, a,
	table, thead, tbody, tr, td, th
} = require('../../util/vdom');

module.exports = ({state, actions}) => header([
	section('.title', [
		h1('Родолюбец'),
		h3('Културно-просветно дружество за връзки с бесарабските и таврийските българи')
	]),
	ul('#menu', [
		li([a({attrs: {href: '#/'}}, 'Начало')]),
		li([a({attrs: {href: '#/about'}}, 'За Нас')]),
		li([a({attrs: {href: '#/almanac'}}, 'Алманах')]),
		li([a({attrs: {href: '#/info'}}, 'Информация')]),
		li([a({attrs: {href: '#/research'}}, 'Изследвания')]),
		li([a({attrs: {href: '#/links'}}, 'Връзки')]),
		li('.right', [a([
			i('.fa.fa-sign-in')
		])])
	])
]);
