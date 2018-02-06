'use strict';

const {
	section, h1, h2, h3, hr, header, i, ul, li, p, div,
	table, thead, tbody, tr, td, th, button, textarea
} = require('iblokz-snabbdom-helpers');

const {Observable: $} = require('rx');

const md = require('../../util/md');
const caret = require('../../util/caret');

module.exports = ({toggled, content, field, sel, cb}) => div({
	class: {
		wysiwyg: toggled
	}
}, [
	ul('.toolbar', [
		li(button('.fa.fa-bold', {on: {click: ev => (ev.preventDefault(), document.execCommand('bold'))}})),
		li(button('.fa.fa-italic', {on: {click: ev => (ev.preventDefault(), document.execCommand('italic'))}})),
		li(button('.fa.fa-underline', {on: {click: ev => (ev.preventDefault(), document.execCommand('underline'))}})),
		li('  '),
		li(button('.fa.fa-list-ul', {on: {click: ev => (ev.preventDefault(), document.execCommand('insertUnorderedList'))}})),
		li(button('.fa.fa-list-ol', {on: {click: ev => (ev.preventDefault(), document.execCommand('insertOrderedList'))}})),
		li('  '),
		li(button('.fa.fa-outdent', {on: {click: ev => (ev.preventDefault(), document.execCommand('outdent'))}})),
		li(button('.fa.fa-indent', {on: {click: ev => (ev.preventDefault(), document.execCommand('indent'))}})),
		li('  '),
		li(button('.fa.fa-image', {on: {click: ev => (ev.preventDefault())}})),
		li(button('.fa.fa-link', {on: {click: ev => (ev.preventDefault())}}))
		
	]),
	div('[contenteditable="true"]', {
		props: {innerHTML: md.toHTML(content || '<p>&nbsp;</p>')},
		on: {
			focus: ({target}) => $.fromEvent(target, 'input')
				.map(ev => ev.target)
				.takeUntil($.fromEvent(target, 'blur'))
				.debounce(500)
				.subscribe(el =>
					cb({
						value: md.fromHTML(el.innerHTML),
						sel: caret.get(el)
					})
				)
		},
		hook: {
			postpatch: (oldvnode, {elm}) => toggled && caret.set(elm, sel)
		}
	}),
	textarea(`[name="${field}"]`, {
		on: {
			focus: ({target}) => $.fromEvent(target, 'input')
				.map(ev => ev.target)
				.takeUntil($.fromEvent(target, 'blur'))
				.debounce(500)
				.subscribe(({value}) => cb({value, sel}))
		},
		props: {
			innerHTML: content || ''
		}
	})
]);
