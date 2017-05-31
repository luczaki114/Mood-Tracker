var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();

var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find(function (err, users) {
    if(err) {
      throw err;
    }
    res.json(users);
  });
});

// new user registrations
// POST a new user to the DB
router.post('/', function(req, res, next) {
	if (!req.body.email_address || !req.body.password) {
		sendJSONresponse(res, 400, {
			message: 'All fields are required'
		});
		return;
	}
	User.findOne({email_address: req.body.email_address}, function(err, data) {
		if (data) {
			sendJSONresponse(res, 400, {
				message: 'This email is already in use!'
			});
		} else {
			var newUser = new User(); 
		 	newUser.email_address = req.body.email_address; 
		 	newUser.setPassword(req.body.password, function() {
				newUser.save(function(err) {
			 		if (err) {
			 			sendJSONresponse(res, 400, err)
			 		} else {
			 			var token = user.generateJwt();
			 			sendJSONresponse(res, 200, {"token": token})
			 		}
			 	});
		 	});
		}
	});
});

var sendJSONresponse = function(res, status, content) {
	res.status(status);
	res.json(content);
}; 

module.exports = router;