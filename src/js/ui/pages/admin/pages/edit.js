'use strict';

const {
	section, h1, h2, h3, hr, header, i, ul, li, p, button, div, span,
	table, thead, tbody, tr, td, th, a, form, label, input, textarea
} = require('iblokz-snabbdom-helpers');

const $ = require('rx').Observable;

const md = require('../../../../util/md');
const moment = require('moment');

const find = (q, el = document) => Array.from(el.querySelectorAll(q));

const getParent = (el, tagName) => ([].concat(tagName).indexOf(el.tagName) > -1)
	? el
	: getParent(el.parentNode, tagName);

const getRangePoint = (el, offset) =>
	(el.nodeType === 3 || el.childNodes.length === 0)
		? ({el, offset: (el.textContent.length < offset) ? el.textContent.length : offset})
		: Array.from(el.childNodes).reduce(
			(rp, child, index) => (rp.el !== el)
				? rp
				: (child.textContent.length >= rp.offset)
					? getRangePoint(child, rp.offset)
					: (index < el.childNodes.length - 1)
						? {el, offset: rp.offset - child.textContent.length}
						: {el: child, offset: child.textContent.length},
			{el, offset}
		);

const caret = {
	get: el => {
		let rows = find('p, li, div', el);
		console.log(rows);
		let range = window.getSelection().getRangeAt(0);
		let parentRow = getParent(range.startContainer, ['LI', 'P', 'DIV']);
		let colRange = document.createRange();
		colRange.setStart(parentRow, 0);
		colRange.setEnd(range.startContainer, range.startOffset);
		const row = rows.indexOf(parentRow);
		const col = colRange.toString().length;
		console.log(range.toString());
		return {
			row,
			col,
			length: range.toString().length
		};
	},
	set: (el, pos) => {
		const parentRow = find('p, li, div', el)[pos.row];
		if (parentRow) {
			const rp = getRangePoint(parentRow, pos.col);
			const ep = pos.length === 0 ? rp : getRangePoint(parentRow, pos.col + pos.length);
			console.log(parentRow, pos, rp);
			let range = document.createRange();
			range.setStart(rp.el, rp.offset);
			range.setEnd(ep.el, ep.offset);
			const sel = window.getSelection();
			sel.removeAllRanges();
			sel.addRange(range);
		}
	}
};

const formToData = form => Array.from(form.elements)
	.filter(el => el.name !== undefined)
	.reduce((o, el) => ((o[el.name] = el.value), o), {});

module.exports = ({state, actions}) =>
(state.pages.doc._id === state.router.pageId || state.router.pageId === 'new')
	? div('.edit', [
		form({
			on: {
				submit: ev => {
					ev.preventDefault();
					let data = formToData(ev.target);
					console.log(data, state.auth);
					actions.pages.save(data, state.auth.token);
					actions.router.go('admin.pages');
					return false;
				}
			}
		}, [
			state.pages.doc._id && input('[type="hidden"][name="_id"]', {props: {value: state.pages.doc._id || ''}}) || '',
			div([
				label('Заглавие'),
				input('[type="text"][name="title"]', {props: {value: state.pages.doc.title || ''}})
			]),
			div([
				label('Пътека'),
				input('[type="text"][name="path"]', {props: {value: state.pages.doc.path || ''}})
			]),
			div([
				label([
					'Съдържание',
					span('.right', [
						button('[type="button"]', {
							class: {on: state.editor.wysiwyg},
							on: {click: () => actions.toggle(['editor', 'wysiwyg'])}
						}, 'Wysiwyg'),
						button('[type="button"]', {
							class: {on: !state.editor.wysiwyg},
							on: {click: () => actions.toggle(['editor', 'wysiwyg'])}
						}, 'Markdown')
					])
				]),
				div({
					class: {
						wysiwyg: state.editor.wysiwyg
					}
				}, [
					div('[contenteditable="true"]', {
						props: {innerHTML: md.toHTML(state.pages.doc.content || '<p>&nbsp;</p>')},
						on: {
							focus: ({target}) => $.fromEvent(target, 'input')
								.map(ev => ev.target)
								.takeUntil($.fromEvent(target, 'blur'))
								.debounce(500)
								.subscribe(el =>
									actions.edit({
										res: 'pages',
										field: 'content',
										value: md.fromHTML(el.innerHTML),
										sel: caret.get(el)
									})
								)
						},
						hook: {
							postpatch: (oldvnode, {elm}) => caret.set(elm, state.editor.sel)
						}
					}),
					textarea('[name="content"]', {
						on: {
							focus: ({target}) => $.fromEvent(target, 'input')
								.map(ev => ev.target)
								.takeUntil($.fromEvent(target, 'blur'))
								.debounce(500)
								.subscribe(el => actions.set(['pages', 'doc', 'text'], el.value))
						},
						props: {
							innerHTML: state.pages.doc.content || ''
						}
					})
				])
			]),
			div([
				button('[type="submit"]', 'Save')
			])
		])
	])
	: '';
