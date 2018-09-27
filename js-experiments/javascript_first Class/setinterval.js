console.log('from outside');


// continues calling the function every 2000
var ref=setInterval(function(){
    console.log("from inside");
},2000);

clearTimeout(ref);  // clears memory  also
console.log("from outside 2");