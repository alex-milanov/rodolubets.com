'use strict';

const Rx = require('rx');
const $ = Rx.Observable;
const {Subject} = Rx;

const marked = require('marked');
const moment = require('moment');
require('moment/locale/bg');

const request = require('../util/request');

const stream = new Subject();

const init = () => request.get('http://localhost:8080/api/articles')
	.observe()
	.map(res => res.body)
	.map(articles =>
		articles.map(article =>
			Object.assign({}, article, {
				text: marked(article.text),
				createdAt: moment(article.createdAt).format('DD MMMM Y')
			})
		)
	)
	.subscribe(articles => stream.onNext(state => Object.assign({}, state, {articles})));

const signInToggle = () => stream.onNext(
	state => Object.assign({}, state, {signInToggled: !state.signInToggled})
);

const initial = {
	articles: [],
	signInToggled: false
};

module.exports = {
	stream,
	init,
	signInToggle,
	initial
};
