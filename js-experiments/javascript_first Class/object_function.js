


function getData(callback){   //this is so that after some part do callback
   
    var data={id:1,name:'pikachu'};
    return callback(data);

    return 123;  //this is returning nothing so rvalue becomes the answer to this function which becomes undefined
}


var rvalue=getData(function(d){    //this is function begin executed so rvalue() is not needed only rvalue is enough
    console.log("Data",d);
    return 555;
})

console.log("rvalue",rvalue);  //only rvalue is needed as rvalue is calling the function . it represents function call and not the function