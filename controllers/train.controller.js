const brain = require('brain.js');
const fs = require('fs');
const data = require('../data/training.data.json');
const nNetwork = new brain.recurrent.LSTM();

module.exports = {

    trainData: function(req, res){
        console.log("Before Processing....");
        const trainingData = data.map(item => ({
            input: item.input,
            output: item.output
        }));

        console.log("Before Training....");
        nNetwork.train(trainingData, {
            iterations: 1000,
            log: (error) => {
                console.log(error);
            },
            logPeriod: 100,
            callback: () => {
                console.log("Training .....");
            }
        });

        const trainedModel = nNetwork.toJSON();

        const writerStream = fs.createWriteStream('./ml/tweetsentiment.model.json');
        writerStream.write(JSON.stringify(trainedModel),'UTF8');
        writerStream.end();

        writerStream.on('finish', function() {
            res.status(200);
            res.json({status : "Training finished!!"});
        });

        writerStream.on('error', function(err) {
            res.status(500);
            res.json({status : "Training failed!!"});
        });

    }
}