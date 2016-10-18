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
		li([a({attrs: {href: '#/'}, class: {active: state.route.page === 'home'}}, 'Начало')]),
		li([a({attrs: {href: '#/about'}, class: {active: state.route.page === 'about'}}, 'За Нас')]),
		li([a({attrs: {href: '#/almanac'}, class: {active: state.route.page === 'almanac'}}, 'Алманах')]),
		li([a({attrs: {href: '#/info'}, class: {active: state.route.page === 'info'}}, 'Информация')]),
		li([a({attrs: {href: '#/research'}, class: {active: state.route.page === 'research'}}, 'Изследвания')]),
		li([a({attrs: {href: '#/links'}, class: {active: state.route.page === 'links'}}, 'Връзки')]),
		li('.right', [a([
			i('.fa.fa-sign-in')
		])])
	])
]);
