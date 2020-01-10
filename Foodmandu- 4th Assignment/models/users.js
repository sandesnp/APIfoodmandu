const mongoose = require('mongoose');
const userScheme = new mongoose.Schema(
	{
		firstname: {
			type: String,
			required: true,
			minlength: 1,
			maxlength: 50
		},
		lastname: {
			type: String,
			required: true,
			minlength: 1,
			maxlength: 50
		},
		phonenumber: {
			//required
			type: String,
			required: true,
			unique: true,
			minlength: 2,
			maxlength: 15
		},
		email: {
			//required
			type: String,
			required: true,
			unique: true,
			minlength: 3
		},
		password: {
			//required
			type: String,
			required: true,
			minlength: 5
		},
		profile_image: {
			type: String
		}
	},
	{ timestamps: true }
);
module.exports = mongoose.model('User', userScheme);
