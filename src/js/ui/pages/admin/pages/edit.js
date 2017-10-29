'use strict';

const {
	section, h1, h2, h3, hr, header, i, ul, li, p, button, div, span,
	table, thead, tbody, tr, td, th, a, form, label, input, textarea
} = require('iblokz-snabbdom-helpers');

// comp
const wysiwygComp = require('../../../comp/wysiwyg');

const {Observable: $} = require('rx');
const moment = require('moment');

const formUtil = require('../../../../util/form');

module.exports = ({state, actions}) =>
(state.pages.doc._id === state.router.pageId || state.router.pageId === 'new')
	? div('.edit', [
		form({
			on: {
				submit: ev => {
					ev.preventDefault();
					let data = formUtil.toData(ev.target);
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
				wysiwygComp({
					toggled: state.editor.wysiwyg,
					content: state.pages.doc.content,
					sel: state.editor.sel,
					field: 'content',
					cb: ({value, sel}) => actions.edit({res: 'pages', field: 'content', value, sel})
				})
			]),
			div([
				button('[type="submit"]', 'Save')
			])
		])
	])
	: '';
