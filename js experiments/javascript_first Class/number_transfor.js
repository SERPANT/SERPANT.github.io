var number=[1,2,3,4];


function transform(collection, tranfunc){

    var arr=[];
    
    
    for(var i=0;i<collection.length;i++)
    {
        arr[i]=tranfunc(collection[i]);
    }

    return arr;
}


var output=transform(number,function(num){
    
    return num*2;
});


console.log(output);
