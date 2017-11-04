'use strict';

const path = require('path');

const {
	section, h1, h2, h3, hr, header, i, ul, li, p, button, div, span, img,
	table, thead, tbody, tr, td, th, a, form, label, input, textarea
} = require('iblokz-snabbdom-helpers');

const agent = require('superagent');

// comp
// const grid = require('../../../comp/grid');

// crud
// const list = require('./list');
// const edit = require('./edit');

const fileUtil = require('../../../../util/file');

const openDialog = cb => {
	let fileEl = document.createElement('input');
	fileEl.setAttribute('type', 'file');
	fileEl.addEventListener('change', ev => {
		console.log(ev.target.files, this);
		cb(
			ev.target.files
		);
	});
	fileEl.dispatchEvent(new MouseEvent('click', {
		view: window,
		bubbles: true,
		cancelable: true
	}));
};

module.exports = ({state, actions}) => [
	section('.content', [
		ul('.breadcrumb', ['Администрация', 'Файлове']
			.map(item => li(item))),
		div([
			section('.post.assets', [
				ul('.folders', [].concat(
						state.router.pageId ? {name: '..'} : [],
						state.assets.list.filter(asset => asset.type === 'dir')
					).map(asset =>
					li(a(`[href="#/admin/assets` + path.resolve(state.router.pageId || '', asset.name) + `"]`, asset.name))
				)),
				div('.files', [].concat(
					state.assets.list.filter(asset => asset.type === 'file').map(asset =>
						a(`.file[target="_blank"][href="/api/assets` + path.resolve(state.router.pageId || '', asset.name) + `"]`, [
							div('.thumb', asset.name.match(/.(gif|jpeg|jpg|png|svg)/)
								? img(`[src=/api/assets/` + path.resolve(state.router.pageId || '', asset.name) + `]`)
								: i('.fa' + (asset.name.match(/.pdf/) ? '.fa-file-pdf-o' : '.fa-file-o'))
							),
							div('.name', asset.name)
						])
					),
					div('.file', {
						on: {
							click: ev => openDialog(files =>
									agent.put(path.resolve('/api/assets/', state.router.pageId || '', files[0].name))
										.attach('theFile', files[0])
										.then(() => actions.assets.list(state.assets.query, state.router.pageId || ''))
							)
						}
					}, [
						div('.thumb', i('.fa.fa-upload')),
						div('.name', 'Качи нов файл')
					])
				))
			])
		])
	])
];
