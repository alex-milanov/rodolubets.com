'use strict';

const {
	section, h1, h2, h3, hr, header, i, ul, li, p, a,
	table, thead, tbody, tr, td, th, br
} = require('iblokz/adapters/vdom');

const calendar = require('./calendar');

module.exports = ({state, actions}) => section('.right-column', [
	section([
		h2('За контакт:'),
		ul([
			li([a('[href="https://goo.gl/maps/nuw3q3d9CuK2"][target="_blank"]', [
				i('.fa.fa-map-marker'),
				'бул. „Евлоги Георгиев“ 169, ет. II-ри'
			])]),
			li([a('[href="https://fb.com/groups/rodolubets"][target="_blank"]', [
				i('.fa.fa-facebook-official'),
				'Facebook Група на д-во Родолюбец'
			])]),
			li([a('[href="mailto:rodolubets@abv.bg"]', [
				i('.fa.fa-envelope-o'),
				'rodolubets at abv dot bg'
			])])
		])
	]),
	section([
		h2('Предстоящи събития:'),
		ul([
			li([a(
				'[href="https://www.facebook.com/events/237310966716062/"][target="_blank"]',
				'24.02 Представяне на Алманах Родолюбец, брой 8-ми 2016г.'
			)])
		])
	]),
	section([
		h2('Минали събития:'),
		ul([
			li([a(
				'[href="https://www.facebook.com/events/224414394672363/"][target="_blank"]',
				'13.01 Отбелязване 90-годишнината от рождението на Петър Недов 17:30ч.'
			)]),
			li([a(
				'[href="https://www.facebook.com/events/391007054575193/"][target="_blank"]',
				'15.12 Коледно-новогодишна среща на д-во Родолюбец 18:00-22:00ч. читалище Славянска Беседа'
			)]),
			li([a(
				'[href="https://www.facebook.com/events/1781298892137645/"][target="_blank"]',
				'17-24.11 Честване на 100 годишнина от рождението на Мишо Хаджийски'
			)]),
			li([a(
				'[href="https://www.facebook.com/events/191852797922713/"][target="_blank"]',
				'27.10 18:30 Традиционен празничен концерт, посветен на Деня на Бесарабските Българи'
			)])
		])
	]),
	calendar({state, actions})
]);
