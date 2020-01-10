//Requirements
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

//Routes
const RouteUser = require('./routes/route_users');
const profileUpload = require('./routes/image_upload');
const AdverUpload = require('./routes/advregister');
const AUTH = require('./routes/auth');

//
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

mongoose
	.connect(process.env.URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	})
	.then(db => {
		console.log('Successfully Connected to mongodb server');
	});

app.use('/adver', AdverUpload);
app.use('/upload', profileUpload);
app.use('/users', RouteUser);

app.listen(process.env.PORT, () => {
	console.log(`Application is running in localhost:${process.env.PORT}`);
});
