
var mongoose =require("mongoose");
mongoose.connect('mongodb://localhost/test');
//var db= mongoose.connection;


var memberSchema = mongoose.Schema({
	name: String,
	aadhar: Number
});

var Member = mongoose.model('Member',memberSchema);



var TestSchema = mongoose.Schema({
	name:String,
	phone:Number,
	members:[memberSchema]
	});
var Test = mongoose.model('Test',TestSchema);
var newMember = new Member({name: 'Ranjgith',aadhar:654654});

//var newMember = new Member({name: 'Sharan kumar',aadhar:1231});

/*

var newUser = new Test({name:'postmans friend', phone:708363567});
newUser.save().then(()=>{
	console.log("done!");
});



var mem =new Test();

mem.members.push(newMember);

mem.save().then(()=>{
	 console.log("done");
});
*/





//newUser.members.push(newMember);
//newUser.save()

/*
Test.count({},(err,count)=>{

console.log(count);
});
*/
/*
Test.findOne({name: 'postmans friend'},(err,doc)=>{
	if (err) throw err;
    for(let i=0;i<doc.members.length;i++)
    {
        if(doc.members[i].name=="Ranjgith")
        {
        	doc.members[i].remove();
        	doc.save().then(()=>{
        		console.log("Ranjgith removed");
        	});
        }
    }

});

*/
Test.findOne({name: 'postmans friend'},(err,doc)=>{
    if (err) throw err;
    doc.members.push(newMember);
    doc.save();

});
