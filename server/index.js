const express = require("express");
const router = require('./route.js')
const morgan = require('morgan')
const cors = require('cors')

const app = express();

app.use(express.static('client/dist'));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(cors());
app.use(express.json());
app.use('',router);

app.listen(3000);
console.log('Server listening at port 3000')

module.exports.app = app