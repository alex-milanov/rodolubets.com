'use strict';

const {
	section, h1, h2, h3, hr, header, i, ul, li, p, button, div, span,
	table, thead, tbody, tr, td, th, a, form, label, input, textarea
} = require('iblokz-snabbdom-helpers');

const marked = require('marked');
const moment = require('moment');

const find = (q, el = document) => Array.from(el.querySelectorAll(q));

const getParent = (el, tagName) => ([].concat(tagName).indexOf(el.tagName) > -1)
	? el
	: getParent(el.parentNode, tagName);

const getRangePoint = (el, offset) =>
	(el.nodeType === 3 || el.childNodes.length === 0)
		? ({el, offset: (el.textContent.length < offset) ? el.textContent.length : offset})
		: Array.from(el.childNodes).reduce(
			(rp, child) => (rp.el !== el)
				? rp
				: (child.textContent.length >= rp.offset)
					? getRangePoint(child, rp.offset)
					: {el, offset: rp.offset - child.textContent.length},
			{el, offset}
		);

const caret = {
	get: el => {
		let rows = find('p, li', el);
		console.log(rows);
		let range = window.getSelection().getRangeAt(0);
		let parentRow = getParent(range.startContainer, ['LI', 'P']);
		let colRange = document.createRange();
		colRange.setStart(parentRow, 0);
		colRange.setEnd(range.startContainer, range.startOffset);
		const row = rows.indexOf(parentRow);
		const col = colRange.toString().length;
		return {
			row,
			col
		};
	},
	set: (el, pos) => {
		const parentRow = find('p, li', el)[pos.row];
		const rp = getRangePoint(parentRow, pos.col);
		console.log(rp);
		let range = document.createRange();
		range.setStart(rp.el, rp.offset);
		range.setEnd(rp.el, rp.offset);
		const sel = window.getSelection();
		sel.removeAllRanges();
		sel.addRange(range);
	}
};

module.exports = ({state, actions}) =>
(state.articles.doc._id === state.router.pageId)
	? div('.edit', [
		form([
			div([
				label('Заглавие'),
				input('[type="text"][name="title"]', {props: {value: state.articles.doc.title || ''}})
			]),
			div([
				label('Автор'),
				input('[type="text"][name="author"]', {props: {value: state.articles.doc.author || ''}})
			]),
			div([
				label([
					'Текст',
					span('.right', [
						button('[type="button"]', {
							class: {on: state.wysiwyg},
							on: {click: () => actions.toggle('wysiwyg')}
						}, 'Wysiwyg'),
						button('[type="button"]', {
							class: {on: !state.wysiwyg},
							on: {click: () => actions.toggle('wysiwyg')}
						}, 'Markdown')
					])
				]),
				state.wysiwyg
					? div('.wysiwyg[contenteditable="true"]', {
						props: {innerHTML: marked(state.articles.doc.text)},
						on: {
							keydown: ev => console.log(caret.get(ev.target))
						}
					})
					: textarea('[name="text"]', state.articles.doc.text || '')
			])
		])
	])
	: '';
