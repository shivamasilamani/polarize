const brain = require('brain.js');
const fs = require('fs');
const data = require('../data/training.data.json');
const nNetwork = new brain.NeuralNetwork();

function encode(arg){
    return arg.split('').map(x => (x.charCodeAt(0) / 255));
}

function fixLengths(data) {
    let maxLengthInput = -1;
    for (let i = 0; i < data.length; i++) {
      if (data[i].input.length > maxLengthInput) {
        maxLengthInput = data[i].input.length;
      }
    }
    
    for (let i = 0; i < data.length; i++) {
      while (data[i].input.length < maxLengthInput) {
        data[i].input.push(0);
      }
    }
    
    console.log(maxLengthInput);
    return data;
}

module.exports = {

    trainData: function(req, res){
        //const data1 = fixLengths(data);
        const trainingData = data.map(item => ({
            input: encode(item.input),
            output: item.output
        }));

        console.log("Before Training....");
        nNetwork.train(fixLengths(trainingData), {
            iterations: 2000,
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