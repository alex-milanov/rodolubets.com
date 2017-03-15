'use strict';

const Rx = require('rx');
const $ = Rx.Observable;

const {obj} = require('iblokz-data');

const initial = {
	signIn: false,
	wysiwyg: true
};

const toggle = p => state => obj.patch(state, p, !obj.sub(state, p));

module.exports = {
	toggle,
	initial
};
