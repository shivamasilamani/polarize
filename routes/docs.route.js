const express = require("express");
const route = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger.json');

route.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = route;
