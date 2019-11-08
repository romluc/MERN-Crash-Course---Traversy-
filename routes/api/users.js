const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Item Model
const User = require('../../models/User');

// @route GET api/users
// @desc Register new user
// @access Public
router.post('/', (req, res) => {
	const { name, email, password } = req.body;

	// Simple validation
	if (!name || !email || !password) {
		return res.status(400).json({ msg: 'Please enter all fields' });
	}

	// Check for existing user
	User.findOne({ email }).then(user => {
		if (user) return res.status(400).json({ msg: 'User already exists' });

		const newUser = new User({
			name,
			email,
			password
		});

		// Create salt & hash
		bcrypt.genSalt(10, (error, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) throw err;
				newUser.password = hash;
				newUser.save().then(user => {
					res.json({
						user: {
							id: user.id,
							name: user.name,
							email: user.email
						}
					});
				});
			});
		});
	});
});

module.exports = router;
