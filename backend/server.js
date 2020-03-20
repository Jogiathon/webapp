//const Joi = require('Joi');
const helmet = require('helmet')
const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const posts = require('./routes/posts');
const users = require('./routes/users');

//const Product = require("../models/product");
//const upload = multer({storage: storage});
const API_PORT = process.env.PORT || 3002;
const app = express();
app.use(helmet());
app.use(cors());

// this is our MongoDB database
const dbRoute = 'mongodb+srv://jorgito:P3rfect%21%23@sgood-hqerv.mongodb.net/test?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

//static path to uploads folder
app.use('/uploads', express.static('uploads'));

app.use('/api/posts', posts);
app.use('/api/users', users);

//Middleware

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));