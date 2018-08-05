var mongoXlsx = require('mongo-xlsx'); 

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
console.log(arr);
});

module.exports =arr;
 