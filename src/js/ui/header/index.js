'use strict';

const {
	section, h1, h2, h3, hr, header, i, ul, li, a,
	table, thead, tbody, tr, td, th, form, input, button, label
} = require('../../util/vdom');

const links = [
	{page: 'home', href: '#/', title: 'Начало'},
	{page: 'about', href: '#/about', title: 'За Нас'},
	{page: 'almanac', href: '#/almanac', title: 'Алманах'},
	{page: 'research', href: '#/research', title: 'Изследвания'},
	{page: 'links', href: '#/links', title: 'Връзки'}
];

module.exports = ({state, actions}) => header([
	section('.title', [
		h1('Дружество Родолюбец'),
		h3('Културно-просветно дружество за връзки с бесарабските и таврийските българи')
	]),
	ul('#menu', links.map(link =>
		li([a(
			`[href="${link.href}"]`,
			{class: {active: link.page === state.route.page}},
			link.title
		)])
	).concat([
		li('.right', [(state.signInToggled)
			// login form
			? form([
				label('[for="login-user"]', [i('.fa.fa-user')]),
				input('#login-user[name="user"][placeholder="Потребителско име"]'),
				label('[for="login-pass"]', [i('.fa.fa-key')]),
				input('#login-pass[name="pass"][type="password"][placeholder="Парола"]'),
				button([
					i('.fa.fa-sign-in')
				]),
				a({on: {click: () => actions.signInToggle()}}, [
					i('.fa.fa-close')
				])
			])
			// toggle button
			: a({on: {click: () => actions.signInToggle()}}, [
				i('.fa.fa-pencil-square-o')
			])
		])
	]))
]);
