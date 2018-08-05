var express = require('express');
var mongoose =require('mongoose');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var nodemailer = require('nodemailer');
var visitor = require('./data').visit;
var value = require('./data').placeHolder;
var propertyid = require('./data').propertyid;


var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'postmans.friend123@gmail.com',
        pass: 'midhyamadam'
    }
})



var User = require('../models/user');

var propertySchema = mongoose.Schema({
	propertyId : Number,
	address: String,
	state : String,
	city: String,
	pincode : Number,
	ownerName : String
});

var property = mongoose.model('property',propertySchema);

router.get('/insert',function(req, res){
	res.render('ranins');
});

router.post('/insert',function(req,res){
	var p_id =req.body.propertyId;
	var address = req.body.address;
	var city =req.body.city;
	var state =req.body.state;
	var pincode =req.body.pincode;
	var ownerName =req.body.ownerName;

  var newProperty = new property({propertyId:p_id,address: address, state:state,city:city ,pincode:pincode, ownerName:ownerName});
  newProperty.save().then(()=>{console.log("done");});

  res.redirect('/users/insert');

});


router.get('/linkto', function(req, res){
	res.render('link_property_id');
});

router.post('/linkto', function(req, res){
 var propertyId = req.body.propertyId;
 var state = req.body.state;
 var pincode =req.body.pincode;
 var ownerName =req.body.ownerName;

  value.propertyId =propertyId;
  propertyid = propertyId;
  value.state =state;
  value.pincode=pincode;
  value.ownerName =ownerName;

property.findOne({propertyId:propertyId,ownerName:ownerName}, function(err, user){
	if(err) throw err;
	if(user)
	{
		res.redirect('/users/register');
		visitor =true;
	}
	else
	{
		res.redirect('/users/linkto');
	}
});

});

function ensureValidated(req,res)
{
if(!visitor)
res.redirect('/users/linkto');
else
{
res.render('updated_signup',{data:value});
console.log(value);
visitor = false;
}
}
// Register
router.get('/register',ensureValidated,function(req, res){
	//res.render('updated_signup');
});

// Login
router.get('/login', function(req, res){
	res.render('login');
});




// Register User
router.post('/register', function(req, res){
	//var name = req.body.name;
	  var mobile_no = req.body.mobile_no;
	  var password = req.body.password;
	  var username = req.body.username;
	  var password2 = req.body.password2;
	  var lat = req.body.lat;
	  var lng = req.body.lng;
	  var City = req.body.City;
	  var address = req.body.address;
	  var State = req.body.State;
	  var Pincode = req.body.Pincode;
	  var Member =req.body.Member;
	  var name0 =req.body.name0;
	  var member0 = req.body.member0;
	  var name1 =req.body.name1;
	  var member1 = req.body.member1;
	  var name2 =req.body.name2;
	  var member2 = req.body.member2;
	  var name3 =req.body.name3;
	  var member3 = req.body.member3;
	  var name4 =req.body.name4;
	  var member4 = req.body.member4;
	 // var aadhar5 = req.body.aadhar5;
	 //console.log(name0,member0);

	// Validation
   req.checkBody('mobile_no', 'mobile_no is required').notEmpty();
   req.checkBody('username', 'username is required').notEmpty();
	//req.checkBody('lat', 'lat is required').notEmpty();
 	//req.checkBody('aadhar4', 'aadhar4 is required').notEmpty();
	//req.checkBody('aadhar', 'aadhar is required').notEmpty();
	//req.checkBody('aadhar1', 'aadhar1 is required').notEmpty();
	//req.checkBody('aadhar3', 'aadhar3 is required').notEmpty();
	//req.checkBody('aadhar5', 'aadhar5 is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		res.render('updated_signup',{
			errors:errors
		});
	} else {
 			var data={
 				mobile_no:mobile_no,
 				password:password,
 				username:username,
 				members:[],
 				lat:lat,
 				lng:lng,
 				address:address,
 				city:City,
 				state:State,
 				pincode:Pincode,
 				propertyId:propertyid

 			}

 			var newUser = new User(data);
 			User.createUser(newUser, function(err, user){
				if(err) throw err;
				//console.log(user);



		
			if(name0!=null)
			{
   				user.members.push({name:name0,aadhar:member0});
   				user.save();
			}

					
			if(name1!=null)
			{
   				user.members.push({name:name1,aadhar:member1});
   				user.save();
			}

			if(name2!=null)
			{
   				user.members.push({name:name2,aadhar:member2});
   				user.save();
			}

			if(name3!=null)
			{
   				user.members.push({name:name3,aadhar:member3});
   				user.save();
			}


			if(name4!=null)
			{
   				user.members.push({name:name4,aadhar:member4});
   				user.save();
			}

				req.flash('success_msg', 'You are registered, now you can login!');


			const mailOptions = {
				  from: 'postmans.friend123@gmail.com', // sender address
				  to: ''+user.username+'', // list of receivers
				  subject: 'Acknowledege for registration', // Subject line
				  html: '<p>Thank you for registering! have a good day!</p>'// plain text body
				};

			transporter.sendMail(mailOptions, function (err, info) {
				   if(err)
				     console.log(err)
				   else
				     console.log(info);
				});

			});

        
		res.redirect('/users/login');
	}
});



/*
router.post('/next', function(req, res){

	  var Pincode = req.body.Pincode;

	// Validation
	req.checkBody('Adderess', 'Adderess is required').notEmpty();
	req.checkBody('City', 'City is required').notEmpty();
	req.checkBody('State', 'State is required').notEmpty();
	req.checkBody('Pincode', 'Pincode is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		res.render('signup',{
			errors:errors
		});
	} else {
		
		global.vist.then((data)=>{

			data.Adderess= Adderess;
			data.City= City;
			data.State= State;
			data.Pincode= Pincode;

		var newUser = new User(data);

	 	User.getUserByPhonenumber(newUser.mobile_no, function(err, user){
   				if(err) throw err;
   				if(!user)
   				{
   				User.createUser(newUser, function(err, user){
				if(err) throw err;
				//console.log(user);
				req.flash('success_msg', 'You are registered, now you can login!');
			});

   			}
   			else
   			{
   				console.log("duplicate user!");
   				console.log(user);
   			}
   		});

			res.redirect('/users/login')

		}).catch((error)=>{
			console.log(error);
		});

	}
});

*/

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByPhonenumber(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});

//console.log(user);
module.exports = router;
