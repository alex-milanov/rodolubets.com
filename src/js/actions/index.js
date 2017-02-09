'use strict';

const Rx = require('rx');
const $ = Rx.Observable;
const {Subject} = Rx;

const marked = require('marked');
const moment = require('moment');
require('moment/locale/bg');

const request = require('iblokz/adapters/request');

const stream = new Subject();

const init = () => request.get('/api/articles')
	.observe()
	.map(res => res.body)
	.map(articles =>
		articles.list.map(article =>
			Object.assign({}, article, {
				text: marked(article.text),
				createdAt: article.createdAt && moment(article.createdAt).format('DD MMMM Y') || ""
			})
		)
	)
	.subscribe(articles => stream.onNext(state => Object.assign({}, state, {articles})));

const signInToggle = () => stream.onNext(
	state => Object.assign({}, state, {signInToggled: !state.signInToggled})
);

const selectCategory = category =>
	stream.onNext(state => Object.assign({}, state, {category}));

const initial = {
	articles: [],
	signInToggled: false,
	category: false
};

module.exports = {
	stream,
	init,
	signInToggle,
	selectCategory,
	initial
};
