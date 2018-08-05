var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
   res.sendfile('index.html');
});

io.on('connection', function(socket) {
   console.log('A user connected');

   var arr= ['asdf','alhjklj','asdfjhas','iyi'];

   // function syncSetTimeout(func, ms, callback) {
 
                           //  set your counter to 1

var size = arr.length;
var temp = arr;
(function myLoop (i) {          
   setTimeout(function () {   
      socket.send(temp.shift()+' ');          //  your code here                
      if (--i) myLoop(i);      //  decrement i and call myLoop again if i > 0
   }, 3000)
})(size); 


/*
     (function sync(done) {
            if (!done) {
            setTimeout(function() {
                func.apply(func);
                sync(true);
            }, ms);
            return;
        }
        callback.apply(callback);
    })();
}
   for(var i in arr)
   {
      socket.send(arr[i]);
      syncSetTimeout(()=>{},1000,()=>{});
}
*/
});
io.on('disconnect', function () {
      console.log('A user disconnected');
   });

http.listen(3000, function() {
   console.log('listening on *:3000');
});