const express = require('express');
const sentimentRoute = require("./routes/sentiment.route");
const trainRoute = require("./routes/train.route");
const app = express();

app.get("/", (req, res)=>{
    res.status(200);    
    res.send('<div style="text-align: center;"><h1>Sentiment Analysis API!!</h1><br><h3>API available in this route /api/v1/sentiment </h3></div>');
});

app.use("/api/v1/sentiment", sentimentRoute);
app.use("/api/v1/train", trainRoute);

app.use(function (req, res, next) {
    res.header("Content-Type","application/json");
    next();
});

const port = process.env.PORT;
if(port){
    app.listen(port, () => console.log('Server running on http://localhost:' + port + '/'));
}else{
    app.listen(8000, () => console.log('Server running on http://localhost:8000/'));
}
