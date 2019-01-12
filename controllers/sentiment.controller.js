module.exports = {
    analyzeText: function(req, res){
        res.status(200);
        res.json({status : "API is brewing", data: req.body});
    }
}