var User = require("../models/user");
var Repo = require("../models/repo");

module.exports = {
    new: async function(req, res, next) {
            var result = await User.findOne({username:req.body.name}).exec()
            var emailResult = await User.findOne({email:req.body.email}).exec()
            if(result || emailResult) {
                res.redirect('/portal/new')
            }
            else {
                var newUser = new User({
                    username:req.body.name,
                    email:req.body.email,
                    password:req.body.password,
                    repositories:[],
                    profile_picture:'/profile_picture/avatar.jpeg',
                    bio:'I am a 15-yr-old web developer from India. Founder for Spruce and manny more..'
                })
                newUser.save((err, saved) => {
                    req.session.user = saved;
                    res.redirect('/');
                })
            }
    },
    login: function(req, res, next) {
        User
        .findOne({username:req.body.name, password:req.body.password})
        .exec((err, result) => {
            if(!result) return res.redirect('/portal/login');
            else {
                req.session.user = result;
                res.redirect('/')
            }
        })
    }
}