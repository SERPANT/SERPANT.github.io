console.log("from outside");

setTimeout(function(){   // set seconds after which this funciton is executed
    console.log("from inside");
},2000);

console.log("from outside 2");