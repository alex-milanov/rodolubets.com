'use strict';

const {
	section, h1, h2, h3, hr, header, i, ul, li,
	table, thead, tbody, tr, td, th
} = require('../../util/vdom');

module.exports = ({state, actions}) => header([
	section('.title', [
		h1('Родолюбец'),
		h3('Културно-просветно дружество за връзки с бесарабските и таврийските българи')
	]),
	ul('#menu', [
		li('Начало'),
		li('Новини'),
		li('За Нас'),
		li('Алманах'),
		li('Информация'),
		li('Изследвания'),
		li('Връзки'),
		li('.right', [
			i('.fa.fa-sign-in')
		])
	])
]);
