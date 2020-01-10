const express = require('express');
const router = express.Router();
const ADVER = require('../models/advertisements');

router.post('/', (req, res, next) => {
	ADVER.create({
		position: req.body.position,
		firstimage: req.body.firstimage,
		secondimage: req.body.secondimage,
		title: req.body.title,
		country: req.body.country,
		location: req.body.location
	})
		.then(adverA => {
			res.json('Successfully Registered an ADVERTISEMENT');
		})
		.catch(next);
});

router.get('/all', (req, res, next) => {
	ADVER.find()
		.then(adverB => {
			res.json(adverB);
		})
		.catch(next);
});

module.exports = router;
