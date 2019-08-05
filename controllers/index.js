var User = require("../models/user");
var Repo = require("../models/repo");
module.exports = {
    start: function(req, cb) {

        if(req.session.user) {
            req.session.user.repos = []
                User
                .findOne({username:req.session.user.username})
                .exec(async (err, result) => {
                        for(var i=0;i<req.session.user.repositories.length;i++) {
                            var theReqRepo = await Repo.findOne({id:req.session.user.repositories[i]}).exec()
                            req.session.user.repos.push(theReqRepo);
                        }
                        cb(req.session.user)
                })
         }
        else {
            cb(req.session.user)
        }
    },
    user: function(req, cb) {
        if(req.params.username) {
            var userData = {}
            User
            .findOne({username:req.params.username})
            .exec(async (err, result) => {
                if(result) {
                    userData = result;
                    for(var i=0;i<result.repositories.length;i++) {
                        var theReqRepo = await Repo.findOne({id:result.repositories[i]}).exec()
                        userData.repos.push(theReqRepo);
                    }
                    if(req.session.user) {
                        userData.selfView = (req.params.username == req.session.user.username); 
                    }
                    else {
                        userData.loginRequired = true;
                    }
                    
                    cb(userData)
                }
                else {
                    cb(null);
                }
            })
        }
    }
}