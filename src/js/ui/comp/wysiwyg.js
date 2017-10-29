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
