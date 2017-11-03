'use strict';

const {
	section, h1, h2, h3, hr, header, i, ul, li, a, span,
	table, thead, tbody, tr, td, th, form, input, button, label
} = require('iblokz-snabbdom-helpers');

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
		{page: 'admin.pages', href: '#/admin/pages', title: 'Страници'},
		{page: 'admin.assets', href: '#/admin/assets', title: 'Файлове'}
	]
};

const formToData = form => Array.from(form.elements)
	// .map(el => (console.log(el.name), el))
	.filter(el => el.name !== undefined)
	.reduce((o, el) => ((o[el.name] = el.value), o), {});

module.exports = ({state, actions}) => header([
	!state.router.admin ? section('.title', [
		h1('Дружество Родолюбец'),
		h3('Културно-просветно дружество за връзки с бесарабските и таврийските българи')
	]) : '',
	ul('#menu', [].concat(
		(state.auth.user) && li(
			(state.router.admin)
				? a('[href="#/"][title="Начална страница"]', [
					i('.fa.fa-newspaper-o')
				])
				: a('[href="#/admin/"][title="Администрация"]', [
					i('.fa.fa-dashboard')
				])
		) || '',
		links[state.router.admin ? 'admin' : 'front'].map(link =>
			li([a(
				`[href="${link.href}"]`,
				{class: {active: link.page === state.router.page}},
				link.title
			)])
		),
		[
			li('.right',
				(!state.auth.user)
					? [(state.signIn)
						// login form
						? form({
							on: {
								submit: ev => {
									ev.preventDefault();
									let data = formToData(ev.target);
									actions.auth.login(data);
								}
							}
						}, [
							label('[for="login-email"]', [i('.fa.fa-user')]),
							input('#login-email[name="email"][placeholder="Потребителско име"]'),
							label('[for="login-pass"]', [i('.fa.fa-key')]),
							input('#login-password[name="password"][type="password"][placeholder="Парола"]'),
							button([
								i('.fa.fa-sign-in')
							]),
							a({on: {click: () => actions.toggle('signIn')}}, [
								i('.fa.fa-close')
							])
						])
						// toggle button
						: a({on: {click: () => actions.toggle('signIn')}}, [
							i('.fa.fa-pencil-square-o')
						])
					]
				: [
					span(state.auth.user.name || state.auth.user.email),
					button({
						on: {click: () => actions.auth.logout()}
					}, [
						i('.fa.fa-sign-out')
					])
				])
		]
	))
]);
