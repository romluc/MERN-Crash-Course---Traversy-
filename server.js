const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const app = express();

// Bodyparser middleware
app.use(express.json());

// DB config
const db = config.get('mongoURI');

// Connect to Mongo fixing deprecation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose
	.connect(db)
	.then(() => console.log('MongoDB connected...'))
	.catch(err => console.log(err));

// Use Routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
