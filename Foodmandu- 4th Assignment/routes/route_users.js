const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const USER = require('../models/users');
const AUTH = require('./auth');

router.post('/signup', (req, res, next) => {
	USER.findOne({ email: req.body.email })
		.then(usersA => {
			if (usersA != null) {
				let err = new Error(
					'This email has been already used for Registration.'
				);
				err.status = 401;
				return next(err);
			} else {
				bcrypt.hash(req.body.password, 10, function(err, hash) {
					if (err) {
						throw new Error('Could not encrypt Password!');
					}

					USER.create({
						firstname: req.body.firstname,
						lastname: req.body.lastname,
						phonenumber: req.body.phonenumber, //required
						email: req.body.email, //required
						password: hash,
						profile_image: req.body.profile_image
					}).then(usersB => {
						let token = jwt.sign({ userID: usersB._id }, process.env.SECRET);
						res.json({ status: 'Signup Success!', token: token });
					});
				});
			}
		})
		.catch(next);
});

router.post('/login', (req, res, next) => {
	USER.findOne({ email: req.body.email })
		.then(usersA => {
			if (usersA === null) {
				let err = new Error('Email not found!');
				err.status = 401;
				return next(err);
			}
			bcrypt.compare(req.body.password, usersA.password, function(err, status) {
				if (!status) {
					let err = new Error('Password does not match!');
					err.status = 401;
					return next(err);
				}
				let token = jwt.sign({ userID: usersA._id }, process.env.SECRET);
				res.json({ status: 'Successfully logged in', token: token });
			});
		})
		.catch(next);
});

router.get('/profile', AUTH.verifyUser, (req, res, next) => {
	res.json({
		email: req.user.email,
		firstName: req.user.firstname,
		lastName: req.user.lastname,
		profile_image: req.user.profile_image
	});
});

module.exports = router;

// res.json('check: #101');
// 	return;
