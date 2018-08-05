var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


var memberSchema = mongoose.Schema({
	name: String,
	aadhar: Number
});


// User Schema
var UserSchema = mongoose.Schema({
	mobile_no: {
		type: Number,
		index:true,
		unique:true
	},
	password: {
		type: String
	},
	username: {
		type: String,
		unique: true
	},
	members: [memberSchema],
	lat:{
		type: Number
	},
	lng:{
		type: Number
	},
	address:{
		type: String
	},
	city:{
		type: String
	},

	state: {
		type: String
	},
	pincode: {
		type: Number
	},
	propertyId:{
		type: Number
	}
});

var User = module.exports = mongoose.model('User', UserSchema);

var Member = mongoose.model('Member',memberSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByPhonenumber = function(mobile_no, callback){
	var query = {mobile_no: mobile_no};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}

/*
module.exports.addMember =  function(user,mem,callback)
{
	var newMember = new Member(mem);
	console.log(mem+ '         mem');
	User.getUserByPhonenumber(user.mobile_no, function(err, data){
   				if(err) throw err;
   				console.log(data+'       asdfsdf')
   				data.members.push(newMember);
   				console.log(data.members.length);
   				data.save(callback);

   				});
}
*/
