'use strict';

const {
	section, h1, h2, h3, hr, header, i, ul, li, p,
	table, thead, tbody, tr, td, th
} = require('iblokz-snabbdom-helpers');

const marked = require('marked');
marked.setOptions({
	gfm: true,
	tables: true
});

module.exports = ({page, rightColumn}) => [
	section('.content', [
		section('.post', [
			h1(page.title)
		]),
		section('.post', [
			p({props: {innerHTML: marked(
				page.content
			)}})
		])
	]),
	rightColumn
];
