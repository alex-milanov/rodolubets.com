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
		li([a('Начало')]),
		li([a('Новини')]),
		li([a('За Нас')]),
		li([a('Алманах')]),
		li([a('Информация')]),
		li([a('Изследвания')]),
		li([a('Връзки')]),
		li('.right', [a([
			i('.fa.fa-sign-in')
		])])
	])
]);
