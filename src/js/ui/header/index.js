'use strict';

const {
	section, h1, h2, h3, hr, header, i, ul, li, a,
	table, thead, tbody, tr, td, th, form, input, button, label
} = require('iblokz/adapters/vdom');

const links = {
	front: [
		{page: 'home', href: '#/', title: 'Начало'},
		{page: 'about', href: '#/about', title: 'За Дружеството'},
		{page: 'almanac', href: '#/almanac', title: 'Алманах Родолюбец'},
		{page: 'articles', href: '#/articles', title: 'Публикации'},
		{page: 'links', href: '#/links', title: 'Връзки'}
	],
	admin: [
		{page: 'admin.home', href: '#/admin', title: 'Табло'},
		{page: 'admin.articles', href: '#/admin/articles', title: 'Публикации'},
		{page: 'admin.events', href: '#/admin/events', title: 'Събития'},
		{page: 'admin.pages', href: '#/admin/pages', title: 'Страници'}
	]
};

module.exports = ({state, actions}) => header([
	!state.route.admin ? section('.title', [
		h1('Дружество Родолюбец'),
		h3('Културно-просветно дружество за връзки с бесарабските и таврийските българи')
	]) : '',
	ul('#menu', links[state.route.admin ? 'admin' : 'front'].map(link =>
		li([a(
			`[href="${link.href}"]`,
			{class: {active: link.page === state.route.page}},
			link.title
		)])
	).concat(
		[
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
		]
	))
]);
