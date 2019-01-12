const brain = require('brain.js');
const fs = require('fs');
const nNetwork = new brain.recurrent.LSTM();

module.exports = {
    analyzeText: function(req, res){

        const trainedModel  = fs.readFileSync('./ml/tweetsentiment.model.json', 'utf8');
        nNetwork.fromJSON(JSON.parse(trainedModel));

        const output = nNetwork.run(req.body.text);
        let sentiment;
        switch(output){
            case "N":
                sentiment = "Negative";
                break;
            case "P":
                sentiment = "Positive";
                break;
            default:
                sentiment = "Neutral";
        }

        res.status(200);
        res.json({status : "API is brewing", data: sentiment});
    }
}