'use strict';
// lib
const {Observable: $} = require('rx');
// util
const formUtil = require('../../../../util/form');

// ui
const {
	section, h1, h2, h3, hr, header, i, ul, li, p, button, div, span,
	table, thead, tbody, tr, td, th, a, form, label, input, textarea
} = require('iblokz-snabbdom-helpers');
// comp
const wysiwygComp = require('../../../comp/wysiwyg');

module.exports = ({state, actions}) =>
(state.articles.doc._id === state.router.pageId || state.router.pageId === 'new')
	? div('.edit', [
		form({
			on: {
				submit: ev => {
					ev.preventDefault();
					let data = formUtil.toData(ev.target);
					data.categories = (data.categories || '').split(',').map(c => c.trim());
					console.log(data, state.auth);
					actions.articles.save(data, state.auth.token);
					actions.router.go('admin.articles');
					return false;
				}
			}
		}, [
			state.articles.doc._id && input('[type="hidden"][name="_id"]', {props: {value: state.articles.doc._id || ''}}) || '',
			div([
				label('Заглавие'),
				input('[type="text"][name="title"]', {props: {value: state.articles.doc.title || ''}})
			]),
			div([
				label('Автор'),
				input('[type="text"][name="author"]', {props: {value: state.articles.doc.author || ''}})
			]),
			div([
				label('Издание'),
				input('[type="text"][name="publishedIn"]', {props: {value: state.articles.doc.publishedIn || ''}})
			]),
			div([
				label('Категории'),
				input('[type="text"][name="categories"]', {props: {value: (state.articles.doc.categories || []).join(', ')}})
			]),
			div([
				label([
					'Текст',
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
					content: state.articles.doc.text,
					sel: state.editor.sel,
					field: 'text',
					cb: ({value, sel}) => actions.edit({res: 'articles', field: 'text', value, sel})
				})
			]),
			div([
				button('[type="submit"]', 'Save')
			])
		])
	])
	: '';
