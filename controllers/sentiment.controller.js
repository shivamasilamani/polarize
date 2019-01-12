const brain = require('brain.js');
const data = require('../data/training.data.json');
const nNetwork = new brain.recurrent.LSTM();

let trainedModel;

module.exports = {

    trainData: function(req, res){
        const trainingData = data.map(item => ({
            input: item.input,
            output: item.output
        }));

        nNetwork.train(trainingData, {
            iterations: 1000
        });

        trainedModel = nNetwork.toFunction();
        res.status(200);
        res.json({status : "Training finished!!"});
    },

    analyzeText: function(req, res){
        const output = trainedModel(req.body.text);

        res.status(200);
        res.json({status : "API is brewing", data: output});
    }
}