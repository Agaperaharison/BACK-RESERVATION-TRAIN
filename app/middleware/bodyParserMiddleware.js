// Import required packages
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Create an Express application instance
const app = express();

// Apply CORS middleware
app.use(cors({
    origin: 'http://localhost:2395',
    credentials: true,
  }));

// Apply BodyParser middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
module.exports = app;
