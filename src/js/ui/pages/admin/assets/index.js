'use strict';

const path = require('path');

const {
	section, h1, h2, h3, hr, header, i, ul, li, p, button, div, span, img,
	table, thead, tbody, tr, td, th, a, form, label, input, textarea
} = require('iblokz-snabbdom-helpers');

// comp
// const grid = require('../../../comp/grid');

// crud
// const list = require('./list');
// const edit = require('./edit');

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
				div('.files', state.assets.list.filter(asset => asset.type === 'file').map(asset =>
					a(`.file[target="_blank"][href="/api/assets` + path.resolve(state.router.pageId || '', asset.name) + `"]`, [
						div('.thumb', asset.name.match(/.(gif|jpeg|jpg|png|svg)/)
							? img(`[src=/api/assets/` + path.resolve(state.router.pageId || '', asset.name) + `]`)
							: i('.fa' + (asset.name.match(/.pdf/) ? '.fa-file-pdf-o' : '.fa-file-o'))
						),
						div('.name', asset.name)
					])
				))
			])
		])
	])
];
