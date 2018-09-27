var arr=[1,2,3,4,5,6];
console.log(even(arr));


function even(arr)
{
    var arr2=[];
    for(var i=0; i<arr.length;i++)
    {
       
        if(arr[i]%2===0){
            arr2.push(arr[i]);
        }
    }
    return arr2;

}