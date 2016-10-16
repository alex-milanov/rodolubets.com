'use strict';

const moment = require('moment');
require('moment/locale/bg');

const getDays = () => {
	const today = moment();
	const startOfMonth = today.startOf('month');
	const endOfMonth = today.endOf('month');

	let iterator = moment().startOf('month').startOf('week');
	let days = [];

	while (iterator < endOfMonth) {
		let weekdays = [];
		for (let i = 0; i < 7; i++) {
			weekdays.push(iterator.get('date'));
			iterator.add(1, 'day');
		}
		days.push(weekdays);
	}
	return days;
};

const {
	section, h1, h2, h3, hr, header, i, ul, li,
	table, thead, tbody, tr, td, th, button
} = require('../../../util/vdom');

module.exports = ({state, actions}) => section('.calendar', [
	table([
		thead([
			tr([
				th([button('.fa.fa-step-backward')]),
				th([button('.fa.fa-backward')]),
				th({
					attrs: {
						colspan: 3
					},
					style: {
						textTransform: 'capitalize'
					}
				}, moment().format('MMMM Y')),
				th([button('.fa.fa-forward')]),
				th([button('.fa.fa-step-forward')])
			]),
			tr(['Пон', 'Вто', 'Сря', 'Чет', 'Пет', 'Съб', 'Нед'].map(wday =>
				th(wday)
			))
		]),
		tbody(getDays().map(week =>
			tr(
				week.map(day =>
					td(day)
				)
			))
		)
	])
]);
