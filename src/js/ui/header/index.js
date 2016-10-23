'use strict';

const {
	section, h1, h2, h3, hr, header, i, ul, li, a,
	table, thead, tbody, tr, td, th, form, input, button, label
} = require('../../util/vdom');

module.exports = ({state, actions}) => header([
	section('.title', [
		h1('Дружество Родолюбец'),
		h3('Културно-просветно дружество за връзки с бесарабските и таврийските българи')
	]),
	ul('#menu', [
		li([a({attrs: {href: '#/'}, class: {active: state.route.page === 'home'}}, 'Начало')]),
		li([a({attrs: {href: '#/about'}, class: {active: state.route.page === 'about'}}, 'За Нас')]),
		li([a({attrs: {href: '#/almanac'}, class: {active: state.route.page === 'almanac'}}, 'Алманах')]),
		li([a({attrs: {href: '#/research'}, class: {active: state.route.page === 'research'}}, 'Изследвания')]),
		li([a({attrs: {href: '#/links'}, class: {active: state.route.page === 'links'}}, 'Връзки')]),
		li('.right', [
			(state.signInToggled)
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
				: a({on: {click: () => actions.signInToggle()}}, [
					i('.fa.fa-pencil-square-o')
				])
		])
	])
]);
