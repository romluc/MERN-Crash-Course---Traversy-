const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Item Model
const User = require('../../models/User');

// @route GET api/auth
// @desc Auth user
// @access Public
router.post('/', (req, res) => {
	const { email, password } = req.body;

	// Simple validation
	if (!email || !password) {
		return res.status(400).json({ msg: 'Please enter all fields' });
	}

	// Check for existing user
	User.findOne({ email }).then(user => {
		if (!user) return res.status(400).json({ msg: 'User does not exist' });

		// Validate password
		bcrypt.compare(password, user.password).then(isMatch => {
			if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

			jwt.sign(
				{ id: user.id },
				config.get('jwtSecret'),
				{ expiresIn: 3600 },
				(err, token) => {
					if (err) throw err;

					res.json({
						token,
						user: {
							id: user.id,
							email: user.email
						}
					});
				}
			);
		});
	});
});

module.exports = router;
