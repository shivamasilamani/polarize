const brain = require('brain.js');
const fs = require('fs');
const nNetwork = new brain.NeuralNetwork();

function encode(arg){
    return arg.split('').map(x => (x.charCodeAt(0) / 255));
}

function fixLengths(data) {
    let maxLengthInput = 144;    
    while (data.length < maxLengthInput) {
        data.push(0);
    }
    return data;
}

module.exports = {
    analyzeText: function(req, res){

        const trainedModel  = fs.readFileSync('./ml/tweetsentiment.model.json', 'utf8');
        nNetwork.fromJSON(JSON.parse(trainedModel));

        const output = nNetwork.run(fixLengths(encode(req.body.text)));
        let sentiment = {
            Positive :  Math.floor(output.Positive * 100) + "%",
            Negative :  Math.floor(output.Negative * 100) + "%",
            Neutral :  Math.floor(output.Neutral * 100) + "%"
        };

        res.status(200);
        res.json({sentiment: sentiment});
    }
}