'use strict';

const Rx = require('rx');
const $ = Rx.Observable;

const {obj} = require('iblokz-data');

const initial = {
	signIn: false,
	editor: {
		wysiwyg: true,
		sel: {row: 0, col: 0, length: 0}
	}
};

const set = (path, val) => state => obj.patch(state, path, val);
const toggle = path => state => obj.patch(state, path, !obj.sub(state, path));

const editArticle = (text, sel) => state => obj.patch(
	obj.patch(state, ['articles', 'doc'], {text}),
	'editor', {sel}
);

module.exports = {
	set,
	toggle,
	editArticle,
	initial
};
