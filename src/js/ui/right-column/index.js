'use strict';

const {
	section, h1, h2, h3, hr, header, i, ul, li, p, a,
	table, thead, tbody, tr, td, th, br
} = require('iblokz-snabbdom-helpers');

const moment = require('moment');
require('moment/locale/bg');

const calendar = require('./calendar');

const formatDate = ev => (moment(ev.start).format('DD') !== moment(ev.end).format('DD'))
	? moment(ev.start).format('DD') + '-' + moment(ev.end).format('DD.MM')
	: moment(ev.start).format('DD.MM HH:mm');

module.exports = ({state, actions}) => section('.right-column', [].concat(
	section([
		ul([
			// li([a('[href="https://goo.gl/maps/nuw3q3d9CuK2"][target="_blank"]', [
			// 	i('.fa.fa-map-marker'),
			// 	'бул. „Евлоги Георгиев“ 169, ет. II-ри'
			// ])]),
			li([a('[href="https://fb.com/groups/rodolubets"][target="_blank"]', [
				i('.fa.fa-facebook-official'),
				'Facebook Група на д-во Родолюбец'
			])]),
			li([a('[href="https://www.youtube.com/channel/UC29vwswzZgc4QjO0NDJKzdQ"][target="_blank"]', [
				i('.fa.fa-youtube'),
				'Youtube Канал на Дружеството'
			])]),
			li([a('[href="mailto:rodolubets@abv.bg"]', [
				i('.fa.fa-envelope-o'),
				'Ел. Поща: rodolubets at abv dot bg'
			])])
		])
	]),
	state.events.list && state.events.list.filter(ev => new Date(ev.end) >= new Date()).length > 0
		? section([
			h2('Предстои:'),
			ul(
				state.events.list.filter(ev => new Date(ev.end) >= new Date())
					.sort((a, b) => new Date(a.start) < new Date(b.start) ? 1 : -1)
					.map(ev =>
						li([a(
							`[href="${ev.url}"][target="_blank"]`,
							formatDate(ev) + ' ' + ev.name
						)])
					)
			)
			/*
			ul([
				li([a(
					'[href="https://www.facebook.com/events/678792822320208"][target="_blank"]',
					'26-28.10 Прояви по случай Деня на бесарабските българи'
				)])
			])
			*/
		]) : [],
	section([
		h2('Минали събития:'),
		ul(
			state.events.list && state.events.list.filter(ev => new Date(ev.end) < new Date())
				.sort((a, b) => new Date(a.start) < new Date(b.start) ? 1 : -1)
				.map(ev =>
					li([a(
						`[href="${ev.url}"][target="_blank"]`,
						formatDate(ev) + ' ' + ev.name
					)])
				) || []
		/*
			li([a(
				'[href="https://www.facebook.com/events/1131134003697555"][target="_blank"]',
				'21.07 Представяне на „Таврийски истории" на Леонид Паскалов", 18:00'
			)]),
			li([a(
				'[href="https://www.facebook.com/events/685338601674669"][target="_blank"]',
				'25.05 Представяне на "Да не угасват българските огнища извън България", 18:00'
			)]),
			li([a(
				'[href="https://www.facebook.com/events/616430778561488/"][target="_blank"]',
				'23.04 Великденска среща на д-во Родолюбец, 17:00 Славянска Беседа'
			)]),
			li([a(
				'[href="https://www.facebook.com/events/1878729519040663/"][target="_blank"]',
				'24.03 Нико Стоянов на 70 години, 18:00'
			)]),
			li([a(
				'[href="https://www.facebook.com/events/237310966716062/"][target="_blank"]',
				'24.02 Представяне на Алманах Родолюбец, брой 8-ми 2016г.'
			)]),
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
		*/
		)
	]),
	calendar({state, actions})
));
