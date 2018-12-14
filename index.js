const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const passport = require('passport');

const users = require('./app/routes/users'); 

// create express app
const app = express();

app.use(passport.initialize());
require('./app/passport')(passport);

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to my first node  application."});
});

app.use('/api/users', users);

require('./app/routes/note.routes.js')(app);

const PORT = process.env.PORT || 3000;

// listen for requests
app.listen(PORT, () => {
    console.log("Server is listening on port 3000");
});