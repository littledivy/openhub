var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');
mongoose.connect('mongodb://localhost:27017/openhub', {
    useNewUrlParser: true
});

var repoSchema = mongoose.Schema({
    url:String
});

// methods ======================
// generating a hash
repoSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
repoSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('repo', repoSchema);

// create the model for users and expose it to our app
