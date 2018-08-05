var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mongoXlsx = require('mongo-xlsx'); 
var mongoose = require('mongoose');
/* Read xlsx file without a model */
/* The library will use the first row the key */
//var model = mongoXlsx.buildDynamicModel(data);

var model =null;

var xlsx  = 'getblue.xlsx';
 
mongoXlsx.xlsx2MongoData(xlsx, model, function(err, data) {
	var arr=[];
for (var i of data)
{
	arr.push(i.Data);
}
//console.log(arr);


});


// Get 
router.get('/rev', function(req, res){
	res.render('rev');
	// a = req.user;
});

var uniqueSchema = mongoose.Schema({
	propertyId: Number,
	uniqueId: String
})

var unique = mongoose.model('unique',uniqueSchema);



// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	var property = req.user.propertyId;
    unique.findOne({propertyId:property},function(err,cb){
    	        var User =req.user;
    	        console.log(User)
	res.render('2_updated',{uniq:cb.uniqueId,user:User});
	// a = req.user;
	    });
});

router.get('/add', ensureAuthenticated, function(req, res){


    	res.render('link_member',req.user);	


	// a = req.user;
});


router.post('/',function(req,res){
	var name = req.body.name;
	var aadhar = req.body.aadhar;
	var remove = req.body.remove;

	 	User.getUserByPhonenumber(req.user.mobile_no, function(err, user){
   				if(err) throw err;
   				user.members.push({name:name,aadhar:aadhar});
   				user.save();
   			});

res.redirect('/');

});

router.post('/rm',function(req,res){
	var remove = req.body.remove;
	     console.log(remove);
		 User.getUserByPhonenumber(req.user.mobile_no, function(err, user){
   			if(err) throw err;
   			var mem = user.members;
   			for (let i of mem)
   			{
   				if(i.name == remove)
   				{
   					i.remove();
   				}
   			}
   			user.save().then(()=>{console.log("member removed")});
   		});
	

res.redirect('/');
});


function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}
//console.log(user);
module.exports = router;