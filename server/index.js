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



const PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);


module.exports.app = app