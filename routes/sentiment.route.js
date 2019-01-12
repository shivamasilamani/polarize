const express = require("express");
const sentimentController = require("../controllers/sentiment.controller");
const bodyParser = require("body-parser");

const route = express.Router();
route.use(bodyParser.json());

route.get("/", (req,res)=>{
    res.status(200);
    res.json({status : "Use POST method to send text data", data: req.body});
});

route.post("/", (req,res)=>{
    sentimentController.analyzeText(req, res);
});

route.get("/train", (req,res)=>{
    sentimentController.trainData(req, res);
});

module.exports = route;
