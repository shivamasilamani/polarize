const express = require("express");
const trainController = require("../controllers/train.controller");
const bodyParser = require("body-parser");

const route = express.Router();
route.use(bodyParser.json());

route.get("/", (req,res)=>{
    trainController.trainData(req, res);
});

module.exports = route;