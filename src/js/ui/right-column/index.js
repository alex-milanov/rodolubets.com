'use strict';

const {
	section, h1, h2, h3, hr, header, i, ul, li, p, a,
	table, thead, tbody, tr, td, th, br
} = require('../../util/vdom');

const calendar = require('./calendar');

module.exports = ({state, actions}) => section('.right-column', [
	section([
		h2('Данни за контакт'),
		ul([
			li([a('[href="https://goo.gl/maps/nuw3q3d9CuK2"][target="_blank"]', [
				i('.fa.fa-map-marker'),
				'бул. „Евлоги Георгиев“ N 169, ет. II-ри'
			])]),
			li([a('[href="https://fb.com/groups/rodolubets"][target="_blank"]', [
				i('.fa.fa-facebook-official'),
				'Facebook Група на д-во Родолюбец'
			])]),
			li([
				i('.fa.fa-envelope-o'),
				'rodolubets at abv dot bg'
			])
		])
	]),
	section([
		h2('Предстоящи събития:'),
		ul([
			li([a({attrs: {href: 'https://www.facebook.com/events/191852797922713/', target: '_blank'}},
				'27.10 18:30 Традиционен празничен концерт, посветен на Деня на Бесарабските Българи'
			)]),
			li('Коледно Тържество')
		])
	]),
	calendar({state, actions})
]);
