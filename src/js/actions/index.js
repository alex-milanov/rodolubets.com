'use strict';

const Rx = require('rx');
const $ = Rx.Observable;
const {Subject} = Rx;

const stream = new Subject();

const init = () => stream.onNext(state => ({
}));

module.exports = {
	stream,
	init
};
