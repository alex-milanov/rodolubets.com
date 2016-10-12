'use strict';

const {section} = require('../util/vdom');

const header = require('./header');
const content = require('./content');

module.exports = ({state, actions}) => section('#ui', [
	header({state, actions}),
	content({state, actions})
]);
