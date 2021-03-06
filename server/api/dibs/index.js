'use strict';

var express = require('express');
var getController = require('./getDibs.controller');
var postController = require('./addDibs.controller');

var router = express.Router();

router.get('/:id([0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$)', getController.index);
router.get('/:type(person|place|thing)/:name', getController.index);
router.post('/', postController.index);

module.exports = router;