const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.get("/", (req, res)=>{
    res.status(200);    
    res.send("Sentiment Analysis API!!");
});

const port = process.env.PORT;
if(port){
    app.listen(port, () => console.log('Server running on http://localhost:' + port + '/'));
}else{
    app.listen(8000, () => console.log('Server running on http://localhost:8000/'));
}
