'use strict';

const path = require('path');
const fse = require('fs-extra');

// multer
const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()});

const basePath = path.join(__dirname, '../../../assets');
// console.log({basePath});

const getAsset = (req, res) => (req.params[0] !== undefined)
	? [path.join(basePath, req.params[0])].map(filePath =>
		fse.stat(filePath, (err, stats) =>
			err ? res.send({err})
			// TODO: show directory only to admins
			: stats.isDirectory() ? fse.readdir(filePath, (err, files) =>
				err ? res.send({err}) : res.json({list: files.map(file => ({
					name: file,
					type: fse.statSync(`${filePath}/${file}`).isDirectory() ? 'dir' : 'file'
				}))}))
			: stats.isFile() ? res.sendFile(filePath) : null
		))
	: res.next();

const putAsset = (req, res) => (req.params[0] !== undefined)
	? [path.join(basePath, req.params[0])].map(filePath =>
			!fse.existsSync(filePath) &&
				fse.writeFile(filePath, req.file.buffer, (err, state) => res.send(err || state))
		)
	: res.next();

module.exports = ({app, db, config}) => {
	app.route('/api/assets*')
		.get(getAsset)
		.put(upload.single('theFile'), putAsset);
};
