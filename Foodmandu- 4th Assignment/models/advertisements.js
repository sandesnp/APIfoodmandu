const mongoose = require('mongoose');
const AdvertisementScheme = new mongoose.Schema(
	{
		position: {
			type: String,
			required: true
		},
		firstimage: {
			type: String
		},
		secondimage: {
			type: String
		},
		title: {
			//required
			type: String,
			minlength: 2,
			maxlength: 15
		},
		country: {
			//required
			type: String,
			minlength: 3
		},
		location: {
			//required
			type: String,
			minlength: 5
		}
	},
	{ timestamps: true }
);
module.exports = mongoose.model('Advertisement', AdvertisementScheme);
