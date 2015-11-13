'use strict';

/**
 * Module dependencies.
 */
var AWS = require('../../config/AWS');
var config = require('../../config/config');
exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null
	});
};

exports.getS3Policy = function (req, res, next) {
	AWS.createS3Policy(req.query.mimeType, function (creds, err) {
		if (!err) {
			return res.send(200, creds);
		} else {
			return res.send(500, err);
		}
	});
};
