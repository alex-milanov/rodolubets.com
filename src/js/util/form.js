'use strict';

const {obj} = require('iblokz-data');

const toData = form => Array.from(form.elements)
	// .map(el => (console.log(el.name), el))
	.filter(el => el.name !== undefined && el.name !== '')
	.reduce((o, el) => obj.patch(o, el.name.split('.'),
		el.type && el.type === 'number'
			? Number(el.value)
			: el.value
	), {});

const clear = form => Array.from(form.elements)
	.filter(el => el.name !== undefined && el.name !== '')
	.forEach(el => (el.tagName === 'textarea' || el.type === 'text')
		? (el.value = '')
		: (el.type === 'number')
			? (el.value = null)
			: (el.value = undefined));

module.exports = {
	toData,
	clear
};
