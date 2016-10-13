
const ObjectID = require('mongodb').ObjectID;

module.exports = (app, db) => {
	app.route('/api/articles')
		.get((req, res) => {
			db.collection('articles').find().toArray().then(
					list => res.jsonp(list),
					err => res.jsonp(err)
				);
		})
		// create document
		.post((req, res) => {
			const collection = db.collection('articles');
			collection.save(req.body)
				.then(
					() => res.jsonp({success: true}),
					err => res.jsonp(err)
				);
		});

	app.route('/api/articles/:articleId')
		.put((req, res) => {
			const collection = db.collection('articles');
			const newDoc = Object.keys(req.body).reduce((o, key) => (key !== '_id')
				? ((o[key] = req.body[key]), o)
				: o,
				{}
			);
			collection.update(
				{_id: new ObjectID(req.params.articleId)},
				newDoc
			)
				.then(
					() => res.jsonp({success: true}),
					err => res.jsonp(err)
				);
		})
		.delete((req, res) => {
			const collection = db.collection('articles');
			collection.remove({_id: new ObjectID(req.params.articleId)})
				.then(
					() => res.jsonp({success: true}),
					err => res.jsonp(err)
				);
		});
};
